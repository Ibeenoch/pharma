import React from "react";
import DrugTab from "../common/DrugTab";
import CustomText from "../common/Text";
import CustomButton from "../common/Button";
import Heart from "../../assets/icons/heart.svg?react";
import Cart from "../../assets/icons/cart-fill-white.svg?react";
import Ok from "../../assets/icons/like.svg?react";
import Stop from "../../assets/icons/thumb-down.svg?react";
import img from "../../assets/images/cc5.png";

const PrescriptionCard = () => {
  return (
    <div className="bg-[#fbfcf8] p-2 rounded-lg my-2">
      <div className="flex gap-2 items-center">
        <div className="p-2 rounded-lg bg-white">
          <img
            src={img}
            alt="image prscription"
            className="w-40 h-50 rounded-lg"
          />
        </div>
        <div>
          <CustomText
            text="Panadol Forte"
            textType="medium"
            weightType="semibold"
          />
          <CustomText
            text="Fast-Acting pain Relief for Muscles & Joints"
            textType="small"
            weightType="medium"
            color="text-gray-400"
          />
          <div className="grid grid-cols-2 gap-2 pt-6">
            <DrugTab topText="Concentration" bottomText="120mg/ml" />
            <DrugTab topText="Dosage Form" bottomText="Capsule" />
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
        <CustomText text="261" textType="normal" weightType="semibold" />
      </div>
      {/* action button  */}
      <div className="flex gap-2 items-center">
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

        <CustomButton
          text="Add To Wishlist"
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
      {/* about drug  */}
      <div>
        <CustomText
          text="About Drug"
          textType="medium"
          weightType="semibold"
          extraStyle="pb-6 pt-4"
        />

        <CustomText
          text="Panadol forte is a fast-acting analgesic and anti-inflammatory drug used for the management of musculoskeletal pain and joint discomfort."
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
          <li>Paracetamol</li>
          <li>Diclofenac Sodium</li>
          <li>Menthol</li>
          <li>Camphor</li>
          <li>Methyl Salicylate</li>
          <li>Eucallyptus Oil</li>
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
          <DrugTab topText="Age Range" bottomText="12 years and above" />
          <DrugTab topText="Dosage" bottomText="15ml per dose" />
          <DrugTab topText="Frequency" bottomText="3 times daily" />
          <DrugTab topText="Duration" bottomText="3 - 5 days" />
          <DrugTab topText="When To Take" bottomText="After Meals" />
          <DrugTab
            topText="Method Of Usage"
            bottomText="Shake well before use."
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
