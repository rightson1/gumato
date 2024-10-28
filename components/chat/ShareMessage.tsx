import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

interface ShareMessageProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  messageToShare: string;
}

const ShareMessage = ({ open, setOpen, messageToShare }: ShareMessageProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Share the Message</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center gap-3 lg:gap-5 py-4">
          <WhatsappShareButton url={messageToShare}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <TwitterShareButton url={messageToShare}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareMessage;
