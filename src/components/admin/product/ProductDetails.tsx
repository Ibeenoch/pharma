import React from "react";
import { mappedProductProps } from "../../../types/product/ProductData";
import CustomText from "../../common/Text";

interface ProductDetailsProps {
  product: mappedProductProps | undefined;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <div className="max-h-[400px] overflow-y-auto">
      <CustomText
        text={`#${product && product.$id}`}
        textType="small"
        weightType="semibold"
        extraStyle="my-1"
      />
      <CustomText
        text="Product details"
        textType="small"
        color="text-gray-500"
        weightType="normal"
        extraStyle="mt-1 pb-3 border-b border-gray-300"
      />
      <CustomText
        text="Items"
        textType="small"
        color="text-gray-500"
        weightType="normal"
        extraStyle="my-1"
      />
      <div className="flex gap-8 items-center justify-between border-b border-gray-300 pb-4">
        <div className="flex gap-1 items-center">
          <div className="flex gap-1 items-center p-2 border border-gray-300 rounded-lg">
            <img
              src={product && product.imagesUrl[0]}
              alt="items-img"
              className="w-7 h-7"
              loading="lazy"
            />
          </div>
          <div>
            <CustomText
              text={product && product.name}
              textType="extrasmall"
              weightType="semibold"
            />
            <CustomText
              text={product && product.category}
              textType="extrasmall"
              color="text-gray-500"
              weightType="normal"
              extraStyle=""
            />
          </div>
        </div>

        <div>
          {/* qty  */}
          <CustomText
            text={`${product && product.stock}pcs left`}
            textType="small"
            color="text-gray-500"
            weightType="normal"
          />
        </div>

        <div>
          {/* price  */}
          <CustomText
            text={`₦${product && product.price}`}
            textType="small"
            color="text-amber-500"
            weightType="medium"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 pb-4 pt-2 border-b border-gray-300">
        <CustomText
          text="Category"
          textType="small"
          color="text-gray-500"
          weightType="normal"
          extraStyle="my-1"
        />
        <CustomText
          text={product && product.category}
          textType="small"
          weightType="semibold"
          extraStyle="my-1"
        />
        <CustomText
          text="Brand"
          textType="small"
          color="text-gray-500"
          weightType="normal"
          extraStyle="my-1"
        />
        <CustomText
          text={product && product.brand}
          textType="small"
          weightType="semibold"
          extraStyle="my-1"
        />
        <CustomText
          text="Product serial No"
          textType="small"
          color="text-gray-500"
          weightType="normal"
          extraStyle="my-1"
        />
        <CustomText
          text={product && product.productSerialNo}
          textType="small"
          weightType="semibold"
          extraStyle="my-1"
        />
        <CustomText
          text="Expired"
          textType="small"
          color="text-gray-500"
          weightType="normal"
          extraStyle="my-1"
        />
        <CustomText
          text={product && product.expired}
          textType="small"
          color={`text-green-500`}
          weightType="semibold"
          extraStyle="my-1"
        />
      </div>

      <div className="border-b border-gray-300">
        <CustomText
          text="Product Price"
          textType="small"
          weightType="semibold"
          color="text-gray-500"
          extraStyle="my-1"
        />
        <div className="grid grid-cols-2">
          <CustomText
            text={"Price"}
            textType="small"
            color="text-gray-500"
            weightType="normal"
            extraStyle="my-1"
          />
          <CustomText
            text={`₦${product && product.price}`}
            textType="small"
            weightType="semibold"
            extraStyle="my-1"
          />
          <CustomText
            text="Total Stock"
            textType="small"
            color="text-gray-500"
            weightType="normal"
            extraStyle="my-1"
          />
          <CustomText
            text={`${product && product.stock}`}
            textType="small"
            weightType="semibold"
            extraStyle="my-1"
          />
        </div>
      </div>

      <div className="border-b border-gray-300">
        <div className="">
          <CustomText
            text="Product Description"
            textType="small"
            weightType="semibold"
            extraStyle="my-1"
          />

          <CustomText
            text={`${product && product.description}`}
            textType="small"
            color="text-gray-500"
            weightType="normal"
            extraStyle="my-1"
          />
        </div>
      </div>
      <div className="border-b border-gray-300">
        <div className="">
          <CustomText
            text="Additional Information"
            textType="small"
            weightType="semibold"
            extraStyle="my-1"
          />
          <CustomText
            text={`${product && product.additionalInfo}`}
            textType="small"
            color="text-gray-500"
            weightType="normal"
            extraStyle="my-1"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
