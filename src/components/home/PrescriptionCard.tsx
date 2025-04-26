import React from "react";
import DrugTab from "../common/DrugTab";
import CustomText from "../common/Text";
import CustomButton from "../common/Button";
import Heart from "../../assets/icons/heart.svg?react";
import Cart from "../../assets/icons/cart-fill-white.svg?react";
import Ok from "../../assets/icons/like.svg?react";
import Stop from "../../assets/icons/thumb-down.svg?react";
import img from "../../assets/images/cc5.png";
import { CartProductDataProps, cartProps, PrescriptionProps } from "../../types/product/ProductData";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { selectproductAdmin } from "../../features/admin/product/productSlice";
import { addToCart, addTowishlist } from "../../features/cart/cartSlice";



const PrescriptionCard: React.FC<PrescriptionProps> = ({ aboutDrug,ageRange, concentration, dosage, dosageForm, duration, frequency, ingredient,methodOfUsage,productId,  productImage, productName ,productSummary, whenTakeDosage, sastifiedClient }) => {
    const dispatch = useAppDispatch();
      const { productAdmin } = useAppSelector(selectproductAdmin);
    
    const handleAddToCart = (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      const productItem = productAdmin.find((item) => item.$id === productId)!;

      const productCart: CartProductDataProps = {
        ...productItem,
        subtotal:
          productItem.price -
          productItem.price *
            (productItem.discount ? productItem.discount / 100 : 0),
        total:
          productItem.price -
          productItem.price *
            (productItem.discount ? productItem.discount / 100 : 0) +
          1500,
      };
      const product: cartProps = { item: productCart, qty: 1 };
      dispatch(addToCart(product));
    };
    const handleAddToWishList = (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      const productItem = productAdmin.find((item) => item.$id === id)!;
      const wishList = { item: productItem };
      dispatch(addTowishlist(wishList));
    };

  return (
    <div className="bg-[#fbfcf8] p-2 rounded-lg my-4">
      <div className="flex gap-2 items-center">
        <div className="p-2 rounded-lg bg-white">
          <img
            src={productImage}
            alt="image prescription"
            className="w-auto h-50 rounded-lg"
          />
        </div>
        <div>
          <CustomText
            text={productName}
            textType="medium"
            weightType="semibold"
          />
          <CustomText
            text={productSummary}
            textType="small"
            weightType="medium"
            color="text-gray-400"
          />
          <div className="grid grid-cols-2 gap-2 pt-6">
            <DrugTab topText="Concentration" bottomText={concentration}/>
            <DrugTab topText="Dosage Form" bottomText={dosageForm} />
          </div>
        </div>
      </div>

      {/* satisifed patient */}
      <div className="p-4 rounded-lg flex items-center bg-white my-3 justify-between">
        <CustomText
          text="Satisified Patients"
          textType="normal"
          weightType="semibold"
          color="text-gray-400"
        />
        <CustomText text={String(sastifiedClient)} textType="normal" weightType="semibold" />
      </div>
      {/* action button  */}
      <div className="flex gap-2 items-center">
        <div onClick={(e) => handleAddToCart(e, productId)}
        >

        <CustomButton
          text="Buy Now"
          type="button"
          weightType="medium"
          defaultBackgroundColor="bg-green-600 hover:bg-green-600/10"
          defaultBorderColor="hover:border hover:border-green-600"
          fullwidth={true}
          showIcon={true}
          PreFixIcon={Cart}
          PreFixIconWeight="stroke-2"
          PreFixIconStyle="fill-white group-hover:text-green-600"
          borderRadiusType="threecurved"
          defaultTextColor="text-white group-hover:text-green-600"
        />
        </div>

      <div 
      onClick={(e) => handleAddToWishList(e, productId)}
      >

        <CustomButton
          text="Add Favorite"
          type="button"
          weightType="medium"
          defaultBackgroundColor="bg-amber-600 hover:bg-amber-600/10"
          defaultBorderColor="hover:border hover:border-amber-600"
          fullwidth={true}
          showIcon={true}
          PreFixIcon={Heart}
          PreFixIconWeight="stroke-2"
          PreFixIconStyle="fill-white group-hover:text-amber-600"
          borderRadiusType="threecurved"
          defaultTextColor="text-white group-hover:text-amber-600"
        />
      </div>
      </div>
      {/* about drug  */}
      <div>
        <CustomText
          text="About Drug"
          textType="medium"
          weightType="semibold"
          extraStyle="pb-6 pt-4"
        />

        <CustomText
          text={aboutDrug}
          textType="small"
          weightType="medium"
          color="text-gray-500"
        />
      </div>

      {/* ingredient  */}
      <div>
        <CustomText
          text="Ingredient"
          textType="medium"
          weightType="semibold"
          extraStyle="pb-6 pt-4"
        />
        <ul className="grid grid-cols-2 text-sm font-medium list-disc list-inside text-gray-500">
          {
            ingredient && Array.isArray(ingredient) && ingredient.map((i) => (
              <li>{i}</li>
            ))
          }
          
        </ul>
      </div>

      {/* prescription  */}
      <div>
        <CustomText
          text="Prescription"
          textType="medium"
          weightType="semibold"
          extraStyle="pb-2 pt-4"
        />

        {/* <CustomText text="Dosage" textType="normal" weightType="semibold" /> */}

        <div className="grid grid-cols-3 my-3 gap-2">
          <DrugTab topText="Age Range" bottomText={ageRange} />
          <DrugTab topText="Dosage" bottomText={dosage} />
          <DrugTab topText="Frequency" bottomText={frequency} />
          <DrugTab topText="Duration" bottomText={duration}/>
          <DrugTab topText="When To Take" bottomText={whenTakeDosage} />
          <DrugTab
            topText="Method Of Usage"
            bottomText={methodOfUsage}
          />
        </div>
      </div>
      {/* Satisified  */}
      <div className="flex gap-2 items-center">
        <CustomButton
          text="Satisified"
          type="button"
          weightType="medium"
          defaultBackgroundColor="bg-green-600 hover:bg-green-600/10"
          defaultBorderColor="hover:border hover:border-green-600"
          fullwidth={true}
          showIcon={true}
          PreFixIcon={Ok}
          PreFixIconWeight="stroke-2"
          PreFixIconStyle="group-hover:text-green-600"
          borderRadiusType="threecurved"
          defaultTextColor="text-white group-hover:text-green-600"
        />

        <CustomButton
          text="UnSatisified"
          type="button"
          weightType="medium"
          defaultBackgroundColor="bg-amber-600 hover:bg-amber-600/10"
          defaultBorderColor="hover:border hover:border-amber-600"
          fullwidth={true}
          showIcon={true}
          PreFixIcon={Stop}
          PreFixIconWeight="stroke-2"
          PreFixIconStyle="group-hover:text-amber-600"
          borderRadiusType="threecurved"
          defaultTextColor="text-white group-hover:text-amber-600"
        />
      </div>
    </div>
  );
};

export default PrescriptionCard;
