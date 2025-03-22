import CustomText from "../common/Text";
import Plus from "../../assets/icons/plus-slim.svg?react";
import Cancel from "../../assets/icons/cancel-slim.svg?react";
import { useEffect, useState } from "react";
import CustomButton from "../common/Button";

const Faq = () => {
  const [indexClicked, setIndexClicked] = useState<number | null>();

  const handleIndexClicked = (index: number): void => {
    setIndexClicked(index);
  };
  const faqArr = [
    {
      question:
        "Do you sell prescription and over-the-counter (OTC) medications?",
      answer:
        "Yes. We offer a wide range of both prescription and OTC medications. Prescription drugs require a valid doctor's prescription, while OTC products can be purchased directly without one.",
    },
    {
      question:
        "Are your products certified and approved by regulatory bodies?",
      answer:
        "Absolutely. All medications, skincare products, groceries, and supplements we sell are approved by the National Agency for Food and Drug Administration and Control (NAFDAC) and other relevant regulatory authorities to ensure safety and efficacy.",
    },
    {
      question: "How do I place an order?",
      answer:
        "You can place an order through our website or mobile app. Simply browse our categories, add products to your cart, and proceed to checkout. For prescription medications, you will need to upload a valid prescription for verification before purchase.",
    },
    {
      question: "Do you offer home delivery and how long does it take?",
      answer:
        "Yes, we provide reliable home delivery services. Delivery times vary based on your location: Within major cities – Same-day or next-day delivery. Other locations – 2-5 business days.",
    },
    {
      question: "Can I consult a pharmacist before purchasing medications?",
      answer:
        "Yes. Our licensed pharmacists are available for consultation regarding medication use, dosage, potential side effects, and interactions. You can schedule a consultation online or visit our physical store.",
    },
    {
      question: "Do you sell skincare and wellness products?",
      answer:
        "Yes. We offer dermatologist-approved skincare products, nutritional supplements, and personal care items tailored to various skin types and health needs.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept multiple payment options, including debit/credit cards, bank transfers, mobile payments, and cash on delivery (for select locations).",
    },
  ];

  useEffect(() => {}, [indexClicked]);

  const resetIndex = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setIndexClicked(null);
  };
  return (
    <section className="my-6 lg:px-[30%] p-5">
      <CustomText
        text="We're here to answer all your questions."
        textType="extralarge"
        weightType="superbold"
        extraStyle="text-center"
      />
      <CustomText
        text="If you're new to our pharmaceutical store or looking to streamline your healthcare and wellness needs, this section will help you better understand our products and services."
        textType="small"
        weightType="normal"
        color="gray"
        extraStyle="text-center my-3"
      />

      <div className="my-6">
        {faqArr.map((item, index) => (
          <article key={index} onClick={() => handleIndexClicked(index)}>
            <div className="flex p-4 rounded-md justify-between items-center bg-white mb-3 border border-[#f3f3f3]">
              <CustomText
                text={item.question}
                textType="small"
                weightType="bold"
              />
              {index !== null && index === indexClicked ? (
                <Cancel
                  onClick={resetIndex}
                  className="w-4 h-4 bg-transparent cursor-pointer"
                />
              ) : (
                <Plus
                  // onClick={toggleShowAnswer}
                  className="w-4 h-4 bg-transparent cursor-pointer"
                />
              )}
            </div>
            {index === indexClicked && (
              <CustomText
                text={item.answer}
                textType="small"
                weightType="normal"
                extraStyle="pl-6 mt-4 mb-2 bg-transparent text-justify"
              />
            )}
          </article>
        ))}
      </div>

      <CustomText
        text="Got any more questions?"
        color="text-gray-400"
        textType="small"
        extraStyle="text-center"
      />
      <div className="flex justify-center my-2">
        <CustomButton text="Get in touch" showArrow={true} />
      </div>
    </section>
  );
};

export default Faq;
