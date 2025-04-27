import CustomText from "../../components/common/Text";
import TwoTextSpan from "../../components/home/TwoTextSpan";
import b1 from "../../assets/images/b1_mopson.png";
import b2 from "../../assets/images/b2_emzor.png";
import b3 from "../../assets/images/b3_swipha.png";
import b4 from "../../assets/images/b4_mayandbaker.png";
import b5 from "../../assets/images/bg7-fidson-logo.png";
import b6 from "../../assets/images/bg5_chemiron.png";
import b7 from "../../assets/images/b6_glaxos-logo.png";
import { productBrands } from "../../utils/admin/product/productList";

const Brands = () => {
  const brandImage = [b1, b2, b3, b4, b5, b6, b7];
  const brands = [
    "Mopson Pharmaceutical Limited",
    "Emzor Pharmaceutical Industrial Limited",
    "Swiss Pharma Nigeria Limited",
    "May & Baker Nigeria Plc",
    "Fidson Healthcare Plc",
    "Chemiron International Limited",
    "GlaxoSmithKline Nigeria Limited",
  ];

  return (
    <section className="border-b border-black mb-2 pb-4 animate-on-scroll">
      <TwoTextSpan leftText="Top Brands" />

      <article className="flex items-center lg:grid lg:grid-cols-7 gap-4 overflow-x-auto">
        {productBrands.slice(0, 7).map((item, index) => (
          <div className="cursor-pointer" key={index}>
            <div className="h-22 w-20 md:h-30 md:w-28 lg:h-38 lg:w-32 xl:h-48 xl:w-42 flex items-center justify-center rounded-xl p-2 bg-white mb-4">
              <img
                src={item.companyImage}
                alt="medication categories"
                className="w-46 h-auto object-fill bg-white"
              />
            </div>
            <article>
              <CustomText
                text={item.label}
                textType="small"
                weightType="bold"
              />
            </article>
          </div>
        ))}
      </article>
    </section>
  );
};

export default Brands;
