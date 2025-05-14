import { ChangeEvent, FormEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import { validator } from "../../../utils/validator";
import { lightgrayBgColor } from "../../../constants/appColor";
import NoImage from "../../../assets/icons/picture-filled.svg?react";
import Plus from "../../../assets/icons/plus-slim.svg?react";
import DeleteBtn from "../../../assets/icons/trash-bin.svg?react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { selectAuth } from "../../../features/auth/authSlice";
import {
  createProduct,
  invalidateFetchAllProductCache,
  selectproductAdmin,
  setProductSubTabIndex,
  updateProduct,
} from "../../../features/admin/product/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import { setTitleIndex } from "../../../features/admin/adminSlice";
import CustomTextArea from "../../common/TextArea";
import CustomInput from "../../common/Input";
import CustomText from "../../common/Text";
import BrandOrCategory from "./BrandOrCategory";
import CustomButton from "../../common/Button";

const AddProduct = () => {
  const { user } = useAppSelector(selectAuth);
  const { productAdmin } = useAppSelector(selectproductAdmin);
  const { id } = useParams();
  const singleProduct = (Array.isArray(productAdmin) &&
    productAdmin.find((p) => p.$id === id)) || {
    imagesUrl: [],
    name: "",
    description: "",
    category: "",
    brand: "",
    price: null,
    discount: null,
    expirationDate: "",
    productSerialNo: "",
    additionalInfo: "",
    quantity: null,
  };

  useEffect(() => {
      dispatch(setTitleIndex(2));
      dispatch(setProductSubTabIndex(1));
  }, [])
  
  const imageRef = useRef<HTMLInputElement>(null); 
  const [uploadedImages, setUploadedImages] = useState<string[]>(
    id ? singleProduct?.imagesUrl ?? [] : []
  );
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageIndexClicked, setimageIndexClicked] = useState<number>(0);
  const [productName, setProductName] = useState<string>(
    id ? singleProduct?.name ?? "" : ""
  );
  const [productDesc, setProductDesc] = useState<string>(
    id ? singleProduct?.description ?? "" : ""
  );
  const [productCategory, setProductCategory] = useState<string>(
    id ? singleProduct?.category ?? "" : ""
  );
  const [productBrand, setProductBrand] = useState<string>(
    id ? singleProduct?.brand ?? "" : ""
  );
  const [productPrice, setProductPrice] = useState<string>(
    id
      ? singleProduct?.price !== undefined && singleProduct?.price !== null
        ? singleProduct.price.toString()
        : ""
      : ""
  );
  const [productDiscountPercent, setProductDiscountPercent] = useState<string>(
    id
      ? singleProduct?.discount !== undefined &&
        singleProduct?.discount !== null
        ? singleProduct.discount.toString()
        : ""
      : ""
  );
  const [productExpirationDate, setProductExpirationDate] = useState<string>(
    id && singleProduct?.expirationDate
      ? new Date(singleProduct.expirationDate).toISOString().split("T")[0]
      : ""
  );
  const [productStockUnit, setProductStockUnit] = useState<string>(
    id ? singleProduct?.productSerialNo ?? "" : ""
  );
  const [productStockQty, setProductStockQty] = useState<string>(
    id
      ? singleProduct?.quantity !== undefined &&
        singleProduct?.quantity !== null
        ? singleProduct.quantity.toString()
        : ""
      : ""
  );
  const [additionalInfo, setadditionalInfo] = useState<string>(
    id ? singleProduct?.additionalInfo ?? "" : ""
  );
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
  const navigate = useNavigate();

  const handleProductFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !user.userId || user.role?.toLowerCase() !== "admin") return;

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
      !productCategoryValid ||
      !productBrandValid ||
      !productStockQtyValid
    ) {
      setError({
        productName: productNameValid ? undefined : "Product name is required",
        productCategory: productCategoryValid
          ? undefined
          : "Product category is required",
        productBrand: productBrandValid
          ? undefined
          : "Product brand is required",
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
    productData.append("category", productCategory);

    productData.append("brand", productBrand);
    productData.append("expiration", productExpirationDate);
    productData.append("serialNo", productStockUnit);
    productData.append("additionalInfo", additionalInfo);
    productData.append("creator", user.userId ?? "");

    if (id) {
      productData.append("productId", id);
      productData.append("uploadedImages", JSON.stringify(uploadedImages));
      dispatch(updateProduct(productData)).then(() => {
        setIsFormSubmitting(false);
        dispatch(invalidateFetchAllProductCache(true));
        navigate(`/admin/product/all/${user && user.userId}`);
      });
    } else {
      dispatch(createProduct(productData)).then(() => {
        setIsFormSubmitting(false);
        dispatch(invalidateFetchAllProductCache(true));
        navigate(`/admin/product/all/${user && user.userId}`);
      });
    }
  };

  const handleImageUploaded = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // create a preview able image
      setUploadedImages((prev) => [...prev, imageUrl]); // append each image string to the image array and show the image preview
      setImageFiles((prev) => [...prev, file]); // append each image file to the image array
    }
  };
// handle when a user wants to add an image
  const uploadImage = () => {
    uploadedImages.length < 5 && imageRef.current?.click();
  };
// handle the image the user wants to view that was clicked
  const imageClicked = (index: number) => {
    setimageIndexClicked(index);
  };
  useLayoutEffect(() => {
    setimageIndexClicked(imageIndexClicked === 0 ? 0 : imageIndexClicked - 1);
  }, [uploadedImages])
// handle the image the user wants to remove when they was clicked the delete button
  const removeImgFromArray = (index: number) => {
    const newArr = [...uploadedImages];
    newArr.splice(index, 1);
    setUploadedImages(newArr)
   
  }

  return (
    <form
      className="my-3 block w-full mx-auto md:grid grid-cols-[58%_41%] gap-3"
      onSubmit={handleProductFormSubmit}
    >
      <div className="w-full pt-2">
        <section className={`${lightgrayBgColor} w-full p-4 rounded-xl mb-3  pb-8`}>
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
          <div className="block sm:flex items-center gap-3">
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
          <div className="block sm:flex items-center gap-3">
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
      <div className="pb-4">
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
                  <div className="relative">
                    <img src={pic} alt="" className="w-18 h-18 cursor-pointer" />
                    <div onClick={() => removeImgFromArray(index)} className="absolute bottom-0 right-0 cursor-pointer">
                      <DeleteBtn className="text-amber-500 w-5 h-5" />
                    </div>
                  </div>
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
                <div className="flex flex-col justify-center items-center">
                  <span className="flex mb-2 justify-center items-center bg-gray-200 p-2 rounded-full cursor-pointer">
                    <Plus className="w-4 h-4 text-white" />
                  </span>
                    <CustomText text="Add Image" textType="extrasmall" color="text-gray-400" />
                </div>
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
          onChange={setProductCategory}
          errorMsg={error.productCategory}
        />

        <BrandOrCategory
          isBrand={true}
          val={productBrand}
          onChange={setProductBrand}
          errorMsg={error.productBrand}
        />
      </div>

      <CustomButton
        text={id ? "Update Document" : "Create Product"}
        type="submit"
        fullwidth={true}
        isLoading={isFormSubmitting}
      />
    </form>
  );
};

export default AddProduct;
