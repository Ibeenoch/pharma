import { useNavigate } from "react-router-dom";
import CustomText from "../../components/common/Text";
import TwoTextSpan from "../../components/home/TwoTextSpan";
import { useAppSelector } from "../../hooks/reduxHooks";
import { selectproductAdmin } from "../admin/product/productSlice";

const TopSelling = () => {
  const navigate = useNavigate();
  const { productAdmin } = useAppSelector(selectproductAdmin);
  console.log("topselling ", productAdmin);
  const viewProductDetails = (id: string) => {
    navigate(`/product_details/${id}`);
  };

  return (
    <section className="border-b border-black mb-2 pb-4">
      <TwoTextSpan leftText="Top Selling" />

      <article className="flex gap-4 overflow-x-auto">
        {productAdmin &&
          Array.isArray(productAdmin) &&
          productAdmin.map((item, index) => (
            <div
              onClick={() => {
                if (item?.$id) viewProductDetails(item?.$id);
              }}
              className="cursor-pointer"
              key={index}
            >
              <div className="h-22 w-20 md:h-30 md:w-28 lg:h-38 lg:w-32 xl:h-48 xl:w-42 flex items-center justify-center rounded-xl p-2 bg-white mb-4">
                <img
                  src={item && item.imagesUrl && item.imagesUrl[index]}
                  alt="top selling"
                  className="w-46 h-auto object-fill"
                />
              </div>
              <article>
                {item && item.name && (
                  <CustomText
                    text={
                      item && item.name && item.name.length > 20
                        ? item.name.slice(0, 20) + "..."
                        : item.name
                    }
                    textType="small"
                    weightType="bold"
                    extraStyle="text-ellipsis"
                  />
                )}
                <div className="flex gap-3 items-center">
                  {item && item.price && (
                    <CustomText
                      text={`₦${String(
                        item &&
                          item.price &&
                          item.discount &&
                          item.price * (1 - item.discount / 100)
                      )}`}
                      textType="extrasmall"
                      weightType="bold"
                      color="text-amber-500"
                    />
                  )}
                  {item && item.price && (
                    <CustomText
                      text={`₦${String(item && item.price)}`}
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

export default TopSelling;
