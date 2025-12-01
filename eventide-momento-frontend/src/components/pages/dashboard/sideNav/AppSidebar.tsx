"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { AiOutlineProfile } from "react-icons/ai";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { usePathname } from "next/navigation";

const AppSidebar = () => {
  const pathname = usePathname();

  const items = [
    {
      title: "Users",
      url: "/dashboard/users",
      icon: FaUser,
    },
    {
      title: "Events",
      url: "/dashboard/events",
      icon: MdOutlineEmojiEvents,
    },
    {
      title: "My Profile",
      url: "/dashboard/profile",
      icon: AiOutlineProfile,
    },
  ];
  return (
    <Sidebar>
      <SidebarContent className="bg-white pt-20">
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  className={`${
                    pathname === item.url
                      ? "bg-secondary1 text-white rounded-xl"
                      : "bg-white text-secondary1 rounded-none"
                  } duration-300`}
                  key={item.title}
                >
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
