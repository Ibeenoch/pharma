import CustomText from "../../components/common/Text";
import reco1 from "../../assets/images/reco1.png";
import reco2 from "../../assets/images/reco2.png";
import reco3 from "../../assets/images/reco3.png";
import reco4 from "../../assets/images/reco4.png";
import reco5 from "../../assets/images/reco5.png";
import reco6 from "../../assets/images/reco6.png";
import reco7 from "../../assets/images/reco7.png";
import TwoTextSpan from "../../components/home/TwoTextSpan";

const Recommendation = () => {
  const productImages = [
    reco1,
    reco2,
    reco3,
    reco4,
    reco5,
    reco6,
    reco7,
    // reco8,
    // reco9,
    // reco10,
    // reco11,
    // reco12,
    // reco13,
  ];
  const medications = [
    { name: "Paracetamol", price: 2500, oldprice: 2900 },
    { name: "Ibuprofen", price: 3750, oldprice: 4250 },
    { name: "Amoxicillin", price: 7200, oldprice: 8000 },
    { name: "Diclofenac", price: 5000, oldprice: 65000 },
    { name: "Cough Syrup", price: 4300, oldprice: 5000 },
    { name: "Metformin", price: 6800, oldprice: 7200 },
    { name: "Oral Contraceptives", price: 8500, oldprice: 9000 },
    // { name: "Vitamin C", price: 3.0 },
    // { name: "Blood Pressure Monitor", price: 25.0 },
    // { name: "Sunscreen SPF 50", price: 12.0 },
    // { name: "Antacid Tablets", price: 4.0 },
    // { name: "Folic Acid", price: 2.9 },
  ];

  return (
    <section className="border-b border-black mb-2 pb-4 animate-on-scroll">
      <TwoTextSpan leftText="Recommendations" />

      <article className="flex gap-4 overflow-x-auto">
        {/* bg-[#e6e1d8] bg-[#b87a4c] */}
        {productImages.map((item, index) => (
          <div className="cursor-pointer" key={index}>
            <div className="h-22 w-20 md:h-30 md:w-28 lg:h-38 lg:w-32 xl:h-48 xl:w-42 flex items-center justify-center rounded-xl p-2 bg-white mb-4">
              <img
                src={item}
                alt="medication categories"
                className="w-46 h-auto object-fill"
              />
            </div>
            <article>
              {medications[index] && (
                <CustomText
                  text={medications[index].name}
                  textType="small"
                  weightType="bold"
                  extraStyle="text-ellipsis"
                />
              )}
              <div className="flex gap-3 items-center">
                {medications[index] && (
                  <CustomText
                    text={`₦${String(medications[index].price)}`}
                    textType="extrasmall"
                    weightType="bold"
                    color="text-amber-500"
                  />
                )}
                {medications[index] && (
                  <CustomText
                    text={`₦${String(medications[index].oldprice)}`}
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

export default Recommendation;
