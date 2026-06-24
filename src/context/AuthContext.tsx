"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "../types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("cyd_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username === "admin" && password === "admin1234") {
      const adminUser: User = { username: "admin", role: "admin", name: "Administrator" };
      setUser(adminUser);
      localStorage.setItem("cyd_user", JSON.stringify(adminUser));
      return true;
    }
    if (username === "teecyd" && password === "1234") {
      const teeUser: User = { username: "teecyd", role: "user", name: "Tee CYD" };
      setUser(teeUser);
      localStorage.setItem("cyd_user", JSON.stringify(teeUser));
      return true;
    }
    if (username === "newcyd" && password === "cyd42") {
      const newUser: User = { username: "newcyd", role: "user", name: "New CYD" };
      setUser(newUser);
      localStorage.setItem("cyd_user", JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("cyd_user");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
