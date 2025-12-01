import ScrollTo from "@/components/common/ScrollTo";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="w-full min-h-screen relative">{children}</div>
      <Footer />
      <ScrollTo />
    </div>
  );
};

export default MainLayout;
