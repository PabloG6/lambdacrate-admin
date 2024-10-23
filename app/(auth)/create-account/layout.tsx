import ProfileProvider from "@/components/ui/profile/profile-provider";
import { TRPCProvider } from "@/contexts/TrpcProvider";
import { LayoutProps } from "@/lib/util/props";

export default function Layout({ children }: LayoutProps) {
  return <TRPCProvider>
    <ProfileProvider>{children}</ProfileProvider>
  </TRPCProvider>
}
