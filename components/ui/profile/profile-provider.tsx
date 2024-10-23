"use client";
import { LayoutProps } from "@/lib/util/props";
import { trpc } from "@/trpc/client";
import { createContext, useContext } from "react";

const ProfileContext = createContext<any | undefined>(undefined);
const ProfileType = {

}

export const useProfile = () => {
    return useContext(ProfileContext)
}
export default function ProfileProvider({ children }: LayoutProps) {

    
    const {data} = trpc.accounts.me.useQuery();

    
  return <ProfileContext.Provider value={data}>{children}</ProfileContext.Provider>;
}
