import { onValue, ref, set, update, remove } from "firebase/database";
import { db } from "./firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { upload } from "@imagekit/javascript";

// Your Render server URL
const API_URL = "http://localhost:3000";

// =========================
// IMAGEKIT
// =========================

export const uploadImage = async (file) => {
  // Get temporary authentication parameters from your server
  const authResponse = await fetch(`${API_URL}/api/imagekit-auth`);

  if (!authResponse.ok) {
    throw new Error("ImageKit authentication failed");
  }

  const { token, expire, signature, publicKey } = await authResponse.json();

  // Upload image directly to ImageKit
  const response = await upload({
    file,
    fileName: file.name,
    token,
    expire,
    signature,
    publicKey,
    useUniqueFileName: true,
    folder: "/guns",
  });

  return {
    url: response.url,
    publicId: response.fileId,
  };
};

export const deleteImage = async (fileId) => {
  const response = await fetch("http://localhost:3000/api/imagekit/images", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fileId,
    }),
  });

  const data = await response.json();

  console.log("Delete status:", response.status);
  console.log("Delete response:", data);

  if (!response.ok) {
    throw new Error(data.error || "Image deletion failed");
  }

  return data;
};

// =========================
// FIREBASE GUNS
// =========================

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

export const deleteGun = async (gunName) => {
  const gunRef = ref(db, `guns/${gunName}`);
  await remove(gunRef);
};

// =========================
// FIREBASE META
// =========================

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

// =========================
// AUTH
// =========================

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
