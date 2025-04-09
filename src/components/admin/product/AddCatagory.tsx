import { ChangeEvent, useRef, useState } from "react";
import { lightgrayBgColor } from "../../../constants/appColor";
import CustomInput from "../../common/Input";
import CustomText from "../../common/Text";
import Photo from "../../../assets/icons/picture-filled.svg?react";
import CustomButton from "../../common/Button";

interface AddCategoryProps {
  categoryName: string;
  setCategoryName: React.Dispatch<React.SetStateAction<string>>;
  categoryImageUrl: string;
  setCategoryImageUrl: React.Dispatch<React.SetStateAction<string>>;
  categoryImageRef: React.RefObject<HTMLInputElement | null>;
  categoryImageFile: File | undefined;
  setCategoryImageFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  onClick: () => void;
}

const AddCatagory: React.FC<AddCategoryProps> = ({
  categoryName,
  setCategoryName,
  categoryImageUrl,
  setCategoryImageUrl,
  categoryImageRef,
  categoryImageFile,
  setCategoryImageFile,
  onClick,
}) => {
  const handleImageClicked = () => {
    categoryImageRef.current?.click();
  };

  const handleImageUploaded = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCategoryImageUrl(imageUrl);
      setCategoryImageFile(file);
    }
  };
  return (
    <section className={`p-4 ${lightgrayBgColor} rounded-xl`}>
      <CustomText
        text="Add Category"
        textType="medium"
        weightType="semibold"
        extraStyle="my-2"
      />
      <CustomInput
        label="Category Name"
        value={categoryName}
        onChange={setCategoryName}
        type="text"
        showFullWidth={true}
        showborder={false}
      />

      <CustomText
        text="Preview Image"
        textType="normal"
        weightType="semibold"
        extraStyle="mt-3 mb-2"
      />
      <div
        onClick={handleImageClicked}
        className="w-full border border-dashed rounded-xl bg-white mb-6 border-gray-300 flex justify-center py-6 items-center mb-3"
      >
        {categoryImageUrl ? (
          <img
            className="w-22 h-22 cursor-pointer"
            src={categoryImageUrl}
            alt="category image cover"
          />
        ) : (
          <Photo className="w-22 h-22 text-gray-300 cursor-pointer" />
        )}
        <input
          ref={categoryImageRef}
          hidden
          type="file"
          name="uploadImage"
          id="uploadImage"
          onChange={handleImageUploaded}
          accept="image/*"
          multiple={false}
        />
      </div>
      <CustomButton
        text="Add Category"
        textSize="normal"
        weightType="medium"
        fullwidth={true}
        showArrow={true}
        onClick={onClick}
      />
    </section>
  );
};

export default AddCatagory;
