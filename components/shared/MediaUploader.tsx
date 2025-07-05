"use client";

import React from "react";
import { toast } from "sonner";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { dataUrl, getImageSize } from "@/lib/utils";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

type MediaUploaderProps = {
  onValueChange: (value: string) => void; // Function to handle value change
  setImage: React.Dispatch<React.SetStateAction<any>>; // Function to set the image state
  image: any; // Current image state
  publicId: string; // Public ID of the image
  type: string; // Type of the media (e.g., "image", "video")
};

const MediaUploader = ({
  onValueChange,
  setImage,
  image,
  publicId,
  type,
}: MediaUploaderProps) => {
  const onUploadSuccessHandler = (result: any) => {
    setImage((prevState: any) => ({
      ...prevState,
      publicId: result?.info?.public_id, // Update the publicId in the image state
      width: result?.info?.width, // Update the width in the image state
      height: result?.info?.height, // Update the height in the image state
      secureUrl: result?.info?.secure_url,
    }));
    // Handle the upload result here
    toast("Image uploaded successfully", {
      description: "1 credit has been deducted from your account",
      duration: 5000,
      className: "success-toast", // optional custom styling
    });
  };

  const onUploadErrorHandler = () => {
    toast("Something went wrong while uploading", {
      description: "Please try again",
      duration: 5000,
      className: "error-toast", // optional custom styling
    });
  };

  return (
    <>
      <CldUploadWidget
        uploadPreset="neuropixel"
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
              <>
                <div className="cursor-pointer overflow-hidden rounded-[10px]">
                  <CldImage
                    width={getImageSize(type, image, "width")}
                    height={getImageSize(type, image, "height")}
                    src={publicId}
                    alt="Uploaded Image"
                    sizes={"(max-width:767px) 100vw , 50vw"}
                    placeholder={dataUrl as PlaceholderValue}
                    className="h-fit min-h-72 w-full rounded-[10px] border border-dashed bg-purple-100/20 object-cover p-2"
                  />
                </div>
              </>
            ) : (
              <div
                className="flex justify-center items-center h-72 cursor-pointer flex-col gap-5 rounded-[16px] border border-dashed bg-purple-100/20 shadow-inner"
                onClick={() => open()}
              >
                <div className="rounded-[16px] bg-white  p-5 shadow-sm shadow-purple-200/50">
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
    </>
  );
};

export default MediaUploader;
