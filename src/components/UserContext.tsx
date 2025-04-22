"use client";

import { createContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  username: string;
}

interface UserContextType {
  userInfo: User | null;
  setUserInfo: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType>({
  userInfo: null,
  setUserInfo: () => {},
});

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    // Fetch user profile on component mount
    fetch("/api/profile", {
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return null;
      })
      .then((user) => {
        if (user) {
          setUserInfo(user);
        }
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
