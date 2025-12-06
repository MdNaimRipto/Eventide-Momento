import Image from "next/image";
import bg from "@/assets/images/auth/banner.webp";
import RegisterForm from "./RegisterForm";
import OpacityTransition from "@/components/animations/OpacityTransition";

const RegisterMain = () => {
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
        <RegisterForm />
      </div>
    </OpacityTransition>
  );
};

export default RegisterMain;
