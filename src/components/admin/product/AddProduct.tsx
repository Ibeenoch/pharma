import { ChangeEvent, useRef, useState } from "react";
import CustomText from "../../common/Text";
import { validator } from "../../../utils/validator";
import CustomInput from "../../common/Input";
import { lightgrayBgColor } from "../../../constants/appColor";
import CustomTextArea from "../../common/TextArea";
import NoImage from "../../../assets/icons/picture-filled.svg?react";
import Plus from "../../../assets/icons/plus-slim.svg?react";
import Modal from "../../common/Modal";
import AddCatagory from "./AddCatagory";
import BrandOrCategory from "./BrandOrCategory";
import AddBrand from "./AddBrand";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { selectAuth } from "../../../features/auth/authSlice";
import CustomButton from "../../common/Button";
import { createProduct, selectproductAdmin } from "../../../features/admin/product/productSlice";
import { useParams } from "react-router-dom";

const AddProduct = () => {
  const { user } = useAppSelector(selectAuth);
  const { productAdmin } = useAppSelector(selectproductAdmin);
  const { id } = useParams();
  const singleProduct = productAdmin.find((p) => p.productId === id);
  const imageRef = useRef<HTMLInputElement>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>( id ? singleProduct?.imagesUrl ?? [] : []);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageIndexClicked, setimageIndexClicked] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [openBrandModal, setOpenBrandModal] = useState<boolean>(false);
  const [productName, setProductName] = useState<string>(id ? singleProduct?.name ?? '' : "");
  const [productDesc, setProductDesc] = useState<string>(id ? singleProduct?.description ?? '' : "");
  const [productCategory, setProductCategory] = useState<string>(id ? singleProduct?.category ?? '' : "");
  const [productBrand, setProductBrand] = useState<string>(id ? singleProduct?.brand ?? '' : "");
  const [productPrice, setProductPrice] = useState<string>(id ? (singleProduct?.price !== undefined ? singleProduct.price.toString() : "") : "");
  const [productDiscountPercent, setProductDiscountPercent] =
    useState<string>(id ? (singleProduct?.discount !== undefined ? singleProduct.discount.toString() : "") : "");
  const [productExpirationDate, setProductExpirationDate] =
    useState<string>(id ? singleProduct?.expirationDate ?? '' : "");
  const [productStockUnit, setProductStockUnit] = useState<string>(id ? singleProduct?.productSerialNo ?? '' : "");
  const [productStockQty, setProductStockQty] = useState<string>(id ? (singleProduct?.quantity !== undefined ? singleProduct.quantity.toString() : "") : "");
  const [additionalInfo, setadditionalInfo] = useState<string>(id ? singleProduct?.additionalInfo ?? '' : "");
  const [brandName, setBrandName] = useState<string>("");
  const brandImageRef = useRef<HTMLInputElement>(null);
  const [brandImageUrl, setBrandImageUrl] = useState<string>("");
  const [brandImageFile, setBrandImageFile] = useState<File>();
  const [categoryName, setCategoryName] = useState<string>("");
  const categoryImageRef = useRef<HTMLInputElement>(null);
  const [categoryImageUrl, setCategoryImageUrl] = useState<string>("");
  const [categoryImageFile, setCategoryImageFile] = useState<File>();
  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<{
    productName?: string;
    productDesc?: string;
    productCategory?: string;
    productBrand?: string;
    productPrice?: string;
    productStockUnit?: string;
    productStockQty?: string;
  }>({});
 

  const dispatch = useAppDispatch();

  const handleProductFormSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsFormSubmitting(true);
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
      !productPriceValid ||
      !productStockUnitValid ||
      !productStockQtyValid
    ) {
      setError({
        productName: productNameValid ? undefined : "Product name is required",
        productDesc: productDescValid
          ? undefined
          : "Product description is required",

        productPrice: productPriceValid
          ? undefined
          : "Product price is required",
        productStockUnit: productStockUnitValid
          ? undefined
          : "Product Stock Unit is required",
        productStockQty: productStockQtyValid
          ? undefined
          : "Product Stock Quantity is required",
      });
      setIsFormSubmitting(false);
      return;
    }
 

    const productData = new FormData();
    // Append each image file to FormData
    imageFiles.forEach((file) => {
      productData.append("imageFiles", file);
    });
    productData.append("name", productName);
    productData.append("description", productDesc);
    productData.append("price", String(parseInt(productPrice)));
    productData.append("qty", String(parseInt(productStockQty)));
    productData.append("discount", String(parseInt(productDiscountPercent)));
    productData.append("category", categoryName);
    if (categoryImageFile)
      productData.append("categoryImage", categoryImageFile);
    productData.append("brand", brandName);
    if (brandImageFile) productData.append("brandImage", brandImageFile);
    productData.append("expiration", productExpirationDate);
    productData.append("serialNo", productStockUnit);
    productData.append("additionalInfo", additionalInfo);
    productData.append("creator", user.userId ?? "");

    // creator: string;

    // isHotDeal?: boolean;
    // imagesUrl: string[];
    dispatch(createProduct(productData)).then((res) => {
      console.log("product res: ", res.payload);
      setIsFormSubmitting(false);
    });
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
      const imageUrl = URL.createObjectURL(file); // create a preview able image
      setUploadedImages((prev) => [...prev, imageUrl]); // append each image string to the image array and show the image preview
      setImageFiles((prev) => [...prev, file]); // append each image file to the image array
    }
  };

  const uploadImage = () => {
    uploadedImages.length < 5 && imageRef.current?.click();
  };

  const imageClicked = (index: number) => {
    setimageIndexClicked(index);
  };

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
              label="Product Stock Serial Number"
              onChange={setProductStockUnit}
              value={productStockUnit}
              Id="setProductStockUnit"
              showborder={false}
              roundedBorder={true}
              showFullWidth={true}
              textColor="text-gray-500"
              placeholder="Enter Product Stock Serial Number"
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
                  <img src={pic} alt="" className="w-18 h-18 cursor-pointer" />
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
                <span className="flex justify-center items-center bg-gray-200 p-2 rounded-full cursor-pointer">
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

      <CustomButton
        text="Create Product"
        type="submit"
        fullwidth={true}
        isLoading={isFormSubmitting}
      />

      <Modal
        isOpen={isModalOpen}
        children={
          openBrandModal ? (
            <AddBrand
              brandImageFile={brandImageFile}
              brandImageRef={brandImageRef}
              brandImageUrl={brandImageUrl}
              brandName={brandName}
              setBrandImageFile={setBrandImageFile}
              setBrandImageUrl={setBrandImageUrl}
              setBrandName={setBrandName}
              onClick={() => setIsModalOpen(false)}
            />
          ) : (
            <AddCatagory
              categoryImageUrl={categoryImageUrl}
              categoryImageFile={categoryImageFile}
              categoryImageRef={categoryImageRef}
              categoryName={categoryName}
              setCategoryImageFile={setCategoryImageFile}
              setCategoryImageUrl={setCategoryImageUrl}
              setCategoryName={setCategoryName}
              onClick={() => setIsModalOpen(false)}
            />
          )
        }
        onClose={() => setIsModalOpen(false)}
      />
    </form>
  );
};

export default AddProduct;
