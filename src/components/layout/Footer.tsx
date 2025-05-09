import { FormEvent, lazy, useEffect, useState } from "react";
import Email from "../../assets/icons/email.svg?react";
import Facebook from "../../assets/icons/facebook.svg?react";
import Twitter from "../../assets/icons/twitter.svg?react";
import Instagram from "../../assets/icons/instagram.svg?react";
import Whatsapp from "../../assets/icons/whatsapp.svg?react";
import Love from "../../assets/icons/heart-fill-3.svg?react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { selectCart, updateShowModal, updateToastKeyAndMsg } from "../../features/cart/cartSlice";
import AnimatedToast from "../common/AnimatedToast";
import { createNotification, selectUser, sendEmailSubscription } from "../../features/user/userSlice";
import { NotificationProps } from "../../types/notification/Notification";
const CustomInput = lazy(() =>import("../common/Input"));
const Lists = lazy(() =>import("../common/Lists"));
const CustomText = lazy(() =>import("../common/Text"));
const CustomButton = lazy(() =>import("../common/Button"));


const Footer = () => {
  const [email, setEmail] = useState<string>("");
  const [ignoreErr, setIgnoreErr] = useState<boolean>(false);
  const { showModal, isCart, toastKey, toastMessage } = useAppSelector(selectCart);
  const { status } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showModal) {
      timer = setTimeout(() => {
        dispatch(updateShowModal(false));
         dispatch(updateToastKeyAndMsg(''));
      }, 2400);
    }

    return () => clearTimeout(timer);
  }, [showModal]);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


  const socialIcons = [
    {Icon: Facebook, route: 'https://facebook.com/ibewunjoenoch'}, 
    {Icon: Twitter, route: 'https://x.com/ibeenoch'}, 
    {Icon: Instagram, route: 'https://x.com/ibeenoch'}, 
    {Icon: Whatsapp, route: 'https://x.com/ibeenoch'}, 
    ];
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

  const handleEmailSubscribers = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(email) dispatch(sendEmailSubscription(email)).then(() => {
      const notificationData : NotificationProps = {
        message: `A user with an email of ${email} has subscribed to the newsletter`,
        notificationType: 'subscription',
      }
      dispatch(updateToastKeyAndMsg('Thank you for subscripting to our newsletter'));
      dispatch(updateShowModal(true))
      dispatch(createNotification(notificationData)).then(() => {
        setIgnoreErr(true)
        setEmail('')
      }) 
    });
  }

  useEffect(() => {
    setIgnoreErr(false);
  }, [])

  return (
    <footer className="bg-black p-8">
      {showModal && (
       
      <div key={toastKey} className="fixed top-20 md:top-30 lg:top-40 notification p-2 ">
        <AnimatedToast
          start={showModal}
          text={`${ toastMessage ? toastMessage : isCart ? "Added to Cart" : "Added to Favorite"}`}
          IconType={`${toastMessage ? 'success' : isCart ? "cart" : "fave"}`}
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
          <form onSubmit={handleEmailSubscribers}>
            <CustomInput
              label="Email Address"
              labelStyle="text-white text-xs font-normal"
              type="email"
              value={email}
              onChange={setEmail}
              required={true}
              validate={validateEmail}
              placeholder="Your Email Address"
              ignoreEmptyTextfield={ignoreErr}
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
                  type="submit"
                  weightType="normal"
                  defaultBorderColor="border border-white"
                  fullwidth={true}
                  isLoading={ status === 'loading'}
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
                <div onClick={() => window.open(Item.route, "_blank")}>
                  <Item.Icon
                    key={index}
                    className="w-4 h-4 fill-white cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
      <p className="text-white text-[9px] pt-2 text-center flex justify-center items-center">
        &copy; 2025. ChiMark Pharmacy. All rights reserved.
      </p>
      <p className="text-white text-[9px] pt-2 text-center flex justify-center items-center">
      Made with <span className="px-1"><Love className="w-4 h-4 text-amber-500" /> </span> by Ibewunjo Enoch 
      </p>
    </footer>
  );
};

export default Footer;
