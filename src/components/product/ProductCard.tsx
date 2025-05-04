import React from 'react'
import { ProductDataProps } from '../../types/product/ProductData'
import CustomText from '../common/Text'

interface ProductCardProps {
    item: ProductDataProps
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  return (
    <div className='mx-4 sm:mx-0'>
        <div className="h-46 w-40 xl:h-48 xl:w-42 flex items-center justify-center rounded-xl p-2 bg-white mb-3">
            <img
            src={item && item.imagesUrl && item.imagesUrl[0]}
            alt="medication categories"
            className="w-46 h-auto object-fill"
            />
        </div>
        <article>
            <CustomText
                text={item && item.name && item.name.length > 10 ? item.name.slice(0,10) + '...' :item.name}
                textType="small"
                weightType="bold"
                extraStyle="text-ellipsis"
            />
            <div className="flex gap-3 items-center">
            
                <CustomText
                text={`₦${item && item.discount && item.price && (item.price - ((item.discount / 100) * item.price))}`}
                textType="extrasmall"
                weightType="bold"
                color="text-amber-500"
                />
                <CustomText
                text={`₦${item && item.price}`}
                textType="extrasmall"
                weightType="bold"
                color="gray"
                extraStyle="line-through"
                />
            </div>
        </article>
    </div>
  )
}

export default ProductCard