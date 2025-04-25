import {
  adminDefaultBgColor,
  lightgrayBgColor,
} from "../../../constants/appColor";
import {
  allUsersColumn,
  allUsersData,
  userLists,
  userStatitics,
} from "../../../utils/admin/users";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  selectAdmin,
  setAdminUserTabIndex,
} from "../../../features/admin/adminSlice";
import CustomText from "../../common/Text";
import { FormEvent, useEffect, useState } from "react";
import NavTab from "../NavTab";
import DateFilter from "../DateFilter";
import Table from "../../common/Table";
import {
  fetchAllUserProduct,
  selectproductAdmin,
} from "../../../features/admin/product/productSlice";
import { useParams } from "react-router-dom";
import CustomSelect from "../../common/Select";
import { label } from "framer-motion/client";
import CustomButton from "../../common/Button";
import { validator } from "../../../utils/validator";
import CustomInput from "../../common/Input";
import CustomTextArea from "../../common/TextArea";

interface ProductNamesProps {
  value: string;
  label: string;
}

const PharmacyUser = () => {
  const [productNames, setProductNames] = useState<ProductNamesProps[]>([]);
  const [productImage, setproductImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [productSummary, setProductSummary] = useState<string>("");
  const [concentration, setConcentration] = useState<string>("");
  const [dosageForm, setDosageForm] = useState<string>("");
  const [aboutDrug, setAboutDrug] = useState<string>("");
  const [ingredient, setIngredient] = useState<string>("");
  const [ageRange, setAgeRange] = useState<string>("");
  const [dosage, setDosage] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("");
  const [duration, setduration] = useState<string>("");
  const [whenTakeDosage, setwhenTakeDosage] = useState<string>("");
  const [methodOfUsage, setmethodOfUsage] = useState<string>("");
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
      !concentrationValid ||
      !dosageFormValid ||
      !aboutDrugValid ||
      !ingredientValid ||
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
      // setIsSubmitting(false);
      return;
    }
  };
  const dispatch = useAppDispatch();
  const { productAdmin } = useAppSelector(selectproductAdmin);
  const { userId } = useParams();

  useEffect(() => {
    if (userId && productAdmin.length === 0) {
      dispatch(fetchAllUserProduct(userId));
    }

    if (productAdmin.length > 0) {
      const names = productAdmin.map((p) => ({
        value: p.name,
        label: p.name,
      }));
      setproductImage(productAdmin[0].imagesUrl[0])
      setProductNames(names);
    }
  }, [productAdmin]);
  console.log("productNames ", productImage);
  return (
    <form className={`my-3 pt-15 md:grid grid-cols-[58%_41%] gap-3 `}>
      <div>
        <section className={`${lightgrayBgColor} p-4 rounded-xl mb-3  pb-8`}>
          <CustomText
            text="Prescription information"
            textType="small"
            weightType="semibold"
          />
          <div className="">
            <CustomSelect
              options={productNames}
              value={name}
              onChange={setName}
              label="Product Name"
              showFullWidth={true}
              
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
            validate={() => validator(aboutDrug, 'others')}
            errorMessage={error.aboutDrug || "A Brief Summary Of Product is required"}
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
          <div className="flex items-center gap-3"></div>

          <div className="flex items-center gap-3"></div>
        </section>

        <section className={`${lightgrayBgColor} p-4 rounded-xl mt-3  pb-8`}>
          <CustomText
            text="Prescription"
            textType="small"
            weightType="semibold"
          />
          <div className="flex items-center gap-3 my-3">
            <CustomInput
            label="Dosage"
            onChange={setDosage}
            value={dosage}
            type="text"
            Id="dosage"
            placeholder="write dosage e.g. 50mg/l"
            showFullWidth={true}
            required={true}
            validate={() => validator(dosage, 'others')}
            errorMessage={error.dosage || "Dosage is required"}
            />
            <CustomInput
            label="Frequency"
            onChange={setFrequency}
            value={frequency}
            type="text"
            Id="frequency"
            placeholder="How Frequency e.g. 3 times daily"
            showFullWidth={true}
            required={true}
            validate={() => validator(frequency, 'others')}
            errorMessage={error.frequency || "Frequency is required"}
            />
          </div>

          <div className="flex items-center gap-3 my-3">
            <CustomInput
            label="Duration"
            onChange={setduration}
            value={duration}
            type="text"
            Id="duration"
            placeholder="Duration of intake e.g. 3 - 5 days"
            showFullWidth={true}
            required={true}
            validate={() => validator(duration, 'others')}
            errorMessage={error.duration || "Duration is required"}
            />
            <CustomInput
            label="When To Take"
            onChange={setwhenTakeDosage}
            value={whenTakeDosage}
            type="text"
            Id="whenTakeDosage"
            placeholder="When to take e.g. After Meals"
            showFullWidth={true}
            required={true}
            validate={() => validator(whenTakeDosage, 'others')}
            errorMessage={error.whenTakeDosage || "When to Take Dosage is required"}
            />
          </div>

          <div className="flex items-center gap-3 my-3">
            <CustomInput
            label="Usage Method"
            onChange={setmethodOfUsage}
            value={methodOfUsage}
            type="text"
            Id="usagemethod"
            placeholder="Usage Method e.g. Shake well before use."
            showFullWidth={true}
            required={true}
            validate={() => validator(methodOfUsage, 'others')}
            errorMessage={error.methodOfUsage || "Method Of Usage is required"}
            />
            <CustomInput
            label="Age Range"
            onChange={setAgeRange}
            value={ageRange}
            type="text"
            Id="ageRange"
            placeholder="set Age Range e.g. 12 years and above"
            showFullWidth={true}
            required={true}
            validate={() => validator(ageRange, 'others')}
            errorMessage={error.ageRange || "Age Range is required"}
            />
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
            label="Active Ingredient (Separated Items By comma) "
            onChange={setAboutDrug}
            value={aboutDrug}
            Id="aboutdrug"
            showFullWidth={true}
            roundedBorder={true}
            row={9}
            placeholder="e.g. Paracetamol, Camphor etc"
          />
         
        </section>

          <div className="flex gap-2 items-center overflow-x-auto"></div>
        </section>
      </div>

      <CustomButton
        text={"Submit Prescription"}
        type="submit"
        fullwidth={true}
      />
    </form>
  );
};

export default PharmacyUser;
