import { ChangeEvent, useState } from "react";
import CustomText from "../../common/Text";
import { validator } from "../../../utils/validator";
import CustomInput from "../../common/Input";

const AddProduct = () => {
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
  const [productStockQty, setProductStockQty] = useState<number>(0);
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
          : "Product Stock Unit is requiredr",
        productStockQty: productStockQtyValid
          ? undefined
          : "Product Stock Quntity is requiredr",
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

  // name desc, categ, brand, price, expiredate, discount%, stockUnit num

  return (
    <form className="my-3 grid grid-cols-[60%_40%]">
      <section className="bg-white p-4 rounded-xl shadow-md pb-8">
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
            validate={(value) => validator(value, "others")}
            showFullWidth={true}
            textColor="text-gray-500"
            // labelStyle="text-gray-500 text-[14px] font-semibold"
            placeholder="Enter Product Name"
            errorMessage={error.productName || "Product name is required"}
          />
        </div>
        <div className="flex items-center gap-2">
          <CustomInput
            type="text"
            label="Product Brand"
            onChange={setProductBrand}
            value={productBrand}
            Id="productBrand"
            required={true}
            validate={(value) => validator(value, "others")}
            showFullWidth={true}
            textColor="text-gray-500"
            placeholder="Enter Product Brand"
            errorMessage={error.productBrand || "Product Brand is required"}
          />
          <CustomInput
            type="text"
            label="Product Category"
            onChange={setProductCategory}
            value={productCategory}
            Id="productCategory"
            required={true}
            validate={(value) => validator(value, "others")}
            showFullWidth={true}
            textColor="text-gray-500"
            placeholder="Enter Product Category"
            errorMessage={
              error.productCategory || "Product category is required"
            }
          />
        </div>
        <div className="flex items-center gap-2">
          <CustomInput
            type="text"
            label="Product Price"
            onChange={setProductPrice}
            value={productPrice}
            Id="productPrice"
            required={true}
            validate={(value) => validator(value, "others")}
            showFullWidth={true}
            textColor="text-gray-500"
            placeholder="Enter Product Price"
            errorMessage={error.productPrice || "Product Price is required"}
          />
          <CustomInput
            type="text"
            label="Product Category"
            onChange={setProductCategory}
            value={productCategory}
            Id="productCategory"
            required={true}
            validate={(value) => validator(value, "others")}
            showFullWidth={true}
            textColor="text-gray-500"
            placeholder="Enter Product Category"
            errorMessage={
              error.productCategory || "Product category is required"
            }
          />
        </div>
      </section>
    </form>
  );
};

export default AddProduct;
