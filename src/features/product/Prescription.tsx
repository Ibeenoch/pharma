import React, { useState } from "react";
import CustomInput from "../../components/common/Input";
import CustomButton from "../../components/common/Button";
import img from "../../assets/images/cc5.png";
import CustomText from "../../components/common/Text";
import Heart from "../../assets/icons/heart.svg?react";
import Cart from "../../assets/icons/cart-fill-white.svg?react";
import DrugTab from "../../components/common/DrugTab";

const Prescription = () => {
  const [searchDrug, setSearchDrug] = useState<string>("");
  return (
    <main className=" mt-20 mb-1">
      <form className="md:px-[25%]">
        <div className="p-2 bg-[#fbfcf8]">
          <CustomInput
            value={searchDrug}
            showFullWidth={true}
            type="search"
            onChange={setSearchDrug}
            placeholder="Search a drug name"
          />
          <CustomButton
            type="button"
            fullwidth={true}
            showArrow={true}
            text="Search Prescription"
            className="my-2"
          />
        </div>
      </form>
      <div className={`block md:grid md:grid-cols-3 h-full gap-2 my-2`}>
        {/* // presciption card */}
        <div className="bg-[#fbfcf8] p-2 rounded-lg">
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
              extraStyle="pb-6 pt-4"
            />

            <div className="grid grid-cols-3">
              <DrugTab topText="1tab" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Prescription;
