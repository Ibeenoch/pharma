import React from "react";
import CustomText from "./Text";

interface SingleCategoryItemProps {
  name: string;
}

const SingleCategoryItem: React.FC<SingleCategoryItemProps> = ({ name }) => {
  return (
    <div className="flex items-center gap-2">
      <input type="checkbox" value={name} name="categories" id="categories" />
      <CustomText
        text={name}
        textType="small"
        weightType="bold"
        extraStyle="my-2"
      />
    </div>
  );
};

export default SingleCategoryItem;
