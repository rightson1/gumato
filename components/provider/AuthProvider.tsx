"use client";
import { IUser, IUserIdentity, TRole } from "@/types/data.types";
import axios from "axios";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useCustomLoader } from "../functions/custom_loader";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

interface IUserCreate extends Omit<IUser, "uid" | "email"> {}
const defaultUserData: IUserCreate = {
  role: "farmer",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  isActive: true,
  displayName: "",
  photoURL: "",
};
interface AuthContextType {
  user: IUser | null;
  userIdentity: IUserIdentity | null | {};
  fetchUser: (uid: string) => void;
  role: TRole | "";
  logout: () => void;
  handleGoogle: () => Promise<IUser>;
}
const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [userIdentity, setUserIdentity] = useState<IUserIdentity | {} | null>(
    {}
  );

  const { handlePromise } = useCustomLoader();
  const [user, setUser] = useState<IUser | null>(null);
  const pathname = usePathname();
  const [role, setRole] = useState<TRole | "">("");
  const clearUser = () => {
    setUserIdentity(null);
    setUser(null);
    localStorage.removeItem("user");
  };

  const fetchUser = async (uid: string) => {
    const userDoc = doc(db, "users", uid);
    try {
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        const data = docSnap.data() as IUser;
        setUser(data);
        setUserIdentity({ uid: data.uid, email: data.email });
        localStorage.setItem("user", JSON.stringify(data));
      } else {
        clearUser();
      }
    } catch (err) {
      clearUser();
    }
  };
  useEffect(() => {
    const userString =
      typeof localStorage !== "undefined" && localStorage.getItem("user");
    const localUser: IUser | null = userString ? JSON.parse(userString) : null;
    const unsub = onAuthStateChanged(auth, async (identity) => {
      if (identity) {
        if (identity.uid == localUser?.uid) {
          setUser(localUser);
          setUserIdentity({ uid: identity.uid, email: identity.email });
        } else {
          fetchUser(identity.uid);
        }
      } else {
        clearUser();
      }
    });
    return () => {
      unsub();
    };
  }, []);
  const logout = async () => {
    handlePromise({
      func: async () => {
        clearUser();
        await auth.signOut();
      },
    });
  };
  //crear
  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { user } = result;

      // Check if user exists in Firestore
      const userDoc = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userDoc);

      if (!userSnapshot.exists()) {
        // Create new user document if it doesn't exist
        const userData: IUser = {
          uid: user.uid,
          email: user.email || "",
          ...defaultUserData,
          displayName: user.displayName || "",
          photoURL: user.photoURL || "",
        };

        await setDoc(userDoc, userData);
        setUser(userData);
        setUserIdentity({ uid: user.uid, email: user.email || "" });

        return userData;
      }

      return userSnapshot.data() as IUser;
    } catch (error: any) {
      throw new Error(error.message || "Authentication failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userIdentity,
        role,
        fetchUser,
        logout,
        handleGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
