import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, query, where } from "firebase/firestore";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

export const useFirebase = () => useContext(FirebaseContext);
const FirebaseApp = initializeApp(firebaseConfig);
const FirebaseAuth = getAuth(FirebaseApp);
const Firestore = getFirestore(FirebaseApp);

const googleProvider = new GoogleAuthProvider();

const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

// Helper function to upload image
const uploadImageToCloudinary = async (file, uniqueId) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("public_id", `${uniqueId}-${file.name}`); // Unique name

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    if (data.secure_url) {
      return { url: data.secure_url, publicId: data.public_id };
    } else {
      throw new Error("Cloudinary upload failed");
    }
  } catch (error) {
    console.error("Image upload error:", error);
    return null;
  }
};

export const FirebaseContextProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const signUpUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(FirebaseAuth, email, password);

  const signInUserWithEmailAndPassword = (email, password) =>
    signInWithEmailAndPassword(FirebaseAuth, email, password);

  const signInWithGoogle = () => signInWithRedirect(FirebaseAuth, googleProvider);

  const handleNewListing = async (name, isbn, price, coverFile) => {
    if (!user) throw new Error("User not logged in");

    // 1. Upload image to Cloudinary
    const uniqueId = `${user.uid}-${Date.now()}`;
    const uploadedImage = await uploadImageToCloudinary(coverFile, uniqueId);
    if (!uploadedImage) throw new Error("Image upload failed");

    // 2. Add data to Firestore
    return await addDoc(collection(Firestore, "books"), {
      name,
      isbn,
      price,
      coverUrl: uploadedImage.url,
      coverPublicId: uploadedImage.publicId,
      userID: user.uid,
      displayName: user.displayName || user.email.split("@")[0] || "Anonymous",
      userEmail: user.email,
      photoURL: user.photoURL,
    });
  };

  const getAllDocs = () => {
    return getDocs(collection(Firestore, 'books'));
  }

  const getDocById = async (id) => {
    const docRef = doc(Firestore, 'books', id);
    const res = await getDoc(docRef);
    return res;
  } 

  const placeOrder = async (bookId, qty) => {
    const collectionRef = collection(Firestore, 'books', bookId, 'orders');
    const res = await addDoc(collectionRef, {
      userID: user.uid,
      displayName: user.displayName || "Anonymous",
      userEmail: user.email,
      photoURL: user.photoURL,
      qty: Number(qty)
    })

    return res;
  }

  const fetchMyBooks = async (userId) => {
    const collectionRef = collection(Firestore, "books");
    const q = query(collectionRef, where("userID", "==", userId));
    const res = await getDocs(q);
    return res;
  }

  const getOrders = async (bookId) => {
    const collectionRef = collection(Firestore, "books", bookId, "orders");
    const res = await getDocs(collectionRef);
    return res;
  }

  const signOutUser = () => signOut(FirebaseAuth);

  const isLoggedIn = user ? true : false;

  return (
    <FirebaseContext.Provider
      value={{
        isLoggedIn,
        signInWithGoogle,
        signUpUserWithEmailAndPassword,
        signInUserWithEmailAndPassword,
        handleNewListing,
        getAllDocs,
        getDocById,
        placeOrder,
        fetchMyBooks,
        getOrders,
        signOutUser,
        user
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
