import { MARGIN_TOP } from "../../constants/appText";
import img from "../../assets/images/anti18.png";
import img2 from "../../assets/images/anti17.png";
import LargeImageSize from "../../components/common/LargeImageSize";
import PreviewImage from "../../components/common/PreviewImage";
import CustomText from "../../components/common/Text";
import brandImage from "../../assets/images/b2_emzor.png";

const ProductDetails = () => {
  return (
    <section className={`${MARGIN_TOP} h-screen grid grid-cols-2 mb-1`}>
      <div className="relative">
        <LargeImageSize img={img} />
        <div className="absolute top-0 left-0 mt-6">
          {/* preview images */}
          <PreviewImage img={img} />
          <PreviewImage img={img2} />
          <PreviewImage img={img} />
          <PreviewImage img={img2} />
          <PreviewImage img={img} />
          <PreviewImage img={img2} />
        </div>
      </div>

      <div className="mt-5 p-2">
        <CustomText
          text="Emzor Paracetamol 500mg Tablets"
          textType="medium"
          weightType="bold"
        />
        <div className="w-max">
          <PreviewImage img={brandImage} />
        </div>
        <div className="flex gap-1 items-center">
          <CustomText text="Brand :" textType="normal" weightType="semibold" />
          <CustomText
            text="Emzor Pharmaceuticals"
            textType="small"
            weightType="semibold"
            color="text-gray-500"
          />
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
