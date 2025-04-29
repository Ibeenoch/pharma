import { useEffect, useState } from "react";
import CustomInput from "../common/Input";
import CustomText from "../common/Text";
import Email from "../../assets/icons/email.svg?react";
import CustomButton from "../common/Button";
import Lists from "../common/Lists";
import Facebook from "../../assets/icons/facebook.svg?react";
import Twitter from "../../assets/icons/twitter.svg?react";
import Instagram from "../../assets/icons/instagram.svg?react";
import Whatsapp from "../../assets/icons/whatsapp.svg?react";
import Love from "../../assets/icons/heart-fill-3.svg?react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { selectCart, updateShowModal } from "../../features/cart/cartSlice";
import AnimatedToast from "../common/AnimatedToast";

const Footer = () => {
  const [email, setEmail] = useState<string>("");
  const { showModal, isCart } = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showModal) {
      timer = setTimeout(() => {
        dispatch(updateShowModal(false));
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [showModal]);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


  const socialIcons = [Facebook, Twitter, Instagram, Whatsapp];
  const siteMap = [
    { name: "About Us", route: "/about" },
    { name: "Return & Refund Policy", route: "#" },
    { name: "Shipping & Delivery", route: "#" },
    { name: "Contact Us", route: "/contact" },
  ];
  const products = [
    { name: "Prescription Medications", route: "#" },
    { name: "Over-the-Counter Drugs", route: "#" },
    { name: "Health & Wellness", route: "#" },
    { name: "Skincare & Beauty", route: "#" },
  ];
  console.log("showModal ", showModal);
  return (
    <footer className="bg-black p-8">
      {showModal && (
       
      <div className="fixed top-50 notification p-2 ">
      <AnimatedToast
          start={showModal}
          text={`${isCart ? "Added to Cart" : "Added to Favorite"}`}
          IconType={`${isCart ? "cart" : "fave"}`}
        /> 
      </div>
      )}


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b border-gray-500 pb-4">
        <article>
          <CustomText
            text="Resources"
            textType="medium"
            weightType="bold"
            color="text-white"
          />
          <Lists
            showOnMobile={true}
            lists={siteMap}
            textType="small"
            weightType="thin"
            extraStyle="text-white"
            isVertical={true}
            isFooter={true}
          />
        </article>
        <article>
          <CustomText
            text="Company"
            textType="medium"
            weightType="bold"
            color="text-white"
          />
          <Lists
            showOnMobile={true}
            lists={products}
            textType="small"
            weightType="thin"
            extraStyle="text-white"
            isVertical={true}
            isFooter={true}
          />
        </article>
        <article>
          <CustomText
            text="Don't Miss Out"
            textType="medium"
            weightType="normal"
            color="text-white"
            extraStyle="mt-4 sm:mt-0"
          />
          <CustomText
            text="Subscribe to our newsletter for update on our latest product and mouth watering offers"
            textType="extrasmall"
            weightType="thin"
            color="text-white"
            extraStyle="mt-1"
          />
          <form>
            <CustomInput
              label="Email Address"
              labelStyle="text-white text-xs font-normal"
              type="email"
              value={email}
              onChange={setEmail}
              required={true}
              validate={validateEmail}
              placeholder="Your Email Address"
              prefixIcon={<Email className="w-4 h-4" />}
              errorMessage={
                validateEmail(email) === false
                  ? "Enter a valid email address"
                  : ""
              }
              showFullWidth={true}
            />
             <CustomButton
                  text="Subscribe"
                  textSize="small"
                  weightType="normal"
                  defaultBorderColor="border border-white"
                  fullwidth={true}
                />
          </form>

          <div className="my-3">
            <CustomText
              text="Get in touch"
              textType="normal"
              color="text-white"
            />
            <div className="flex gap-3 mt-2 items-center">
              {socialIcons.map((Item, index) => (
                <Item
                  key={index}
                  className="w-4 h-4 fill-white cursor-pointer"
                />
              ))}
            </div>
          </div>
        </article>
      </div>
      <p className="text-white text-[9px] pt-2 text-center flex justify-center items-center">
        &copy; 2025. Made with <span className="px-1"><Love className="w-4 h-4 text-red-500" /> </span> by Ibewunjo Enoch for ChiMark Pharmacy. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
