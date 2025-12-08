import { LocalFonts } from "./fonts";

interface CommonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

const CommonButton = ({ title, ...rest }: CommonButtonProps) => {
  return (
    <button
      {...rest}
      className={`w-[200px] px-3 py-2 bg-secondary2 disabled:opacity-45 text-secondary1 hover:bg-white disabled:hover:bg-secondary2 disabled:cursor-not-allowed duration-700 text-lg tracking-wide ${LocalFonts.anton.className}`}
    >
      {title}
    </button>
  );
};

export default CommonButton;
