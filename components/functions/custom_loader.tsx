import { useState } from "react";
import { toast } from "sonner";

export const useCustomLoader = () => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // control modal state

  const handlePromise = async ({
    func,
    onSuccess,
    onError,
    useToast = true,
    successText = "Success",
    errorText = "An error occurred",
    openModal = false, // if true, modal opens
  }: {
    func: () => Promise<any>;
    onSuccess?: () => void;
    onError?: (error: any) => void;
    useToast?: boolean; // choose whether to use toast
    loadingText?: string;
    successText?: string;
    errorText?: string;
    openModal?: boolean; // decide to show modal or not
  }) => {
    try {
      if (openModal) setModalOpen(true); // open modal if required
      setLoading(true);

      const result = await func();

      setLoading(false);
      setModalOpen(false);
      if (onSuccess) {
        onSuccess();
        setModalOpen(false);
      }
      if (useToast) {
        toast.success(successText);
      }

      return result;
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      // if (openModal) setModalOpen(false);

      const axiosError = error?.response?.data?.message || error?.message;

      if (onError) onError(axiosError);

      if (useToast) {
        toast.error(axiosError || errorText);
      }
    }
  };

  return {
    handlePromise,
    loading,
    modalOpen, // expose this to track modal state
    setModalOpen, // allow manual control of modal outside the hook
  };
};
