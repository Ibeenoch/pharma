import Cancel from "../../assets/icons/cancel-close.svg?react";
import CancelCircle from "../../assets/icons/trash-bin.svg?react";
import cartImg from "../../assets/images/anti11.png";
import CustomText from "../common/Text";
import CustomButton from "../common/Button";

interface CartItemsProps {
  showCart: boolean;
  hideShowCart: () => void;
}

const CartItems: React.FC<CartItemsProps> = ({ showCart, hideShowCart }) => {
  return (
    <section
      className={`hidden ${
        showCart ? "lg:block" : "lg:hidden"
      } absolute right-5 top-30 w-[20%] h-screen bg-white p-4`}
    >
      <div className="flex justify-end cursor-pointer" onClick={hideShowCart}>
        <Cancel className="w-5 h-5" />
      </div>

      <CustomText
        text="Shopping Cart"
        textType="medium"
        weightType="medium"
        extraStyle="text-center border-b border-gray-300 mb-2"
      />

      <div>
        {/* cart item  */}
        <div className="flex gap-1 items-center mb-2 pb-3 border-b border-gray-300">
          <div className="p-1 flex justify-center items-center ">
            <img src={cartImg} alt="cart image" className="w-8 h-7" />
          </div>
          <div>
            <CustomText
              text="Amphilion Capsule X 300"
              textType="normal"
              weightType="thin"
              // color="gray"
            />
            <div className="flex justify-between items-center">
              <CustomText
                text="₦1250"
                textType="normal"
                weightType="thin"
                color="gray"
              />

              <select className="border border-gray-300 text-gray-500 text-[11px] px-2 py-1 rounded-md outline-none">
                {Array.from({ length: 50 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <CancelCircle className="ml-4 w-7 h-5 stroke-gray-400" />
        </div>
      </div>

      <CustomText
        text="Subtotal: ₦1250.00"
        textType="normal"
        weightType="thin"
        color="text-gray-500"
        extraStyle="pb-2 mb-2 border-b border-gray-300 text-center"
      />

      <div className="flex flex-col gap-3 w-max items-center mx-auto justify-center">
        <CustomButton
          text="View Cart"
          showArrow={true}
          textSize="normal"
          defaultBackgroundColor="bg-gray-400"
        />
        <CustomButton text="Checkout" showArrow={true} textSize="normal" />
      </div>
    </section>
  );
};

export default CartItems;
