import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import { ReactNode } from "react";

const UsersLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main className="container px-4 py-8 min-h-screen">{children}</main>
      <Footer />
    </div>
  );
};

export default UsersLayout;
