import React from "react";
import CustomText from "../common/Text";

interface SingleCategoryItemProps {
  name: string;
  onChange: (checked:boolean, name: string) => void;
  productCategories: {
    category: string;
}[]
}

const SingleCategoryItem: React.FC<SingleCategoryItemProps> = ({ name, onChange, productCategories }) => {
  return (
    <div className="flex items-center gap-2">
      <input type="checkbox"  onChange={(e) => onChange(e.target.checked, name)}  name="category" id={`category-${name}`} />
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
