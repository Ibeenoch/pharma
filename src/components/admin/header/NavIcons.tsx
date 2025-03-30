import DashBoard from "../../../assets/icons/dashboard.svg?react";
import User from "../../../assets/icons/users-2-black.svg?react";
import Product from "../../../assets/icons/product-tag.svg?react";
import Order from "../../../assets/icons/order.svg?react";
import Transaction from "../../../assets/icons/transaction.svg?react";
import Settings from "../../../assets/icons/setting.svg?react";
import CustomText from "../../common/Text";
import { adminDefaultBgColor, oliveColorBg } from "../../../constants/appColor";

interface NavIconsProps {
  indexClicked: number;
  handleIndexClicked: (index: number) => void;
}

const NavIcons: React.FC<NavIconsProps> = ({
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
    <div className={`flex flex-col pl-8`}>
      {navIcons.map((Item, index) => (
        <div
          onClick={() => handleIndexClicked(index)}
          className={`
            ${
              index === indexClicked - 1
                ? `${adminDefaultBgColor}`
                : index === indexClicked + 1
                ? `${adminDefaultBgColor}`
                : ""
            } 
        `}
        >
          <div
            className={`flex items-center gap-2 cursor-pointer p-4 ${
              index === indexClicked
                ? `${adminDefaultBgColor} rounded-tl-4xl rounded-bl-4xl`
                : index === indexClicked - 1
                ? `${oliveColorBg} rounded-br-4xl`
                : index === indexClicked + 1
                ? `${oliveColorBg} rounded-tr-4xl`
                : ""
            }  `}
          >
            <div
              className={`p-3 ${
                index === indexClicked ? "bg-white" : "bg-gray-100"
              } rounded-full`}
            >
              <Item.icons className="w-5 h-5" />
            </div>
            <div className="hidden sm:block">
              <CustomText
                text={Item.text}
                textType="small"
                weightType="semibold"
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

export default NavIcons;
