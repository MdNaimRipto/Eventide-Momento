"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/contexts/AuthContext";
import Loader from "@/components/common/Loader";
import OpacityTransition from "@/components/animations/OpacityTransition";
import Image from "next/image";
import UpdateRequiredFieldsForm from "./UpdateRequiredFieldsForm";
import bg from "@/assets/images/auth/banner.webp";

const CompleteProfileMain = () => {
  const { user } = useUserContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // No user = redirect to login
    if (!user || user === undefined) {
      router.push("/auth/login");
      return;
    }

    // Already completed setup = deny access
    if (user.IsFirstTimeUpdated === true) {
      router.push("/user/profile");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(false);
  }, [user, router]);

  if (isLoading) return <Loader />;

  return (
    <OpacityTransition>
      <div className="relative w-full h-screen grid md:grid-cols-2">
        <div className="absolute z-10 bg-gradient-to-r from-secondary1/40 to-secondary1/50 w-full h-full" />
        <div className="absolute w-full h-full overflow-hidden z-0 -scale-x-100">
          <Image
            src={bg}
            alt="Hero-image"
            className="w-full h-full object-cover"
          />
        </div>
        <UpdateRequiredFieldsForm />
      </div>
    </OpacityTransition>
  );
};

export default CompleteProfileMain;
