import React, { useEffect } from "react";
import DrugTab from "../common/DrugTab";
import CustomText from "../common/Text";
import CustomButton from "../common/Button";
import Heart from "../../assets/icons/heart.svg?react";
import Cart from "../../assets/icons/cart-fill-white.svg?react";
import Ok from "../../assets/icons/like.svg?react";
import Stop from "../../assets/icons/thumb-down.svg?react";
import { CartProductDataProps, cartProps, PrescriptionProps, WishListProps } from "../../types/product/ProductData";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {  fetchAllProductWithoutPagination, selectproductAdmin, updatePrescription } from "../../features/admin/product/productSlice";
import { addToCart, addTowishlist, selectCart } from "../../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { selectAuth } from "../../features/auth/authSlice";


const PrescriptionCard: React.FC<PrescriptionProps> = ({ aboutDrug,ageRange, concentration, dosage, dosageForm, duration, frequency, ingredient,methodOfUsage, productId,  productImage, productName ,productSummary, whenTakeDosage, sastifiedClient, $id }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const { allProduct } = useAppSelector(selectproductAdmin);
    const { user } = useAppSelector(selectAuth);
    const { cart, wishlist } = useAppSelector(selectCart);

    useEffect(() => {
     dispatch(fetchAllProductWithoutPagination())
    }, [])
    
    const handleAddToCart = (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      const productItem = allProduct.find((item) => {
       return item.$id === id;
      })!;
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
      const productItem = allProduct.find((item) => item.$id === id)!;
      const wishList: WishListProps = { item: productItem };
      dispatch(addTowishlist(wishList));
    };

 

    const handleSatisfiedClient = (userId: string) => {
      if(!userId){
        navigate('/login');
        return
      }

      if(sastifiedClient){
        let updatedClientNum: string[] = [...sastifiedClient , userId];
        const prescriptionData: PrescriptionProps = { $id, productName, productImage, aboutDrug, productSummary, ageRange, dosage, dosageForm, duration, frequency, ingredient, methodOfUsage, productId, whenTakeDosage,  concentration, sastifiedClient: updatedClientNum };
  
        dispatch(updatePrescription(prescriptionData));
      }
  
    }

  return (
    <div className="bg-[#fbfcf8] p-4 rounded-lg my-4">
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
        <CustomText text={ String(sastifiedClient?.length ?? 0)} textType="normal" weightType="semibold" />
      </div>
      {/* action button  */}
      <div className="flex gap-2 items-center justify-between">
      { 
      cart && Array.isArray(cart) && cart.find((p) => p.item.$id === productId)?.item.$id === productId ? (
        <></>
      ) : (  
      <div onClick={(e) => handleAddToCart(e, productId)}
      className="w-full"
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
      )}

      {
              wishlist && Array.isArray(wishlist) && wishlist.find((p) => p.$id === productId)?.$id === productId ? (
                <></>
              ) : (

                <div 
                onClick={(e) => handleAddToWishList(e, productId)}
                className="w-full"
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
                    PreFixIconStyle=" fill-white group-hover:fill-amber-600"
                    borderRadiusType="threecurved"
                    defaultTextColor="text-white group-hover:text-amber-600"
                  />
                </div>
              )
      }
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
      {
      user && user.userId && sastifiedClient && Array.isArray(sastifiedClient) && sastifiedClient.includes(user && user.userId) ? (
        <></>
      ) : (

      <div className="flex gap-2 items-center">
        <CustomButton
         onClick={() => {
          if(!user || !user.userId){
            navigate('/login');
            return;
          }
          handleSatisfiedClient(user.userId)
         }}
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
      )
      }
    </div>
  );
};

export default PrescriptionCard;
