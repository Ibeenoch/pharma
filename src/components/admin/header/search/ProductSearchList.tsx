import React, { lazy } from 'react'
import { ProductDataProps } from '../../../../types/product/ProductData'
const CustomText = lazy((() =>import('../../../common/Text'))) ;

interface ProductSearchListProps {
    product: ProductDataProps;
}

const ProductSearchList: React.FC<ProductSearchListProps> = ({ product }) => {
  return (
    <div className="flex items-center gap-2 p-4 border-b border-gray-200">
        <div className="p-1 bg-gray-100 rounded-full  ">
            <img src={product && product.imagesUrl && product.imagesUrl[0]} alt="product search image" className="w-6 h-6 rounded-full" />
        </div>

        <div className="max-w-[90%]">
            <CustomText text={product && product.name} textType="small" weightType="semibold" />
            <CustomText text={product && product.description.slice(0, 150)} textType="extrasmall" weightType="medium" color="text-gray-500" />
        </div>
    </div>
  )
}

export default ProductSearchList