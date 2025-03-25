import CustomText from "../common/Text";
import cartImg from "../../assets/images/anti11.png";
import SingleProduct from "../product/SingleProduct";

const SearchResult = () => {
  return (
    <main className="mx-auto">
      <section className={`mt-16 mx-auto h-screen w-[60%] p-4`}>
        <CustomText
          text="Search Result"
          textType="normal"
          weightType="bold"
          extraStyle="text-center border-b border-gray-300 mb-2"
        />

        <div className="grid grid-cols-3 gap-4">
          {/* map through cart item  */}
          <SingleProduct
            productImage={cartImg}
            textTitle="Facial Cleaner"
            textDesc="Facial cleaner for facial treatment..."
            price="₦2500"
          />
        </div>
      </section>
    </main>
  );
};

export default SearchResult;
