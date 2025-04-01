import { ChangeEvent, useRef, useState } from "react";
import CustomText from "../../common/Text";
import { validator } from "../../../utils/validator";
import CustomInput from "../../common/Input";
import { lightgrayBgColor } from "../../../constants/appColor";
import CustomTextArea from "../../common/TextArea";
import NoImage from "../../../assets/icons/picture-filled.svg?react";
import Plus from "../../../assets/icons/plus-slim.svg?react";
import CustomSelect from "../../common/Select";
import CustomButton from "../../common/Button";
import Modal from "../../common/Modal";
import AddCatagory from "./AddCatagory";
import BrandOrCategory from "./BrandOrCategory";
import AddBrand from "./AddBrand";

const AddProduct = () => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [imageIndexClicked, setimageIndexClicked] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [openBrandModal, setOpenBrandModal] = useState<boolean>(false);

  const [productName, setProductName] = useState<string>("");
  const [productDesc, setProductDesc] = useState<string>("");
  const [productCategory, setProductCategory] = useState<string>("");
  const [productBrand, setProductBrand] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [productDiscountPercent, setProductDiscountPercent] =
    useState<string>("");
  const [productExpirationDate, setProductExpirationDate] =
    useState<string>("");
  const [productStockUnit, setProductStockUnit] = useState<string>("");
  const [productStockQty, setProductStockQty] = useState<string>("");
  const [additionalInfo, setadditionalInfo] = useState<string>("");
  const [error, setError] = useState<{
    productName?: string;
    productDesc?: string;
    productCategory?: string;
    productBrand?: string;
    productPrice?: string;
    productStockUnit?: string;
    productStockQty?: string;
  }>({});

  const handleProductFormSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const productNameValid = validator(productName, "others");
    const productDescValid = validator(productDesc, "others");
    const productCategoryValid = validator(productCategory, "others");
    const productBrandValid = validator(productBrand, "others");
    const productPriceValid = validator(productPrice, "others");
    const productStockUnitValid = validator(productStockUnit, "others");
    const productStockQtyValid = validator(productStockQty, "others");

    if (
      !productNameValid ||
      !productDescValid ||
      !productCategoryValid ||
      !productBrandValid ||
      !productPriceValid ||
      !productStockUnitValid ||
      !productStockQtyValid
    ) {
      setError({
        productName: productNameValid ? undefined : "Product name is required",
        productDesc: productDescValid
          ? undefined
          : "Product description is required",
        productCategory: productCategoryValid
          ? undefined
          : "Product category is required",
        productBrand: productBrandValid
          ? undefined
          : "Product brand is required",
        productPrice: productPriceValid
          ? undefined
          : "Product price is required",
        productStockUnit: productStockUnitValid
          ? undefined
          : "Product Stock Unit is required",
        productStockQty: productStockQtyValid
          ? undefined
          : "Product Stock Quntity is required",
      });
      return;
    }

    console.log(
      productName,
      productBrand,
      productCategory,
      productDesc,
      productPrice,
      productStockUnit
    );
  };

  const handleShowCategoryModal = () => {
    setIsModalOpen(true);
    setOpenBrandModal(false);
  };
  const handleShowBrandModal = () => {
    setIsModalOpen(true);
    setOpenBrandModal(true);
  };
  const handleImageUploaded = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImages((prev) => [...prev, imageUrl]);
    }
  };

  const uploadImage = () => {
    uploadedImages.length < 5 && imageRef.current?.click();
  };

  const imageClicked = (index: number) => {
    setimageIndexClicked(index);
  };
  // name desc, categ, brand, price, expiredate, discount%, stockUnit num

  return (
    <form
      className="my-3 md:grid grid-cols-[58%_41%] gap-3"
      onSubmit={handleProductFormSubmit}
    >
      <div>
        <section className={`${lightgrayBgColor} p-4 rounded-xl mb-3  pb-8`}>
          <CustomText
            text="General information"
            textType="small"
            weightType="semibold"
          />
          <div className="">
            <CustomInput
              type="text"
              label="Product Name"
              onChange={setProductName}
              value={productName}
              Id="productName"
              required={true}
              showborder={false}
              roundedBorder={true}
              validate={(value) => validator(value, "others")}
              showFullWidth={true}
              textColor="text-gray-500"
              placeholder="Enter Product Name"
              errorMessage={error.productName || "Product name is required"}
            />
          </div>
          <div className="">
            <CustomTextArea
              label="Product Description"
              onChange={setProductDesc}
              value={productDesc}
              Id="productDesc"
              required={true}
              showborder={false}
              roundedBorder={true}
              validate={(value) => validator(value, "others")}
              showFullWidth={true}
              textColor="text-gray-500"
              placeholder="Enter Product Description"
              errorMessage={
                error.productDesc || "Product Description is required"
              }
            />
          </div>
        </section>
        <section className={`${lightgrayBgColor} p-4 rounded-xl mt-3  pb-8`}>
          <CustomText
            text="Price And Stock"
            textType="small"
            weightType="semibold"
          />
          <div className="flex items-center gap-3">
            <CustomInput
              type="text"
              label="Product Price"
              onChange={setProductPrice}
              value={productPrice}
              Id="productPrice"
              required={true}
              showborder={false}
              roundedBorder={true}
              validate={(value) => validator(value, "others")}
              showFullWidth={true}
              textColor="text-gray-500"
              placeholder="Enter Product Price"
              errorMessage={error.productPrice || "Product Price is required"}
            />
            <CustomInput
              type="text"
              label="Stock Quantity"
              onChange={setProductStockQty}
              value={productStockQty}
              Id="productStockQty"
              required={true}
              showborder={false}
              roundedBorder={true}
              validate={(value) => validator(value, "others")}
              showFullWidth={true}
              textColor="text-gray-500"
              placeholder="Enter Stock Quantity"
              errorMessage={
                error.productStockQty || "Stock Quantity is required"
              }
            />
          </div>

          <div className="flex items-center gap-3">
            <CustomInput
              type="text"
              label="Product Discount Percent"
              onChange={setProductDiscountPercent}
              value={productDiscountPercent}
              Id="productDiscountPercent"
              showborder={false}
              roundedBorder={true}
              showFullWidth={true}
              textColor="text-gray-500"
              placeholder="Enter Discount Percent"
            />
          </div>
        </section>

        <section className={`${lightgrayBgColor} p-4 rounded-xl mt-3  pb-8`}>
          <CustomText
            text="Product Expiration and Other Info"
            textType="small"
            weightType="semibold"
          />
          <div className="flex items-center gap-3">
            <CustomInput
              type="date"
              label="Product Expiration Date"
              onChange={setProductExpirationDate}
              value={productExpirationDate}
              Id="productExpirationDate"
              showborder={false}
              roundedBorder={true}
              showFullWidth={true}
              textColor="text-gray-500"
              placeholder="Enter Expiration Date"
            />
            <CustomInput
              type="text"
              label="Product Stock Number"
              onChange={setProductStockUnit}
              value={productStockUnit}
              Id="setProductStockUnit"
              showborder={false}
              roundedBorder={true}
              showFullWidth={true}
              textColor="text-gray-500"
              placeholder="Enter Product Stock Number"
            />
          </div>

          <div className="">
            <CustomTextArea
              row={7}
              label="Additional Info"
              onChange={setadditionalInfo}
              value={additionalInfo}
              Id="additionalInfo"
              showborder={false}
              roundedBorder={true}
              showFullWidth={true}
              textColor="text-gray-500"
              placeholder="Enter Additional Product Info"
            />
          </div>
        </section>
      </div>
      {/* image, categories and brands */}
      <div>
        <section className={`${lightgrayBgColor} p-4 rounded-xl pb-8`}>
          <div className="flex items-center gap-2">
            <CustomText
              text="Upload image"
              textType="small"
              weightType="semibold"
              extraStyle="my-3"
            />
            <CustomText
              text="(Max 5 images)"
              textType="small"
              weightType="medium"
              extraStyle="my-3"
              color="text-amber-500"
            />
          </div>
          <div className="p-2 flex justify-center items-center bg-white rounded-md my-3">
            {uploadedImages.length > 0 ? (
              <img
                src={uploadedImages[imageIndexClicked]}
                alt=""
                className="w-3/5 h-auto"
              />
            ) : (
              <div className="w-full flex flex-col justify-center items-center">
                <NoImage className="w-40 h-40 text-gray-300" />
                <CustomText
                  text="No Image has been uploaded"
                  textType="normal"
                  weightType="medium"
                  color="text-gray-400"
                />
              </div>
            )}
          </div>
          <div className="flex gap-2 items-center overflow-x-auto">
            {uploadedImages.length > 0 ? (
              uploadedImages.map((pic, index) => (
                <div
                  onClick={() => imageClicked(index)}
                  className={`p-2 flex justify-center items-center bg-white rounded-md  ${
                    imageIndexClicked === index ? "border border-gray-300" : ""
                  }`}
                >
                  <img src={pic} alt="" className="w-18 h-18" />
                </div>
              ))
            ) : (
              <></>
            )}

            {uploadedImages.length < 5 && (
              <div
                onClick={uploadImage}
                className="p-2 w-23 h-23 flex justify-center items-center bg-white rounded-md border border-dashed border-gray-300"
              >
                <span className="flex justify-center items-center bg-gray-200 p-2 rounded-full">
                  <Plus className="w-4 h-4 text-white" />
                </span>
                <input
                  ref={imageRef}
                  hidden={true}
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  onChange={handleImageUploaded}
                  multiple={false}
                />
              </div>
            )}
          </div>
        </section>

        <BrandOrCategory
          isBrand={false}
          val={productCategory}
          openModalFunc={handleShowCategoryModal}
          onChange={setProductCategory}
          errorMsg={error.productCategory}
        />

        <BrandOrCategory
          isBrand={true}
          val={productBrand}
          openModalFunc={handleShowBrandModal}
          onChange={setProductBrand}
          errorMsg={error.productBrand}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        children={openBrandModal ? <AddBrand /> : <AddCatagory />}
        onClose={() => setIsModalOpen(false)}
      />
    </form>
  );
};

export default AddProduct;
