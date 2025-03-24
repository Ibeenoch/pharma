import React from "react";
interface LargeImageSizeProps {
  img: string;
}

const LargeImageSize: React.FC<LargeImageSizeProps> = ({ img }) => {
  return (
    <section className="h-[70%] lg:h-full  w-full bg-[#e6e1d8]">
      <img
        src={img}
        alt="profile full image"
        className="w-full h-[70%] lg:h-full  bg-[#e6e1d8]"
      />
    </section>
  );
};

export default LargeImageSize;
