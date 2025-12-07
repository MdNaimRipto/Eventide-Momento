"use client";
import Loader from "@/components/common/Loader";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import { useUserContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const PrivateLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useUserContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user || user === undefined) {
      router.push("/auth/login");
    } else if (user && user.IsFirstTimeUpdated === false) {
      router.push("/auth/complete-profile");
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoading(false);
    }
  }, [router, user]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
};

export default PrivateLayout;
