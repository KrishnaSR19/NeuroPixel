import React from "react";
import { toast } from "sonner";
import { CldUploadWidget } from "next-cloudinary";

const MediaUploader = () => {
  const onUploadSuccessHandler = (result: any) => {
    // Handle the upload result here
  toast('Image uploaded successfully', {
    description: '1 credit has been deducted from your account',
    duration: 5000,
    className: 'success-toast', // optional custom styling
  });
  };

const onUploadErrorHandler = () => {
  toast('Something went wrong while uploading', {
    description: 'Please try again',
    duration: 5000,
    className: 'error-toast', // optional custom styling
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

      </CldUploadWidget>
    </>
  );
};

export default MediaUploader;
