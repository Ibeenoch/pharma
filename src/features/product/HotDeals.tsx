import hd1 from "../../assets/images/reco1.png";
import hd2 from "../../assets/images/reco2.png";
import hd3 from "../../assets/images/hd3_amoxicillin.png";
import hd4 from "../../assets/images/hd4_metformin.png";
import hd5 from "../../assets/images/hd2_Omeprazole-20mg.png";
import hd6 from "../../assets/images/hd6_cough_syrup.png";
import hd7 from "../../assets/images/hd7_vitaminC.png";
import TwoTextSpan from "../../components/home/TwoTextSpan";
import CustomText from "../../components/common/Text";

const HotDeals = () => {
  const hotSellingPharmaceuticalProductsImage = [
    hd1,
    hd2,
    hd3,
    hd4,
    hd5,
    hd6,
    hd7,
  ];
  const hotSellingPharmaceuticalProducts = [
    { name: "Paracetamol", price: 500, oldprice: 850 },
    { name: "Ibuprofen", price: 1200, oldprice: 1500 },
    { name: "Amoxicillin", price: 1500, oldprice: 2000 },
    { name: "Metformin", price: 2200, oldprice: 2700 },
    { name: "Cough Syrup", price: 1300, oldprice: 1750 },
    { name: "Vitamin C", price: 1500, oldprice: 1850 },
    { name: "Omeprazole", price: 2100, oldprice: 2400 },
  ];

  return (
    <section className="border-b border-black mb-2 pb-4 animate-on-scroll">
      <TwoTextSpan leftText="Hot Deals" />

      <article className="flex items-center lg:grid lg:grid-cols-7 gap-4 overflow-x-auto">
        {hotSellingPharmaceuticalProductsImage.map((item, index) => (
          <div className="cursor-pointer" key={index}>
            <div className="h-22 w-20 md:h-30 md:w-28 lg:h-38 lg:w-32 xl:h-48 xl:w-42 flex items-center justify-center rounded-xl p-2 bg-white mb-4">
              <img
                src={item}
                alt="medication categories"
                className="w-46 h-auto object-fill"
              />
            </div>
            <article>
              {hotSellingPharmaceuticalProducts[index] && (
                <CustomText
                  text={hotSellingPharmaceuticalProducts[index].name}
                  textType="small"
                  weightType="bold"
                  extraStyle="text-ellipsis"
                />
              )}
              <div className="flex gap-3 items-center">
                {hotSellingPharmaceuticalProducts[index] && (
                  <CustomText
                    text={`₦${String(hotSellingPharmaceuticalProducts[index].price)}`}
                    textType="extrasmall"
                    weightType="bold"
                    color="text-amber-500"
                  />
                )}
                {hotSellingPharmaceuticalProducts[index] && (
                  <CustomText
                    text={`₦${String(hotSellingPharmaceuticalProducts[index].oldprice)}`}
                    textType="extrasmall"
                    weightType="bold"
                    color="gray"
                    extraStyle="line-through"
                  />
                )}
              </div>
            </article>
          </div>
        ))}
      </article>
    </section>
  );
};

export default HotDeals;
