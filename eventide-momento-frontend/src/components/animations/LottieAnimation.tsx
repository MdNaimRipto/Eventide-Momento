"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const LottieAnimation = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4">
      <DotLottieReact
        className=" lg:w-1/2 z-30"
        src="/loader.lottie"
        loop
        autoplay
      />
    </div>
  );
};

export default LottieAnimation;
