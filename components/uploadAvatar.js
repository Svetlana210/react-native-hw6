import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";

async function UploadImageToStorage(image) {
  const avId = Date.now().toString();
  const path = `avatars/${avId}.jpeg`;

  const response = await fetch(image);
  const file = await response.blob();

  const avatarsRef = ref(storage, path);

  await uploadBytes(avatarsRef, file);

  const imageURL = await getDownloadURL(ref(storage, avatarsRef));

  return imageURL;
}

export default UploadImageToStorage;
