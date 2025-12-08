"use client";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect } from "react";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.log(error);
  }, [error]);

  const title = "Try Again";
  const splitText = title.split("");
  return (
    <div className="min-h-screen bg-secondary flex flex-col justify-center items-center gap-4">
      {/* <DotLottieReact className="w-1/3" src="/error.lottie" loop autoplay /> */}
      <h1 className="mt-4 text-2xl md:text-5xl font-semibold tracking-tight text-balance text-black">
        Something went wrong
      </h1>
      <p className="mt-0 md:mt-6 text-sm md:text-lg text-center font-medium text-pretty text-black/80 sm:text-xl/8">
        Sorry, we are facing issue in this page.
      </p>
      <p className="text-sm text-gray-600">
        {error.message || "An unexpected error occurred."}
      </p>

      {error.digest && (
        <p className="text-xs text-black">Error ID: {error.digest}</p>
      )}

      <button
        className="group border-2 border-black rounded-xl px-5 py-2 cursor-pointer bg-secondary1 text-white duration-300 overflow-hidden [perspective:1000px]"
        onClick={() => reset()}
      >
        {splitText.map((char, i) => (
          <span
            key={i}
            className="inline-block transform-gpu [transform-style:preserve-3d] group-hover:animate-spinY"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </button>
    </div>
  );
};

export default ErrorPage;
