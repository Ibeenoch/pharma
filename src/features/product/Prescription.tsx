import { FormEvent, lazy, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchAllPrescriptions, selectproductAdmin } from "../admin/product/productSlice";
import { PrescriptionProps } from "../../types/product/ProductData";
import { setNavIndexLink } from "../auth/authSlice";
import { links } from "../../utils/listLink";
const CustomInput = lazy(() => import("../../components/common/Input"));
const CustomButton = lazy(() => import("../../components/common/Button"));
const PrescriptionCard = lazy(() => import("../../components/home/PrescriptionCard"));

const Prescription = () => {
  const [searchDrug, setSearchDrug] = useState<string>("");
  const dispatch = useAppDispatch();
  const { prescription, hasFetchAllPrescription } = useAppSelector(selectproductAdmin);
  const [prescriptionArr, setPrescriptionArr] = useState<PrescriptionProps[]>([]);
  const [pageNum, setPageNum] = useState<number>(0);



     useEffect(() => {
       if(!prescription){
         dispatch(fetchAllPrescriptions(pageNum))
         setPrescriptionArr(prescription);
       }else{
         hasFetchAllPrescription === false && dispatch(fetchAllPrescriptions(pageNum));
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

  useEffect(() => {
      // when the user visit the page move the page to the top
      window.scrollTo(0,0);
      // set the correct navbar active text
      dispatch(setNavIndexLink({ name: links[2].name, index: 2 }));
  },[])
        
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
      <div className={`block md:grid md:grid-cols-1 lg:grid-cols-2 h-full gap-2 my-2 p-4`}>

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
