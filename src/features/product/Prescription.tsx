import React, { useState } from "react";
import CustomInput from "../../components/common/Input";
import CustomButton from "../../components/common/Button";
import img from "../../assets/images/cc5.png";
import CustomText from "../../components/common/Text";
import Heart from "../../assets/icons/heart.svg?react";
import Cart from "../../assets/icons/cart-fill-white.svg?react";
import DrugTab from "../../components/common/DrugTab";
import PrescriptionCard from "../../components/home/PrescriptionCard";

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
      <div className={`block md:grid md:grid-cols-3 h-full gap-2 my-2 p-2`}>
        {/* // presciption card */}
        <PrescriptionCard />
        <PrescriptionCard />
        <PrescriptionCard />
        <PrescriptionCard />
      </div>
    </main>
  );
};

export default Prescription;
