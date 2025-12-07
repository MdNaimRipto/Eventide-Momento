"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { Spinner } from "@/components/ui/spinner";
import { apiConfig } from "@/configs/apiConfig";
import { IApiSuccessResponse } from "@/types/apiResponseTypes";
import { useDeleteImageMutation } from "@/redux/features/imageApis";
import { postApiHandler } from "@/lib/postApiHandler";

interface BannerUploaderProps {
  bannerUrl: string | null;
  setBannerUrl: (url: string | null) => void;
}

const SESSION_KEY = "newEventBanner";

const BannerUploader: React.FC<BannerUploaderProps> = ({
  bannerUrl,
  setBannerUrl,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [deleteImage] = useDeleteImageMutation();

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) setBannerUrl(stored);
  }, [setBannerUrl]);

  const handleBannerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);
      const fetchResponse = await fetch(
        apiConfig.BASE_URL + apiConfig.IMAGE.UPLOAD,
        { method: "POST", body: formData }
      );
      const response: IApiSuccessResponse = await fetchResponse.json();
      const imageUrl = response.data.url;
      sessionStorage.setItem(SESSION_KEY, imageUrl);
      setBannerUrl(imageUrl);
    } catch (err) {
      console.error("Error uploading banner:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!bannerUrl) return;
    const option = {
      data: {
        publicId: bannerUrl,
      },
    };

    await postApiHandler({
      mutateFn: deleteImage,
      options: option,
      setIsLoading: setIsDeleting,
      optionalTasksFn: () => {
        sessionStorage.removeItem(SESSION_KEY);
        setBannerUrl(null);
      },
    });
  };

  return (
    <div className="flex flex-col gap-1 relative">
      <label htmlFor="banner" className="font-medium text-sm">
        Banner
      </label>

      {bannerUrl ? (
        <div className="relative w-full">
          <Image
            src={bannerUrl}
            alt="Banner preview"
            className="w-full h-64 object-contain object-left bg-primary"
            width={400}
            height={400}
            priority
          />
          <button
            type="button"
            onClick={handleDelete}
            title="Remove banner"
            className="absolute top-2 right-2 bg-white/90 rounded-full p-1 text-red-500 hover:scale-105"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : <RxCross2 />}
          </button>
        </div>
      ) : (
        <>
          <input
            required
            id="banner"
            type="file"
            accept="image/*"
            placeholder="Upload Banner"
            className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary1"
            onChange={handleBannerChange}
            disabled={isUploading}
          />
          {isUploading && (
            <div className="mt-2 flex items-center gap-2 text-sm">
              <Spinner className="size-16" /> <span>Uploading...</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BannerUploader;
