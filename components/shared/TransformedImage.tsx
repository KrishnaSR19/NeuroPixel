import React from "react";
import Image from "next/image";
const TransformedImage = ({
  image,
  type,
  title,
  transformationConfig,
  isTransforming,
  setIsTransforming,
  hasDownload = true,
}: TransformedImageProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-[30px] leading-[140%] text-dark-600">
          Transformed
        </h3>
        {hasDownload && (
          <button
            className="font-medium text-[14px] leading-[120%] mt-2 flex items-center gap-2 px-2"
            onClick={(downloadHandler) => {}}
          >
            <Image
              src="/assets/icons/download.svg"
              alt="Download"
              width={24}
              height={24}
              className="pb-[6px]"
            />
          </button>
        )}
      </div>

      {image?.publicId && transformationConfig ? (
        <div className="relative"></div>
      ) : (
        <div className="flex justify-center items-center p-14-medium h-full min-h-72 flex-col gap-5 rounded-[16px] border border-dashed bg-purple-100/20 shadow-inner">
    Transformed Image
        </div>
      )}
    </div>
  );
};

export default TransformedImage;
