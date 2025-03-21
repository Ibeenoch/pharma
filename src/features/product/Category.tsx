import CustomText from "../../components/common/Text";
import painKiller1 from "../../assets/images/pr1.png";
import fever1 from "../../assets/images/anti11.png";
import antibiotics1 from "../../assets/images/anti13.png";
import coughCold1 from "../../assets/images/cc3.png";
import chronic1 from "../../assets/images/cc5.png";
import vitMin1 from "../../assets/images/anti18.png";
import famplan1 from "../../assets/images/pr7.png";
import TwoTextSpan from "../../components/home/TwoTextSpan";

const Category = () => {
  const productImages = [
    painKiller1,
    fever1,
    antibiotics1,
    coughCold1,
    chronic1,
    vitMin1,
    famplan1,
  ];
  const categories = [
    "Pain Killers",
    "Fever & Malarial",
    "Antibiotics",
    "Anti-inflammatory",
    "Cough & Cold",
    "Chronic Diseases",
    "Family Planning",
    "Vitamins & Supplements",
    "Medical Accessories",
    "Beauty & Grooming",
    "Other Ailments",
    "Reproductive Health",
  ];
  return (
    <section className="border-b border-black mb-2 pb-4">
      <TwoTextSpan leftText="Categories" />

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
              <CustomText
                text={categories[index]}
                textType="small"
                weightType="bold"
              />
              {/* <div className="flex gap-3 items-center">
                <CustomText
                  text="₦1500"
                  textType="small"
                  weightType="bold"
                  color="text-amber-500"
                />
                <CustomText
                  text="₦2000"
                  textType="small"
                  weightType="bold"
                  color="gray"
                  extraStyle="line-through"
                />
              </div> */}
            </article>
          </div>
        ))}
      </article>
    </section>
  );
};

export default Category;
