import React from "react";
interface LargeImageSizeProps {
  img: string;
  extraStyle?: string;
  bg?: string;
}

const LargeImageSize: React.FC<LargeImageSizeProps> = ({
  img,
  extraStyle,
  bg = "default",
}) => {
  return (
    <section
      className={`h-[70%] lg:h-full max-h-[550px] w-full pt-5 ${
        bg === "default" ? "bg-[#e6e1d8]" : bg
      } `}
    >
      <img
        src={img}
        alt="profile full image"
        className={`w-full h-[70%] lg:h-full   ${
          bg === "default" ? "bg-[#e6e1d8]" : bg
        }  ${extraStyle}`}
      />
    </section>
  );
};

export default LargeImageSize;
