import CustomText from "../common/Text";
import heroImage from "../../assets/images/person3.png";
import CustomButton from "../common/Button";
import MedCross from '../../assets/icons/medical-cross.svg?react'

const HeroSection = () => {
  const handleGetStarted = () => {};
  return (
    <section className="sm:grid sm:grid-cols-2 sm:mt-28 mt-28 border-b-2 border-black">
      <article className="px-4">
        <div className="flex gap-2 items-center my-8">
          <div className="bg-black rounded-sm w-8 h-8 flex items-center justify-center">
            <MedCross className="w-3 h-3 fill-white"  />
          </div>
          <div className="flex flex-col gap-1">
            <CustomText
              text="Trusted Online Pharmacy"
              textType="small"
              weightType="bold"
            />
            <CustomText
              text="Rated Best 12.5k Reviews"
              textType="extrasmall"
              weightType="normal"
              color="gray"
            />
          </div>
        </div>

        <div className="my-6">
          <CustomText
            text="Your One Stop Pharmacy for Medicines & Daily Essentials"
            textType="superhuge"
            weightType="medium"
          />
        </div>

        <div className="mb-6">
          <CustomText
            extraStyle="text-justify"
            text="Shop for presciption medications, health supplements, and everyday groceries - all in one place. Convenient, affordable, and delivered to your doorstep."
          />
        </div>

        <div className="my-6">
          <CustomButton
            text="Shop Now"
            showArrow={true}
            onClick={handleGetStarted}
            type="button"
            textSize="small"
            weightType="thin"
          />
        </div>

        <div className="flex justify-around mt-8 mb-8">
          <div className="flex flex-col ">
            <CustomText text="1000+" textType="large" weightType="medium" />
            <CustomText
              text="Health & Wellness Products"
              textType="extrasmall"
              weightType="thin"
              color="gray"
            />
          </div>

          <div className="border-2 border-gray-200 w-[0.3px]"></div>

          <div className="flex flex-col">
            <CustomText text="156+" textType="large" weightType="medium" />
            <CustomText
              text="Pharmacy & Grocery Brands"
              textType="extrasmall"
              weightType="thin"
              color="gray"
            />
          </div>
        </div>
      </article>

      <article className="my-8">
        <div className="relative lg:absolute lg:top-32 h-34 h-auto w-auto z-0">
          <img src={heroImage} alt="pharmacitical Hero Image" className="h-auto z-0" />
        </div>

        <div className="p-8 bg-white w-max my-auto mx-auto lg:absolute top-[40%] right-[3%]">
          <div className="">
            <CustomText
              text="- New Arrivals"
              textType="extrasmall"
              color="gray"
              weightType="medium"
            />
          </div>

          <div className="py-2">
            <CustomText
              text="Best Deals on Healthcare & Groceries"
              textType="small"
              color="black"
              weightType="bold"
            />
          </div>

          <div className="py-2 ">
            <CustomText
              text="Exclusive discounts on prescription medicines,"
              textType="extrasmall"
              color="gray"
              weightType="thin"
            />
            <CustomText
              text="vitamins, and daily essentials."
              textType="extrasmall"
              color="gray"
              weightType="thin"
            />
          </div>

          <div className="py-2">
            <CustomText
              text="Learn More."
              textType="small"
              weightType="bold"
              extraStyle="cursor-pointer border-b border-black w-max"
            />
          </div>
        </div>

        
      </article>
    </section>
  );
};

export default HeroSection;
