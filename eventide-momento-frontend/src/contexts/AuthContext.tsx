"use client";
import { useUserInfoQuery } from "@/redux/features/userApis";
import { IUser } from "@/types/userTypes";
import { createContext, ReactNode, useContext } from "react";
import Loader from "@/components/common/Loader";

interface UserContextType {
  user: null | IUser;
}

export const UserContext = createContext<UserContextType>({
  user: null,
});

const AuthContext = ({ children }: { children: ReactNode }) => {
  const { data, isLoading } = useUserInfoQuery({});

  if (isLoading) {
    return <Loader />;
  }

  const user = data?.data as IUser;

  const value = {
    user: user ? user : null,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export default AuthContext;

export function useUserContext(): UserContextType {
  return useContext(UserContext);
}
