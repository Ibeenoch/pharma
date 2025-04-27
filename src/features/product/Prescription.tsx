import { FormEvent, useEffect, useState } from "react";
import CustomInput from "../../components/common/Input";
import CustomButton from "../../components/common/Button";
import PrescriptionCard from "../../components/home/PrescriptionCard";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchAllPrescriptions, selectproductAdmin } from "../admin/product/productSlice";
import { PrescriptionProps } from "../../types/product/ProductData";

const Prescription = () => {
  const [searchDrug, setSearchDrug] = useState<string>("");
  const dispatch = useAppDispatch();
  const { prescription, hasFetchAllPrescription } = useAppSelector(selectproductAdmin);
  const [prescriptionArr, setPrescriptionArr] = useState<PrescriptionProps[]>([])


     useEffect(() => {
       if(!prescription){
         dispatch(fetchAllPrescriptions())
         setPrescriptionArr(prescription);
       }else{
         hasFetchAllPrescription === false && dispatch(fetchAllPrescriptions());
         setPrescriptionArr(prescription);
       }
     }, [prescription]);

     useEffect(() => {
      runSearch()
     }, [searchDrug])

     const runSearch = () => {
      if(searchDrug.length > 0){
        let filteredPrescription = prescriptionArr.filter((p) => {
          return p.productName.toLowerCase().includes(searchDrug.toLowerCase());
         });
         setPrescriptionArr(filteredPrescription);
       }else{
         setPrescriptionArr(prescription);
       }
     }

     const handleFilterPrescription = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        runSearch();
     }
  return (
    <main className=" mt-20 mb-1">
      <form  onSubmit={handleFilterPrescription} className="md:px-[25%]">
        <div className="p-2 bg-[#fbfcf8]">
          <CustomInput
            value={searchDrug}
            showFullWidth={true}
            type="search"
            onChange={setSearchDrug}
            placeholder="Search a drug name"
          />
          <CustomButton
            type="submit"
            fullwidth={true}
            showArrow={true}
            text="Search Prescription"
            className="my-2"
          />
        </div>
      </form>
      <div className={`block md:grid md:grid-cols-3 h-full gap-2 my-2 p-2`}>

        {
          prescriptionArr && Array.isArray(prescriptionArr) && prescriptionArr.map((p) => (

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
