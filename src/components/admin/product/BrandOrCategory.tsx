import React from "react";
import CustomSelect from "../../common/Select";
import { lightgrayBgColor } from "../../../constants/appColor";
import CustomText from "../../common/Text";
import { validator } from "../../../utils/validator";
import {
  productBrands,
  productCategories,
} from "../../../utils/admin/product/productList";

interface BrandOrCategoryProps {
  isBrand: boolean;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  val: string;
  errorMsg: string | undefined;
}

const BrandOrCategory: React.FC<BrandOrCategoryProps> = ({
  isBrand,
  onChange,
  val,
  errorMsg,
}) => {
  const filteredBrands: { value: string; label: string }[] = productBrands.map(
    (brand) => ({ value: brand.label, label: brand.label })
  );
  const filteredCategory: { value: string; label: string }[] =
    productCategories.map((brand) => ({
      value: brand.label,
      label: brand.label,
    }));
  return (
    <section className={`${lightgrayBgColor} p-4 rounded-xl mt-3  pb-8`}>
      <CustomText
        text={`${isBrand ? "Brand" : "Category"}`}
        textType="normal"
        weightType="semibold"
      />
      <div className="flex items-center gap-3 my-3">
        <CustomSelect
          label={`${isBrand ? "Product Brand" : "Product Category"}`}
          onChange={onChange}
          value={val}
          Id={`${isBrand ? "productBrand" : "productCategory"}`}
          required={true}
          showborder={false}
          roundedBorder={true}
          options={isBrand ? filteredBrands : filteredCategory}
          validate={(value) => validator(value, "others")}
          showFullWidth={true}
          errorMessage={
            errorMsg ||
            `${
              isBrand
                ? "Product Brand is required"
                : "Product Category is required"
            }`
          }
        />
      </div>
    </section>
  );
};

export default BrandOrCategory;
