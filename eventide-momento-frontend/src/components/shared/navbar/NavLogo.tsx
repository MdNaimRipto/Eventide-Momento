import logo from "@/assets/images/logo.svg";
import Image from "next/image";
const NavLogo = () => {
  return (
    <div className="py-2 h-[70px] md:h-full overflow-hidden">
      <Image src={logo} alt="logo" className="w-full h-full object-contain" />
    </div>
  );
};

export default NavLogo;
