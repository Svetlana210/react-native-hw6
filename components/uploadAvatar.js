import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";

async function UploadImageToStorage(image) {
  console.log("!!!! Start uploading Image to Storage !!!!");
  const avId = Date.now().toString();
  const path = `avatars/${avId}.jpeg`;

  const response = await fetch(image);
  const file = await response.blob();

  const avatarsRef = ref(storage, path);

  await uploadBytes(avatarsRef, file);

  const imageURL = await getDownloadURL(ref(storage, avatarsRef));
  console.log("!!!! Image uploaded to Storage !!!!");

  return imageURL;
}

export default UploadImageToStorage;
