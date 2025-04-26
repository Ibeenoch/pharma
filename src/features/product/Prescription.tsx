import React, { useEffect, useState } from "react";
import CustomInput from "../../components/common/Input";
import CustomButton from "../../components/common/Button";
import img from "../../assets/images/cc5.png";
import CustomText from "../../components/common/Text";
import Heart from "../../assets/icons/heart.svg?react";
import Cart from "../../assets/icons/cart-fill-white.svg?react";
import DrugTab from "../../components/common/DrugTab";
import PrescriptionCard from "../../components/home/PrescriptionCard";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchAllPrescriptions, selectproductAdmin } from "../admin/product/productSlice";

const Prescription = () => {
  const [searchDrug, setSearchDrug] = useState<string>("");
  const dispatch = useAppDispatch();
  const { prescription, hasFetchAllPrescription } = useAppSelector(selectproductAdmin);


     useEffect(() => {
       if(!prescription){
         dispatch(fetchAllPrescriptions())
       }else{
         hasFetchAllPrescription === false && dispatch(fetchAllPrescriptions())
       }
     }, [prescription])

     console.log(' prescription ', prescription)

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
        {
          prescription && Array.isArray(prescription) && prescription.map((p) => (

            <PrescriptionCard 
            aboutDrug={p.aboutDrug}  
            ageRange={p.ageRange}
            concentration={p.concentration}
            dosage={p.dosage}
            dosageForm={p.dosageForm}
            duration={p.duration}
            frequency={p.frequency}
            ingredient={p.ingredient}
            methodOfUsage={p.methodOfUsage}
            productId={p.productId}
            productImage={p.productImage}
            productName={p.productName}
            productSummary={p.productSummary}
            sastifiedClient={p.sastifiedClient}
            whenTakeDosage={p.whenTakeDosage}
            $id={p.$id}
            />
          ))
        }
       
      </div>
    </main>
  );
};

export default Prescription;
