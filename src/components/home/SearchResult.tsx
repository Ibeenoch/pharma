import CustomText from "../common/Text";
import cartImg from "../../assets/images/anti11.png";
import Cart from "../../assets/icons/cart-fill-3.svg?react";
import Fave from "../../assets/icons/heart-fill-3.svg?react";

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
          <div className="p-4 bg-white rounded-lg mx-auto cursor-pointer">
            <img src={cartImg} alt="cart image" className="w-full h-auto" />
            <div>
              <CustomText
                text="Facial Cleaner"
                textType="medium"
                weightType="bold"
              />
              <CustomText
                text="Facial cleaner for facial treatment..."
                textType="small"
                weightType="semibold"
                color="text-gray-400 my-2"
              />
              <div className="flex justify-between items-center">
                <CustomText text="₦2500" textType="medium" weightType="bold" />
                <div className="flex gap-3 items-center">
                  <span className="p-2 bg-black text-white hover:bg-white hover:border hover:border-black rounded-full group">
                    <Fave className="w-4 h-4 group-hover:text-black" />
                  </span>
                  <span className="p-2 bg-black text-white hover:bg-white hover:border hover:border-black rounded-full group">
                    <Cart className="w-4 h-4 group-hover:text-black" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SearchResult;
