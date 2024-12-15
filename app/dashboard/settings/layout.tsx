import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Key, Users } from "lucide-react";
const links = [
  {
    name: "Api Keys",
    icon: Key,
    link: "/settings/apikeys",
  },
  {
    name: "Profile",
    icon: Users,
    link: "/settings/profile",
  },
];
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarGroupLabel>Settings</SidebarGroupLabel>
              <SidebarMenu>
                {links.map((link, id) => (
                  <SidebarMenuItem key={id}>
                    <link.icon />
                    <span>{link.name}</span>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main className="w-full h-full">{children}</main>
    </SidebarProvider>
  );
}
