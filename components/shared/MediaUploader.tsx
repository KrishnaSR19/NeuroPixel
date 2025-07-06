"use client";

import React from "react";
import { toast } from "sonner";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { dataUrl, getImageSize } from "@/lib/utils";

type UploadedImage = {
  publicId: string;
  width: number;
  height: number;
  secureUrl: string;
};

type MediaUploaderProps = {
  onValueChange: (value: string) => void;
  setImage: React.Dispatch<React.SetStateAction<UploadedImage>>;
  image: UploadedImage;
  publicId: string;
  type: string;
};

const MediaUploader = ({
  onValueChange,
  setImage,
  image,
  publicId,
  type,
}: MediaUploaderProps) => {
  const onUploadSuccessHandler = (result: any) => {
    const info = result?.info;
    if (!info) {
      onUploadErrorHandler();
      return;
    }

    const uploadedImage: UploadedImage = {
      publicId: info.public_id,
      width: info.width,
      height: info.height,
      secureUrl: info.secure_url,
    };

    setImage(uploadedImage);
    onValueChange(info.secure_url);

    toast("Image uploaded successfully", {
      description: "1 credit has been deducted from your account",
      duration: 5000,
      className: "success-toast",
    });
  };

  const onUploadErrorHandler = () => {
    toast("Something went wrong while uploading", {
      description: "Please try again",
      duration: 5000,
      className: "error-toast",
    });
  };

  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "neuropixel"}
      options={{
        multiple: false,
        resourceType: "image",
      }}
      onSuccess={onUploadSuccessHandler}
      onError={onUploadErrorHandler}
    >
      {({ open }) => (
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-[30px] leading-[140%] text-dark-600">
            Original
          </h3>

          {publicId ? (
            <div className="cursor-pointer overflow-hidden rounded-[10px]">
              <CldImage
                width={getImageSize(type, image, "width")}
                height={getImageSize(type, image, "height")}
                src={image?.secureUrl || publicId}
                alt="Uploaded Image"
                sizes="(max-width:767px) 100vw , 50vw"
                placeholder="blur"
                blurDataURL={dataUrl}
                className="h-fit min-h-72 w-full rounded-[10px] border border-dashed bg-purple-100/20 object-cover p-2"
              />
            </div>
          ) : (
            <div
              role="button"
              tabIndex={0}
              onClick={() => open()}
              onKeyDown={(e) => e.key === "Enter" && open()}
              className="flex justify-center items-center h-72 cursor-pointer flex-col gap-5 rounded-[16px] border border-dashed bg-purple-100/20 shadow-inner"
            >
              <div className="rounded-[16px] bg-white p-5 shadow-sm shadow-purple-200/50">
                <Image
                  src="/assets/icons/add.svg"
                  alt="Add Image"
                  width={24}
                  height={24}
                />
              </div>
              <p className="font-medium text-[14px] leading-[120%]">
                Click here to upload the image
              </p>
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default MediaUploader;   