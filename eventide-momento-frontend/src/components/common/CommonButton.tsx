import { LocalFonts } from "./fonts";

const CommonButton = ({ title }: { title: string }) => {
  return (
    <button
      className={`w-[200px] px-3 py-2 bg-secondary2 text-secondary1 hover:bg-white duration-700 text-lg tracking-wide ${LocalFonts.anton.className}`}
    >
      {title}
    </button>
  );
};

export default CommonButton;
