import logo from "@/assets/images/logo.svg";
import Image from "next/image";
import Link from "next/link";
const NavLogo = () => {
  return (
    <Link href={"/"} className="py-2 h-[70px] md:h-full overflow-hidden">
      <Image src={logo} alt="logo" className="w-full h-full object-contain" />
    </Link>
  );
};

export default NavLogo;
