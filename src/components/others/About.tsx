import CustomText from "../common/Text";
import { COMPANY_NAME } from "../../constants/appText";
import aboutImg1 from "../../assets/images/about1.png";
import aboutImg2 from "../../assets/images/about2.png";
import aboutImg4 from "../../assets/images/about4.png";
import WareHouse from "../../assets/icons/warehouse2.svg?react";
import Employee from "../../assets/icons/scientist-dark-skin-tone.svg?react";
import Customers from "../../assets/icons/client.svg?react";
import UseRevealer from "../common/animations/UseRevealer";
import NumberCount from "../home/NumberCount";
import { useEffect } from "react";
import { links } from "../../utils/listLink";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setNavIndexLink } from "../../features/auth/authSlice";

const About = () => {
  const dispatch = useAppDispatch();
    useEffect(() => {
        // when the user visit the page move the page to the top
        window.scrollTo(0,0);
        // set the correct navbar active text
        dispatch(setNavIndexLink({ name: links[3].name, index: 3 }));
      },[])
  const aboutListIcons = [
    { Icon: WareHouse, text: "12+ Warehouses" },
    { Icon: Employee, text: "7+ Pharmacist" },
    { Icon: Customers, text: "2000+ Happy Customers" },
  ];
  return (
    <section className="w-full mt-20 p-4 md:p-0">
      <UseRevealer>
        <div className="flex items-center gap-6 my-3">
          <div className="md:px-10">
            <CustomText
              text="About Us"
              textType="large"
              weightType="semibold"
            />
            <CustomText
              text={`At ${COMPANY_NAME}, we are dedicated to making healthcare accessible and convenient. Our online platform connects you with high-quality medicines, wellness products, and trusted pharmaceutical solutions—all delivered to your doorstep with ease.`}
              textType="normal"
              weightType="normal"
              extraStyle=""
            />
          </div>

          <img
            className="md:w-[30%] w-[50%] h-auto"
            src={aboutImg1}
            alt={`about ${COMPANY_NAME} image 1`}
          />
        </div>
      </UseRevealer>
      {/* mission  */}
      <UseRevealer isLeft={false}>
        <div className="flex items-center gap-6 my-3">
          <img
            className="md:w-[30%] w-[50%] h-auto"
            src={aboutImg2}
            alt={`about ${COMPANY_NAME} image 2`}
          />
          <div className="md:px-10">
            <CustomText
              text="Our Mission: Delivering Better Health, Anytime, Anywhere"
              textType="large"
              weightType="semibold"
            />
            <CustomText
              text={`We believe that healthcare should be simple, safe, and reliable. Our goal is to provide a seamless online shopping experience, ensuring that you get the medications and wellness products you need, when you need them.`}
              textType="normal"
              weightType="normal"
              extraStyle=""
            />
          </div>
        </div>
      </UseRevealer>
      {/* story  */}
      <UseRevealer>
        <div className="flex items-center gap-6 my-3">
          <div className="md:px-10">
            <CustomText
              text="Our Story"
              textType="large"
              weightType="semibold"
            />
            <CustomText
              text={`Founded in 2020, ${COMPANY_NAME} was created to revolutionize the way people access healthcare. Recognizing the need for a faster and more efficient way to purchase medicines, we built a trusted eCommerce platform where customers can easily find and order prescription and over-the-counter medications.

  With a commitment to safety, affordability, and convenience, we partner with top pharmaceutical brands and licensed healthcare professionals to bring you the best products. Whether you need daily prescriptions, supplements, or wellness essentials, we’re here to support your health journey.`}
              textType="normal"
              weightType="normal"
              extraStyle=""
            />
          </div>

          <img
            className="md:w-[30%] w-[50%] h-auto"
            src={aboutImg4}
            alt={`about ${COMPANY_NAME} image 3`}
          />
        </div>
      </UseRevealer>
      {/* icons  */}

      <UseRevealer isLeft={true}>
        <CustomText
          text={`${COMPANY_NAME} Achievement`}
          textType="large"
          weightType="semibold"
          extraStyle="my-3 text-center"
        />
        <div className="grid grid-cols-3 gap-2 md:gap-4 my-4">
          {aboutListIcons.map((Item) => (
            <div className="bg-white rounded-xl p-6 flex flex-col justify-center items-center">
              <Item.Icon className="w-10 h-10 md:w-20 md:h-20" />
              <NumberCount
                end={parseInt(Item.text.split("+")[0])}
                postfixText={`+${Item.text.split("+")[1]}`}
              />
            </div>
          ))}
        </div>
      </UseRevealer>
    </section>
  );
};

export default About;
