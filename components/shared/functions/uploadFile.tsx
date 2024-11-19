import { storage } from "@/lib/firebase";
import { AxiosResponse } from "axios";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
export const uploadFile = (file: File, name: string) => {
  const fileRef = ref(storage, `/${name}-${Math.floor(Math.random() * 1000)}`);
  return uploadBytes(fileRef, file)
    .then((res) => getDownloadURL(res.ref))
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
export const deleteFile = async (url?: string) => {
  if (!url) return;
  try {
    const deleteRef = ref(storage, url);
    await deleteObject(deleteRef).then(() => {
      return true;
    });
  } catch (err) {
    console.log(err);
    return true;
  }
};
