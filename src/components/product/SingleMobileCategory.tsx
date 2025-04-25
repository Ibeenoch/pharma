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
  // const [getIndex, setGetIndex] = useState<number>();
  // const activateCategory = (e: number) => {
  //   setGetIndex(index);
  // };
  return (
    <p
      // onClick={() => activateCategory(index)}
      className={`text-xs font-normal text-white ${
        isActive ? "bg-black" : "bg-gray-500"
      }  flex justify-center items-cennter p-2 w-max rounded-lg`}
    >
      {name}
    </p>
  );
};

export default SingleMobileCategory;
