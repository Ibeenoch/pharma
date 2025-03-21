import cards from "../../assets/images/cards.png";
import CustomButton from "../common/Button";
import CustomText from "../common/Text";

const DiscountBanner = () => {
  return (
    <div
      className={`w-full h-[350px] my-8 bg-amber-500  sm:grid sm:grid-cols-2 items-center bg-opacity-50 p-8 `}
    >
      <div>
        <h2 className="text-[20px] sm:text-[30px] md:text-[38px] lg:text-[48px] font-bold">
          Get 5% Discount From Our Top Brands
        </h2>
        <CustomText
          text="Enjoy amazing discount benefit from our top brand"
          textType="normal"
          weightType="medium"
          extraStyle="mb-4"
        />
        <CustomButton text="Shop Now" textSize="large" showArrow={true} />
      </div>
      <div className="pb-4">
        <img src={cards} alt="discount card image" className="object-fit" />
      </div>
    </div>
  );
};

export default DiscountBanner;
