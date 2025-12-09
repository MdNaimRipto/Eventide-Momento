"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { LocalFonts } from "@/components/common/fonts";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/contexts/AuthContext";
import { userApis } from "@/redux/features/userApis";
import { useAppDispatch } from "@/redux/hook";
import { postApiHandler } from "@/lib/postApiHandler";

const UserProfilePanel = () => {
  const router = useRouter();
  const { user } = useUserContext();

  const [isLoading, setIsLoading] = useState(false);
  const [logout] = userApis.useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    const option = {};
    const optionalTask = () => {
      router.push("/");
      dispatch(userApis.util.resetApiState());
    };
    await postApiHandler({
      mutateFn: logout,
      options: option,
      setIsLoading: setIsLoading,
      optionalTasksFn: optionalTask,
    });
  };

  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
    }
  }, []);

  // Click outside logic
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="absolute bottom-8 left-8 md:bottom-16 md:left-16"
    >
      {/* Trigger */}
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 cursor-pointer select-none"
      >
        <AiOutlineUser className="text-5xl md:text-6xl border border-black rounded-full p-1" />
        <div className="flex flex-col gap-1">
          <h6
            className={`${LocalFonts.anton.className} text-base md:text-xl hover:text-secondary1 duration-700`}
          >
            Hi {user?.userName}!
          </h6>
          <span className="text-[10px] md:text-xs font-light">
            Profile & Dashboard
          </span>
        </div>
      </div>

      {/* Mini Drawer */}
      <div
        ref={drawerRef}
        className={`
          ${LocalFonts.anton.className}
          absolute left-0 min-w-[200px] bottom-full mb-4 overflow-hidden
          bg-white border border-black/20
          transform transition-all duration-300 ease-out
          ${
            open
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3 pointer-events-none"
          }
        `}
        style={{ width: width ? `${width}px` : "auto" }}
      >
        <button
          onClick={() => router.push("/user/profile")}
          className="w-full text-left px-4 py-4 border-b border-secondary1/40 text-base md:text-xl hover:text-secondary1 duration-700"
        >
          Profile & Dashboard
        </button>

        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-4 text-base md:text-xl hover:text-secondary1 duration-700"
        >
          {isLoading ? "Loading..." : "Logout"}
        </button>
      </div>
    </div>
  );
};

export default UserProfilePanel;
