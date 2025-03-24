import img2 from "../../assets/images/profile5.png";
import CustomText from "../../components/common/Text";
import Home from "../../assets/icons/home2.svg?react";
import Cart from "../../assets/icons/cart-shopping.svg?react";
import cup from "../../assets/images/cup.png";
import Heart from "../../assets/icons/heart-alt-white.svg?react";
import Truck from "../../assets/icons/truck-white.svg?react";
import Details from "../../assets/icons/contact-details-white.svg?react";
import PaymentCard from "../../assets/icons/payment-card-white.svg?react";
import Help from "../../assets/icons/help-white.svg?react";
import ProfileList from "../../components/auth/ProfileList";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const IconLists = [Details, Truck, PaymentCard, Heart, Help];
  const iconsText = [
    "My Details",
    "Delivery Address",
    "Payment Methods",
    "Favourite",
    "Help",
  ];
  const navigateHome = () => {
    navigate("/");
  };
  return (
    <main className="block lg:grid lg:grid-cols-2">
      <section className="h-[70%] lg:h-full  w-full bg-amber-500">
        <img
          src={img2}
          alt="profile full image"
          className="w-full h-[70%] lg:h-full  bg-amber-500"
        />
      </section>
      <section className="p-4">
        <div className=" flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src={img2}
              alt="profile image"
              className="w-12 h-12 rounded-full border border-amber-500"
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
        {/* trophy section  */}
        <section className="w-full h-40 rounded-lg bg-black p-4 my-5 flex justify-around items-center">
          <img src={cup} alt="point awarded" className="w-35 h-35" />
          <div>
            <CustomText
              text="3500"
              textType="large"
              weightType="bold"
              color="text-white"
              extraStyle="my-3"
            />
            <CustomText
              text="Total points"
              textType="normal"
              weightType="bold"
              color="text-white"
              extraStyle="my-3"
            />
          </div>
        </section>

        {/* profile items  */}
        <section>
          {<ProfileList listOfIcons={IconLists} icontext={iconsText} />}
        </section>
      </section>
    </main>
  );
};

export default Profile;
