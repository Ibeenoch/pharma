import { ChangeEvent, useRef, useState } from "react";
import { lightgrayBgColor } from "../../../constants/appColor";
import CustomInput from "../../common/Input";
import CustomText from "../../common/Text";
import Photo from "../../../assets/icons/picture-filled.svg?react";
import CustomButton from "../../common/Button";

const AddCatagory = () => {
  const [name, setname] = useState<string>("");
  const imageRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleImageClicked = () => {
    imageRef.current?.click();
  };

  const handleImageUploaded = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }
  };
  return (
    <form className={`p-4 ${lightgrayBgColor} rounded-xl`}>
      <CustomText
        text="Add Category"
        textType="medium"
        weightType="semibold"
        extraStyle="my-2"
      />
      <CustomInput
        label="Category Name"
        value={name}
        onChange={setname}
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
        {imageUrl ? (
          <img
            className="w-22 h-22"
            src={imageUrl}
            alt="category image cover"
          />
        ) : (
          <Photo className="w-22 h-22 text-gray-300" />
        )}
        <input
          ref={imageRef}
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
      />
    </form>
  );
};

export default AddCatagory;
