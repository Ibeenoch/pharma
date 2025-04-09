import React, { ChangeEvent, useRef, useState } from "react";
import { lightgrayBgColor } from "../../../constants/appColor";
import CustomInput from "../../common/Input";
import CustomText from "../../common/Text";
import Photo from "../../../assets/icons/picture-filled.svg?react";
import CustomButton from "../../common/Button";

interface AddBrandProps {
  brandName: string;
  setBrandName: React.Dispatch<React.SetStateAction<string>>;
  brandImageUrl: string;
  setBrandImageUrl: React.Dispatch<React.SetStateAction<string>>;
  brandImageRef: React.RefObject<HTMLInputElement | null>;
  brandImageFile: File | undefined;
  setBrandImageFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  onClick: () => void;
}

const AddBrand: React.FC<AddBrandProps> = ( { brandName, setBrandImageUrl, brandImageUrl, onClick, setBrandName, brandImageRef, brandImageFile,setBrandImageFile }) => {
  // const [brandName, setBrandName] = useState<string>("");
  // const brandImageRef = useRef<HTMLInputElement>(null);
  // const [brandImageUrl, setBrandImageUrl] = useState<string>("");
  // const [brandImageFile, setBrandImageFile] = useState<File>();

  const handleImageClicked = () => {
    brandImageRef.current?.click();
  };

  const handleImageUploaded = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBrandImageUrl(imageUrl);
      setBrandImageFile(file)
    }
  };
  return (
    <form className={`p-4 ${lightgrayBgColor} rounded-xl`}>
      <CustomText
        text="Add Brand"
        textType="medium"
        weightType="semibold"
        extraStyle="my-2"
      />
      <CustomInput
        label="Brand Name"
        value={brandName}
        onChange={setBrandName}
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
        {brandImageUrl ? (
          <img className="w-22 h-22" src={brandImageUrl} alt="Brand image cover" />
        ) : (
          <Photo className="w-22 h-22 text-gray-300" />
        )}
        <input
          ref={brandImageRef}
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
        text="Add Brand"
        textSize="normal"
        weightType="medium"
        fullwidth={true}
        showArrow={true}
        onClick={onClick}
      />
    </form>
  );
};

export default AddBrand;
