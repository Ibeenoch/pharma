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
      setProductNames(names);
    }
  }, [productAdmin]);
  console.log("productNames ", productNames);
  return (
    <form className="my-3 pt-15 md:grid grid-cols-[58%_41%] gap-3">
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
            onChange={setAboutDrug}
            value={aboutDrug}
            Id="aboutdrug"
            showFullWidth={true}
            roundedBorder={true}
            row={3}
            placeholder="e.g. Fast-Acting pain Relief for Muscles & Joints"
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
            placeholder="e.g. Panadol forte is a fast-acting analgesic and anti-inflammatory drug used for the management of musculoskeletal pain and joint discomfort."
          />
          <div className="flex items-center gap-3"></div>

          <div className="flex items-center gap-3"></div>
        </section>

        <section className={`${lightgrayBgColor} p-4 rounded-xl mt-3  pb-8`}>
          <CustomText
            text="Product Expiration and Other Info"
            textType="small"
            weightType="semibold"
          />
          <div className="flex items-center gap-3"></div>

          <div className=""></div>
        </section>
      </div>
      {/* image, categories and brands */}
      <div>
        <section className={`${lightgrayBgColor} p-4 rounded-xl pb-8`}>
          <div className="flex items-center gap-2">
            <CustomText
              text="Upload image"
              textType="small"
              weightType="semibold"
              extraStyle="my-3"
            />
            <CustomText
              text="(Max 5 images)"
              textType="small"
              weightType="medium"
              extraStyle="my-3"
              color="text-amber-500"
            />
          </div>

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
