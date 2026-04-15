"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

declare global {
  interface Window {
    __lottieBufferWarnPatched?: boolean;
  }
}

if (typeof window !== "undefined" && !window.__lottieBufferWarnPatched) {
  window.__lottieBufferWarnPatched = true;
  const BUFFER_MISMATCH = /Buffer size mismatch/;
  const origWarn = console.warn.bind(console);
  const origError = console.error.bind(console);
  const shouldMute = (args: unknown[]) =>
    typeof args[0] === "string" && BUFFER_MISMATCH.test(args[0] as string);
  console.warn = (...args: unknown[]) => {
    if (shouldMute(args)) return;
    origWarn(...args);
  };
  console.error = (...args: unknown[]) => {
    if (shouldMute(args)) return;
    origError(...args);
  };
}

const LottieAnimation = () => {
  return (
    <div className="min-h-screen bg-primary flex flex-col justify-center items-center gap-4">
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
