import { FormEvent, lazy, useEffect, useState } from "react";
import {
  lightgrayBgColor,
} from "../../../constants/appColor";

import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
const CustomText = lazy(() => import("../../common/Text"));
const CustomButton = lazy(() => import("../../common/Button"));
const CustomInput = lazy(() => import("../../common/Input"));
const CustomTextArea = lazy(() => import("../../common/TextArea"));
const SelectedTab = lazy(() => import("../users/SelectedTab"));
// import CustomText from "../../common/Text";
// import CustomInput from "../../common/Input";
// import CustomTextArea from "../../common/TextArea";
// import SelectedTab from "../users/SelectedTab";
import {
  createPrescription,
  fetchAllPrescriptionsWithoutPagination,
  fetchAllProductWithoutPagination,
  selectproductAdmin,
} from "../../../features/admin/product/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import { validator } from "../../../utils/validator";
import { ageRangeArr, dosageArr, dosageFormArr, durationArr, frequencyArr, methodOfUsageArr, whenToTakeArr } from "../../../utils/admin/product/productList";
import {  selectAuth } from "../../../features/auth/authSlice";
import { PrescriptionProps } from "../../../types/product/ProductData";
import { updatePrescription } from "../../../features/admin/product/productSlice";



const ProductPrescription = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { productAdmin, status, prescription, hasFetchAllPrescription } = useAppSelector(selectproductAdmin);
  const { user } = useAppSelector(selectAuth);
  const { productId } = useParams();
  const productPrescription =  prescription.find((p) => p.productId === productId)
  const [productImage, setproductImage] = useState<string>("");
  const [name, setName] = useState<string>( "");
  const [productSummary, setProductSummary] = useState<string>(productPrescription && productPrescription.productSummary || "");
  const [concentration, setConcentration] = useState<string>(productPrescription && productPrescription.concentration || "");
  const [dosageForm, setDosageForm] = useState<string>(productPrescription && productPrescription.dosageForm || "");
  const [dosageFormIndex, setDosageFormIndex] = useState<number>(productPrescription && productPrescription.dosageForm &&  dosageFormArr.indexOf(productPrescription.dosageForm) ||0);
  const [aboutDrug, setAboutDrug] = useState<string>(productPrescription && productPrescription.aboutDrug || "");
  const [ingredient, setIngredient] = useState<string>(productPrescription && productPrescription.ingredient && Array.isArray(productPrescription.ingredient) && productPrescription.ingredient.join(', ') || "");
  const [ageRange, setAgeRange] = useState<string>(productPrescription && productPrescription.ageRange || "");
  const [ageRangeIndex, setAgeRangeIndex] = useState<number>(productPrescription && productPrescription.ageRange && ageRangeArr.indexOf(productPrescription.ageRange) || 0);
  const [dosage, setDosage] = useState<string>(productPrescription && productPrescription.dosage || "");
  const [dosageIndex, setDosageIndex] = useState<number>(productPrescription && productPrescription.dosage && dosageArr.indexOf(productPrescription.dosage) ||  0);
  const [frequency, setFrequency] = useState<string>(productPrescription && productPrescription.frequency || "");
  const [frequencyIndex, setFrequencyIndex] = useState<number>(productPrescription && productPrescription.frequency && frequencyArr.indexOf(productPrescription.frequency) || 0);
  const [duration, setduration] = useState<string>(productPrescription && productPrescription.duration || "");
  const [durationIndex, setdurationIndex] = useState<number>(productPrescription && productPrescription.duration && durationArr.indexOf(productPrescription.duration) || 0);
  const [whenTakeDosage, setwhenTakeDosage] = useState<string>(productPrescription && productPrescription.whenTakeDosage || "");
  const [whenTakeDosageIndex, setwhenTakeDosageIndex] = useState<number>(productPrescription && productPrescription.whenTakeDosage && whenToTakeArr.indexOf(productPrescription.whenTakeDosage) || 0);
  const [methodOfUsage, setmethodOfUsage] = useState<string>(productPrescription && productPrescription.methodOfUsage || "");
  const [methodOfUsageIndex, setmethodOfUsageIndex] = useState<number>(productPrescription && productPrescription.methodOfUsage && methodOfUsageArr.indexOf(productPrescription.methodOfUsage) || 0);
  const [error, setError] = useState<{
    productSummary?: string;
    concentration?: string;
    dosageForm?: string;
    aboutDrug?: string;
    ingredient?: string;
    ageRange?: string;
    dosage?: string;
    frequency?: string;
    duration?: string;
    whenTakeDosage?: string;
    methodOfUsage?: string;
  }>({});

  const submitPrescription = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const productSummaryValid = validator(productSummary, "others");
    const concentrationValid = validator(concentration, "others");
    const dosageFormValid = validator(dosageForm, "others");
    const aboutDrugValid = validator(aboutDrug, "others");
    const ingredientValid = validator(ingredient, "others");
    const ageRangeValid = validator(ageRange, "others");
    const dosageValid = validator(dosage, "others");
    const frequencyValid = validator(frequency, "others");
    const durationValid = validator(duration, "others");
    const whenTakeDosageValid = validator(whenTakeDosage, "others");
    const methodOfUsageValid = validator(methodOfUsage, "others");

    if (
      !productSummaryValid ||
      !dosageFormValid ||
      !aboutDrugValid ||
      !ingredientValid ||
      !concentrationValid ||
      !ageRangeValid ||
      !dosageValid ||
      !frequencyValid ||
      !durationValid ||
      !whenTakeDosageValid ||
      !methodOfUsageValid
    ) {
  
      setError({
        productSummary: productSummaryValid
          ? undefined
          : "Product Summary is required",
        dosageForm: dosageFormValid ? undefined : "Dosage Form is required",
        dosage: dosageValid ? undefined : "Dosage is required",
        aboutDrug: aboutDrugValid ? undefined : "About Drug is required",
        ingredient: ingredientValid ? undefined : "Ingredient is required",
        ageRange: ageRangeValid ? undefined : "Age Range is required",
        frequency: frequencyValid ? undefined : "Frequency is required",
        duration: durationValid ? undefined : "Duration is required",
        whenTakeDosage: whenTakeDosageValid
          ? undefined
          : "When To Take Dosage is required",
        methodOfUsage: methodOfUsageValid
          ? undefined
          : "Method Of Usage is required",
        concentration: concentrationValid
          ? undefined
          : "Concentration is required",
     
      });
      return;

    }
    
    if(productId){
        if(productPrescription && productPrescription.$id){
          
          let arrIngredient = ingredient.split(',');
          const prescriptionData: PrescriptionProps = { $id: productPrescription.$id, productName: name, productImage, aboutDrug, productSummary, ageRange, dosage, dosageForm, duration, frequency, ingredient: arrIngredient, methodOfUsage, productId, whenTakeDosage,  concentration };
    
          dispatch(updatePrescription(prescriptionData)).then(() => {
            navigate(`/admin/product/all/${user && user.userId}`);
          })

        }else{
          
                let arrIngredient = ingredient.split(',');
                const prescriptionData: PrescriptionProps = { productName: name, productImage, aboutDrug, productSummary, ageRange, dosage, dosageForm, duration, frequency, ingredient: arrIngredient, methodOfUsage, productId, whenTakeDosage,  concentration };
          
                dispatch(createPrescription(prescriptionData)).then(() => {
                  navigate(`/admin/product/all/${user && user.userId}`);
                })

        }
    }

  };


  useEffect(() => {
    if(!prescription){
      dispatch(fetchAllPrescriptionsWithoutPagination())
    }else{
      hasFetchAllPrescription === false && dispatch(fetchAllPrescriptionsWithoutPagination())
    }
  }, [prescription])

  useEffect(() => {
    if (productId && productAdmin.length === 0) {
       dispatch(fetchAllProductWithoutPagination());
    }

    if (productAdmin.length > 0) {
      const names = productAdmin.find((p) => p.$id === productId);
      names && names.name && setName(names.name)
      names && names.imagesUrl && names.imagesUrl[0] && setproductImage(names.imagesUrl[0]);
    }
  }, [productAdmin]);

 
  const handleFreqSelected = (index: number, word: string) => {
    setFrequency(word);
    setFrequencyIndex(index)

  }

  
  const handleWhenTakenSelected = (index: number, word: string) => {
    setwhenTakeDosage(word);
    setwhenTakeDosageIndex(index)

  }

  const handleMethodOfUsage = (index: number, word: string) => {
    setmethodOfUsage(word);
    setmethodOfUsageIndex(index)
  }

  const handledosageForm = (index: number, word: string) => {
    setDosageForm(word);
    setDosageFormIndex(index)
  }

  const handleAgeRange = (index: number, word: string) => {
    setAgeRange(word);
    setAgeRangeIndex(index)
  }

  const handleduration = (index: number, word: string) => {
    setduration(word);
    setdurationIndex(index)
  }

 
  const handledosage = (index: number, word: string) => {
    setDosage(word);
    setDosageIndex(index)
  }

  return (
    <form onSubmit={submitPrescription} className={`my-3 pt-15 md:grid grid-cols-[58%_41%] gap-3 `}>
      <div>
        <section className={`${lightgrayBgColor} p-4 rounded-xl mb-3  pb-8`}>
          <CustomText
            text="Product information"
            textType="small"
            weightType="semibold"
          />
          <div className="">
            <CustomInput
              value={name}
              onChange={setName}
              label="Product Name"
              showFullWidth={true}
              type="text"
              disabled={true}
            />
          </div>
          {/* 140  */}
          <CustomTextArea
            label="Brief Summary Of Product"
            onChange={setProductSummary}
            value={productSummary}
            Id="productSummary"
            showFullWidth={true}
            roundedBorder={true}
            row={3}
            maxLength={150}
            placeholder="e.g. Fast-Acting pain Relief for Muscles & Joints"
            required={true}
            validate={() => validator(productSummary, 'others')}
            errorMessage={error.productSummary || "A Brief Summary Of Product is required"}
          />
        </section>
        <section className={`${lightgrayBgColor} p-4 rounded-xl mt-3  pb-8`}>
          <CustomTextArea
            label="About Product"
            onChange={setAboutDrug}
            value={aboutDrug}
            Id="aboutdrug"
            showFullWidth={true}
            roundedBorder={true}
            row={4}
            maxLength={150}
            placeholder="e.g. Panadol forte is a fast-acting analgesic and anti-inflammatory drug used for the management of musculoskeletal pain and joint discomfort."
            required={true}
            validate={() => validator(aboutDrug, 'others')}
            errorMessage={error.aboutDrug || "A Brief description Of Product is required"}
          />
         
        </section>

        <section className={`${lightgrayBgColor} p-4 rounded-xl mt-3  pb-8`}>
          <CustomText
            text="Prescription"
            textType="small"
            weightType="semibold"
          />
          <div className="flex items-center gap-3 my-3">
            <CustomInput
            label="Concentraion"
            onChange={setConcentration}
            value={concentration}
            type="text"
            Id="concentration"
            placeholder="drug concentration e.g. 50mg/l"
            showFullWidth={true}
            required={true}
            validate={() => validator(concentration, 'others')}
            errorMessage={error.concentration || "Concentration is required"}
            />
          </div>

          <div className="block sm:flex items-center gap-3 my-3">
          <SelectedTab  errorMessage={error.dosageForm}  label="Drug Form"  handleWordSelected={handledosageForm} stringArr={dosageFormArr} thisIndex={dosageFormIndex} thisState={dosageForm} />

            <SelectedTab errorMessage={error.whenTakeDosage} label="When To Take"  handleWordSelected={handleWhenTakenSelected} stringArr={whenToTakeArr} thisIndex={whenTakeDosageIndex} thisState={whenTakeDosage} />
          </div>

          <div className="block sm:flex items-center gap-3 my-3">
            <SelectedTab errorMessage={error.methodOfUsage} label="Method Of Usage"  handleWordSelected={handleMethodOfUsage} stringArr={methodOfUsageArr} thisIndex={methodOfUsageIndex} thisState={methodOfUsage} />
            <SelectedTab errorMessage={error.frequency} label="Frequency" postlabel="(morning-afternoon-night)" handleWordSelected={handleFreqSelected} stringArr={frequencyArr} thisIndex={frequencyIndex} thisState={frequency} />

          </div>

          <div className="block sm:flex items-center gap-3 my-3">
            <SelectedTab errorMessage={error.ageRange} label="Age Range" postlabel="(select an age range)" handleWordSelected={handleAgeRange} stringArr={ageRangeArr} thisIndex={ageRangeIndex} thisState={ageRange} />
            <SelectedTab errorMessage={error.duration} label="Duration" postlabel="(length of usage)" handleWordSelected={handleduration} stringArr={durationArr} thisIndex={durationIndex} thisState={duration} />
          </div>

          <div className="block sm:flex items-center gap-3 my-3">
            <SelectedTab errorMessage={error.dosage} label="Dosage" postlabel="(select an dosage)" handleWordSelected={handledosage} stringArr={dosageArr} thisIndex={dosageIndex} thisState={dosage} />
          </div>

        

        </section>
      </div>
      {/* image, categories and brands */}
      <div>
        <section className={` p-4 rounded-xl pb-8`}>
          <div className={`flex items-center ${lightgrayBgColor} rounded-xl gap-2`}>
           <img src={productImage && productImage} alt="" />
          </div>

          <section className={`${lightgrayBgColor} p-4 rounded-xl mt-3  pb-8`}>
          <CustomTextArea
            label="Active Ingredient"
            onChange={setIngredient}
            postLabel="(Separated items by comma)"
            value={ingredient}
            Id="ingredient"
            showFullWidth={true}
            roundedBorder={true}
            row={9}
            placeholder="e.g. Paracetamol, Camphor etc"
            required={true}
            validate={() => validator(ingredient, 'others')}
            errorMessage={error.ingredient || "Ingredient is required"}
          />
         
        </section>

        </section>
      </div>

      <CustomButton
        text={"Submit Prescription"}
        type="submit"
        fullwidth={true}
        isLoading={status === 'loading'}
      />
    </form>
  );
};

export default ProductPrescription;
