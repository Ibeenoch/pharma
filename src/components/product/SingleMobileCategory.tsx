import React, {  } from "react";
interface SingleMobileCategoryProps {
  name: string;
  isActive?: boolean;
  index: number;
}

const SingleMobileCategory: React.FC<SingleMobileCategoryProps> = ({
  name,
  isActive,
  // index,
}) => {

  return (
    <p
      className={`text-xs font-normal text-white ${
        isActive ? "bg-black" : "bg-gray-500"
      }  flex justify-center items-cennter p-2 w-max rounded-lg`}
    >
      {name}
    </p>
  );
};

export default SingleMobileCategory;
