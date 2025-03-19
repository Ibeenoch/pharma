import CustomText from "../common/Text";
import heroImage from "../../assets/images/person3.png";
import CustomButton from "../common/Button";

const HeroSection = () => {
  const handleGetStarted = () => {};
  return (
    <section className="grid grid-cols-2">
      <article>
        <div className="flex gap-2 items-center my-8">
          <div className="bg-black rounded-sm w-8 h-8"></div>
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
        <div className="absolute top-20 h-34 w-auto">
          <img src={heroImage} alt="pharmacitical Hero Image" />
        </div>

        <div className="p-8 bg-white w-max absolute top-[50%] right-[5%]">
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
