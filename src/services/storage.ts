import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "../firebase";

export const uploadProfileImage = async (file: File): Promise<string | null> => {
  const user = auth.currentUser;
  if (!user) return null;

  const storage = getStorage();

 
  const imageRef = ref(
    storage,
    `profileImages/${user.uid}/profile.jpg`
  );

  await uploadBytes(imageRef, file);
  return await getDownloadURL(imageRef);
};
