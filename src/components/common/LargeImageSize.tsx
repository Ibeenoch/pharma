import React from "react";
interface LargeImageSizeProps {
  img: string;
  extraStyle?: string;
}

const LargeImageSize: React.FC<LargeImageSizeProps> = ({ img, extraStyle }) => {
  return (
    <section className="h-[70%] lg:h-full max-h-[550px] w-full bg-[#e6e1d8]">
      <img
        src={img}
        alt="profile full image"
        className={`w-full h-[70%] lg:h-full  bg-[#e6e1d8] ${extraStyle}`}
      />
    </section>
  );
};

export default LargeImageSize;
