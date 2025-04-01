import DashBoard from "../../../assets/icons/dashboard.svg?react";
import User from "../../../assets/icons/users-2-black.svg?react";
import Product from "../../../assets/icons/product-tag.svg?react";
import Order from "../../../assets/icons/order.svg?react";
import Transaction from "../../../assets/icons/transaction.svg?react";
import Settings from "../../../assets/icons/setting.svg?react";
import CustomText from "../../common/Text";

interface NavIconsProps {
  indexClicked: number;
  handleIndexClicked: (index: number) => void;
}

const MobileNavIcons: React.FC<NavIconsProps> = ({
  indexClicked,
  handleIndexClicked,
}) => {
  const navIcons = [
    { icons: DashBoard, text: "Dashboard" },
    { icons: User, text: "User" },
    { icons: Product, text: "Product" },
    { icons: Order, text: "Order" },
    { icons: Transaction, text: "Transaction" },
    { icons: Settings, text: "Settings" },
  ];
  return (
    <div className={`flex flex-col md:pl-8`}>
      {navIcons.map((Item, index) => (
        <div
          onClick={() => handleIndexClicked(index)}
          className={`
            
        `}
        >
          <div
            className={`flex items-center gap-2 cursor-pointer p-4  border-b border-gray-200 hover:bg-gray-400`}
          >
            <div
              className={`p-3 ${
                index === indexClicked ? "bg-gray-50" : "bg-gray-100"
              } rounded-full`}
            >
              <Item.icons className="w-10 h-10" />
            </div>
            <div className="">
              <CustomText
                text={Item.text}
                textType="large"
                weightType="normal"
                color={`${
                  index === indexClicked ? "text-gray-800" : "text-gray-800"
                }`}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MobileNavIcons;
