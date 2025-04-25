import img2 from "../../assets/images/profile5.png";
import CustomText from "../../components/common/Text";
import Home from "../../assets/icons/home2.svg?react";
import Cart from "../../assets/icons/cart-shopping.svg?react";
// import Heart from "../../assets/icons/heart-alt-white.svg?react";
import User from "../../assets/icons/user.svg?react";
import Date from "../../assets/icons/date.svg?react";
// import PaymentCard from "../../assets/icons/payment-card-white.svg?react";
// import Help from "../../assets/icons/help-white.svg?react";
import Phone from "../../assets/icons/phone.svg?react";
import Address from "../../assets/icons/address-1.svg?react";
import City from "../../assets/icons/city.svg?react";
import Email from "../../assets/icons/email.svg?react";
import Location from "../../assets/icons/globe.svg?react";
import { useNavigate } from "react-router-dom";
import LargeImageSize from "../../components/common/LargeImageSize";
import { lightgrayBgColor } from "../../constants/appColor";
import ProfileLists from "../../components/auth/ProfileLists";

const Profile = () => {
  const navigate = useNavigate();
  const aboutItems = [
    {
      icon: Phone,
      leftText: "Phone:",
      rightText: "234 901 567 8991",
    },
    {
      icon: Email,
      leftText: "Email:",
      rightText: "nicolasjames@gmail.com",
    },
  ];

  const addressItems = [
    {
      icon: Address,
      leftText: "Address:",
      rightText: "51 Mobolaji Johnson avenue road",
    },
    {
      icon: City,
      leftText: "City:",
      rightText: "Ikeja",
    },
    {
      icon: Location,
      leftText: "Zipcode:",
      rightText: "178900",
    },
  ];

  const personalItems = [
    {
      icon: Date,
      leftText: "Date Of Birth:",
      rightText: "14th August 1992",
    },
    {
      icon: User,
      leftText: "Role:",
      rightText: "Customer",
    },
  ];
  const navigateHome = () => {
    navigate("/");
  };
  return (
    <main className="block lg:grid lg:grid-cols-2">
      <LargeImageSize img={img2} />

      <section className={`p-4 ${lightgrayBgColor}`}>
        <div className=" flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src={img2}
              alt="profile image"
              className="w-16 h-16 rounded-full border border-amber-500"
            />

            <div>
              <CustomText
                text="Ghada Longrim"
                textType="small"
                weightType="bold"
              />
              <CustomText
                text="GhadaLongrim@gmail.com"
                textType="extrasmall"
                weightType="normal"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div onClick={navigateHome} className="cursor-pointer">
              <Home className="w-8 h-8" />
            </div>
            <div className="cursor-pointer">
              <Cart className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="pb-4 border-b border-gray-300">
          <CustomText
            text="About"
            textType="normal"
            weightType="semibold"
            extraStyle="my-2"
          />
          {/* about items  */}

          {aboutItems.map((item) => (
            <ProfileLists
              Icon={item.icon}
              leftText={item.leftText}
              rightText={item.rightText}
            />
          ))}
        </div>

        <div className="pb-4 border-b border-gray-300">
          <CustomText
            text="Address"
            textType="normal"
            weightType="semibold"
            extraStyle="my-2"
          />
          {/* about items  */}

          {addressItems.map((item) => (
            <ProfileLists
              Icon={item.icon}
              leftText={item.leftText}
              rightText={item.rightText}
            />
          ))}
        </div>

        <div className="pb-4 border-b border-gray-300">
          <CustomText
            text="Personal Details"
            textType="normal"
            weightType="semibold"
            extraStyle="my-2"
          />
          {/* personal items  */}

          {personalItems.map((item) => (
            <ProfileLists
              Icon={item.icon}
              leftText={item.leftText}
              rightText={item.rightText}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Profile;
