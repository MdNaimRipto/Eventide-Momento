import AppSidebar from "@/components/pages/dashboard/sideNav/AppSidebar";
import DashboardNav from "@/components/pages/dashboard/sideNav/DashboardNav";
import Footer from "@/components/shared/Footer";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    // <div className="flex flex-col min-h-screen">
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <DashboardNav />
        {/* <br /> */}
        {/* <div className="min-h-screen"> */}
        <div className="container px-4 mx-auto">
          <SidebarTrigger />
          {children}
        </div>
        {/* </div> */}
        {/* <Footer /> */}
      </main>
    </SidebarProvider>
    // </div>
  );
};

export default DashboardLayout;
