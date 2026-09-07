import { onValue, ref, set, update, remove } from "firebase/database";
import { db } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

export const uploadImage = async (file) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "gun-images");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/hcy9uyaa/image/upload",
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    throw new Error("Image upload failed");
  }

  const data = await response.json();

  return { url: data.secure_url, publicId: data.public_id };
};

export const saveGun = async (gunName, gunData) => {
  const gunRef = ref(db, `guns/${gunName}`);
  await update(gunRef, gunData);
};

export const getGuns = (callback) => {
  const gunsRef = ref(db, "guns");

  return onValue(gunsRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};

export const saveMeta = async (metaCategory, metaData) => {
  await update(ref(db, `metas/${metaCategory}`), metaData);
};

export const deleteMeta = async (metaCategory) => {
  await set(ref(db, `metas/${metaCategory}`), null);
};

export const getMeta = (callback) => {
  const metaRef = ref(db, "metas");

  return onValue(metaRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};

export const deleteImage = async (publicId) => {
  const response = await fetch("http://localhost:3000/api/images", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      publicId,
    }),
  });

  console.log("Status:", response.status);
  // console.log("Response:", await response.text());

  if (!response.ok) {
    throw new Error("Image deletion failed");
  }
};

export const deleteGun = async (gunName) => {
  const gunRef = ref(db, `guns/${gunName}`);
  await remove(gunRef);
};

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};
