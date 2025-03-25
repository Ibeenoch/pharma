import React from "react";
interface PreviewImageProps {
  img: string;
  extraStyle?: string;
}
const PreviewImage: React.FC<PreviewImageProps> = ({ img, extraStyle }) => {
  return (
    <div className="bg-white p-2 border border-gray-200 cursor-pointer">
      <img
        src={img}
        alt="product image list item"
        className={`w-14 h-14 ${extraStyle}`}
      />
    </div>
  );
};

export default PreviewImage;
