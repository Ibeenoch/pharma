import { ChangeEvent, lazy, useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import User from "../../assets/icons/user.svg?react";
import Email from "../../assets/icons/email.svg?react";
import Phone from "../../assets/icons/mobile-phone.svg?react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setNavIndexLink } from "../../features/auth/authSlice";
import { links } from "../../utils/listLink";
import { ContactProps } from "../../types/user/contact";
import { createNotification, selectUser, sendContactMessage } from "../../features/user/userSlice";
import { updateShowModal, updateToastKeyAndMsg } from "../../features/cart/cartSlice";
import { NotificationProps } from "../../types/notification/Notification";
const CustomButton = lazy(() =>import("../common/Button"));
const CustomTextArea = lazy(() =>import("../common/TextArea"));
const CustomInput = lazy(() =>import("../common/Input"));
const CustomText = lazy(() =>import('../common/Text'));


const Contact = () => {
  const { status } = useAppSelector(selectUser);
  const [firstName, setFirstNamel] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    message?: string;
  }>({});
  const dispatch = useAppDispatch();

  const handleFormSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const firstNameValid = validator(firstName, "others");
    const lastNameValid = validator(lastName, "others");
    const emailValid = validator(email, "email");
    const phoneValid = validator(phone, "phone");
    const messageValid = validator(message, "others");

    if (
      !firstNameValid ||
      !lastNameValid ||
      !emailValid ||
      !phoneValid ||
      !messageValid
    ) {
      setError({
        firstName: firstNameValid ? undefined : "First name is required",
        lastName: lastNameValid ? undefined : "Last name is required",
        email: emailValid ? undefined : "Email is required",
        phone: phoneValid ? undefined : "Phone is required",
        message: messageValid ? undefined : "Message is required",
      });
      return;
    }

    const contactData : ContactProps = {email, firstName, lastName, message, phone };
    dispatch(sendContactMessage(contactData)).then(() => {
      dispatch(updateToastKeyAndMsg('Your message has been submitted'));
      dispatch(updateShowModal(true));
      const contactData: NotificationProps = {
        message: `${firstName} ${lastName} just sent you a message.`,
        notificationType: 'message',
      }
      dispatch(createNotification(contactData)).then((res) => console.log(`conatct `, res.payload))
      setFirstNamel(''), setLastName(''), setEmail(''), setPhone(''), setMessage('');
    })
  };

    useEffect(() => {
        // when the user visit the page move the page to the top
        window.scrollTo(0,0);
        // set the correct navbar active text
        dispatch(setNavIndexLink({ name: links[4].name, index: 4 }));
      },[])

  return (
    <section className="mt-20 w-full p-4 lg:w-[60%] mx-auto">
      <CustomText
        text="Contact our team"
        textType="large"
        weightType="semibold"
        extraStyle="mt-4  text-center"
      />
      <CustomText
        text="Got any questions about the product, service or scaling on our platform? We're here to help. Chat to our friendly team 24/7 and get onboard in less than 5 minutes."
        textType="normal"
        weightType="normal"
        extraStyle="my-3 text-center"
      />
      <form onSubmit={handleFormSubmit} className="">
        <div className="block sm:flex items-center gap-3">
          <CustomInput
            prefixIcon={<User className="w-4 h-4" />}
            label="First Name"
            Id="firstName"
            type="text"
            value={firstName}
            roundedBorder={true}
            onChange={setFirstNamel}
            required={true}
            showFullWidth={true}
            placeholder="Your First Name"
            validate={(value) => validator(value, "others")}
            errorMessage={error.firstName || "First name is required"}
          />
          <CustomInput
            prefixIcon={<User className="w-4 h-4" />}
            label="Last Name"
            Id="lastName"
            type="text"
            value={lastName}
            roundedBorder={true}
            onChange={setLastName}
            required={true}
            showFullWidth={true}
            placeholder="Your Last Name"
            validate={(value) => validator(value, "others")}
            errorMessage={error.lastName || "Last Name is required"}
          />
        </div>
        <CustomInput
          prefixIcon={<Email className="w-4 h-4" />}
          label="Email"
          Id="email"
          type="text"
          value={email}
          onChange={setEmail}
          roundedBorder={true}
          required={true}
          showFullWidth={true}
          placeholder="Your Email"
          validate={(value) => validator(value, "others")}
          errorMessage={error.email || "Email is required"}
        />
        <CustomInput
          prefixIcon={<Phone className="w-4 h-4" />}
          label="Phone Number"
          Id="phone"
          type="text"
          value={phone}
          onChange={setPhone}
          roundedBorder={true}
          required={true}
          showFullWidth={true}
          placeholder="Your phone number"
          validate={(value) => validator(value, "others")}
          errorMessage={error.phone || "Phone number is required"}
        />
        <CustomTextArea
          label="Message"
          roundedBorder={true}
          Id="message"
          value={message}
          onChange={setMessage}
          required={true}
          showFullWidth={true}
          placeholder="Your message"
          validate={(value) => validator(value, "others")}
          errorMessage={error.message || "message is required"}
        />
        <CustomButton
          text="Submit"
          className="my-5"
          textSize="normal"
          fullwidth={true}
          type="submit"
          isLoading={status === 'loading'}
        />
      </form>
    </section>
  );
};

export default Contact;
