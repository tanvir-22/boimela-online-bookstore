"use client";

import { createContext, useEffect, useState } from "react";

import { onAuthStateChanged, User } from "firebase/auth";

import { auth } from "@/firebase/firebase.config";

import {
  googleLogin,
  loginUser,
  logoutUser,
  registerUser,
} from "@/firebase/auth";
import { AuthContextType } from "@/types/auth";

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    login: loginUser,
    register: registerUser,
    googleSignIn: googleLogin,
    logout: logoutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
