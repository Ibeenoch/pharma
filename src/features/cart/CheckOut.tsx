import { ChangeEvent, useEffect, useState } from "react";
import Cart from "./Cart";
import { pageSpacing } from "../../constants/appText";
import CustomText from "../../components/common/Text";
import CustomInput from "../../components/common/Input";
import { validator } from "../../utils/validator";
import User from "../../assets/icons/user.svg?react";
import Paystack from "../../assets/icons/paystack-logo-vector.svg?react";
import Flutterwave from "../../assets/icons/flutterwave.svg?react";
import BankTransfer from "../../assets/icons/bank-transfer.svg?react";
import Check from "../../assets/icons/check-mark.svg?react";
import Country from "../../assets/icons/globe.svg?react";
import Phone from "../../assets/icons/mobile-phone.svg?react";
import Location from "../../assets/icons/maps-and-flags.svg?react";
import Address from "../../assets/icons/home3.svg?react";
import PaymentOption from "../../components/common/PaymentOption";
import CustomSelect from "../../components/common/Select";
import { countries } from "../../utils/countries";
import { nigeriaStateAndLga } from "../../utils/nigeriaStateAndLgas";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { selectAuth } from "../auth/authSlice";
import { selectCart } from "./cartSlice";
import CustomButton from "../../components/common/Button";
import {
  getShippingDetails,
  postShippingDetails,
  selectOrder,
  updateShippingDetails,
} from "../order/orderSlice";
import {
  ShippingDetailsProps,
  UpdateShippingArgs,
} from "../../types/order/OrderType";
import { PaystackButton, usePaystackPayment } from "react-paystack";

const CheckOut = () => {
  const { user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const config = {
    reference: new Date().getTime().toString(),
    email: user && user.email,
    amount: 20000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: import.meta.env.VITE_TEST_PUBLIC_KEY,
  };

  const onSuccess = (reference: any) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log("reference ", reference);

    // bank auth res
    // message: "Approved"
    // redirecturl: "?trxref=1744836356976&reference=1744836356976"
    // reference: "1744836356976"
    // status: "success"
    // trans: "4879373753"
    // transaction: "4879373753"
    // trxref: "1744836356976"
  };

  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };
  const initializePayment = usePaystackPayment(config);
  const [firstName, setFirstName] = useState<string>(
    user && user.firstName ? user.firstName : ""
  );
  const [lastName, setLastName] = useState<string>(
    user && user.lastName ? user.lastName : ""
  );
  const { status, hasPreviousShippingDetails, shippingDetail } =
    useAppSelector(selectOrder);

  useEffect(() => {
    user &&
      user.userId &&
      hasPreviousShippingDetails === false &&
      dispatch(getShippingDetails(user && user.userId));
  }, [hasPreviousShippingDetails, shippingDetail]);

  const [phone, setPhone] = useState<string>(
    shippingDetail &&
      Array.isArray(shippingDetail) &&
      shippingDetail[0] &&
      shippingDetail[0].phoneNumber
      ? shippingDetail[0].phoneNumber
      : ""
  );
  const [country, setCountry] = useState<string>(
    shippingDetail &&
      Array.isArray(shippingDetail) &&
      shippingDetail[0] &&
      shippingDetail[0].country
      ? shippingDetail[0].country
      : "Nigeria"
  );
  const [state, setState] = useState<string>(
    shippingDetail &&
      Array.isArray(shippingDetail) &&
      shippingDetail[0] &&
      shippingDetail[0].state
      ? shippingDetail[0].state
      : ""
  );
  const [lga, setLga] = useState<string>(
    shippingDetail &&
      Array.isArray(shippingDetail) &&
      shippingDetail[0] &&
      shippingDetail[0].lga
      ? shippingDetail[0].lga
      : ""
  );
  const [zipcode, setZipcode] = useState<string>(
    shippingDetail &&
      Array.isArray(shippingDetail) &&
      shippingDetail[0] &&
      shippingDetail[0].zipcode
      ? shippingDetail[0].zipcode
      : ""
  );
  const [address, setAddress] = useState<string>(
    shippingDetail &&
      Array.isArray(shippingDetail) &&
      shippingDetail[0] &&
      shippingDetail[0].address
      ? shippingDetail[0].address
      : ""
  );
  const [showUpdateShippingDetails, setShowUpdateShippingDetails] =
    useState<boolean>(true);
  const [paymentIndex, setPaymentIndex] = useState<number>(0);
  const { cart, total } = useAppSelector(selectCart);
  console.log(cart, total);
  const setPaymentMethodIndex = (index: number) => {
    setPaymentIndex(index);
  };

  const shouldUpdateShippingDetails = () => {
    let s =
      shippingDetail && Array.isArray(shippingDetail) && shippingDetail[0];
    if (
      (s && s.phoneNumber !== phone) ||
      (s && s.country !== country) ||
      (s && s.state !== state) ||
      (s && s.lga !== lga) ||
      (s && s.zipcode !== zipcode) ||
      (s && s.address !== address)
    ) {
      setShowUpdateShippingDetails(true);
    } else {
      setShowUpdateShippingDetails(false);
    }
  };

  useEffect(() => {
    shouldUpdateShippingDetails();
  }, [phone, country, state, lga, zipcode, address]);

  const IconLists = [Paystack, Flutterwave, BankTransfer];

  const nigerianState = nigeriaStateAndLga.map((item) => item.state);
  const stateLgas = nigeriaStateAndLga.find((item) => item.state === state)
    ?.lgas || ["Select LGA"];

  const [error, setError] = useState<{
    firstName?: string;
    lastName?: string;
    phone?: string;
    country?: string;
    state?: string;
    lga?: string;
    address?: string;
    zipcode?: string;
  }>({});

  const handleFormSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    initializePayment({ onSuccess, onClose });
  };

  const handleShippingDetails = (shippingID?: string) => {
    const firstNameValid = validator(firstName, "others");
    const lastNameValid = validator(lastName, "others");
    const phoneValid = validator(phone, "phone");
    const countryValid = validator(country, "others");
    const stateValid = validator(state, "others");
    const lgaValid = validator(lga, "others");
    const addressValid = validator(address, "others");
    const zipcodeValid = validator(zipcode, "others");

    if (
      !firstNameValid ||
      !lastNameValid ||
      !phoneValid ||
      !countryValid ||
      !stateValid ||
      !lgaValid ||
      !addressValid ||
      !zipcodeValid
    ) {
      setError({
        firstName: firstNameValid ? undefined : "First name is required",
        lastName: lastNameValid ? undefined : "Last name is required",
        phone: phoneValid ? undefined : "Phone number is required",
        country: countryValid ? undefined : "Country is required",
        state: stateValid ? undefined : "State is required",
        lga: lgaValid ? undefined : "Lga is required",
        address: addressValid ? undefined : "Address is required",
        zipcode: zipcodeValid ? undefined : "Zipcode is required",
      });

      return;
    }

    // update shipping address
    if (
      user &&
      user.userId &&
      typeof shippingID === "string" &&
      shippingID.length > 0
    ) {
      const shippingDetails: ShippingDetailsProps = {
        userId: user && user.userId,
        phoneNumber: phone,
        country,
        state,
        lga,
        zipcode,
        address,
      };
      const updateShippindData: UpdateShippingArgs = {
        shippingDetails: shippingDetails,
        shippingId: shippingID,
      };
      dispatch(updateShippingDetails(updateShippindData)).then((res) => {
        res &&
          res.payload &&
          res.payload !== undefined &&
          setShowUpdateShippingDetails(false);
      });
    }
    // create shipping address
    if (user && user.userId && typeof shippingID === "object") {
      const shippingDetails: ShippingDetailsProps = {
        userId: user && user.userId,
        phoneNumber: phone,
        country,
        state,
        lga,
        zipcode,
        address,
      };
      dispatch(postShippingDetails(shippingDetails)).then((res) => {
        res &&
          res.payload &&
          res.payload !== undefined &&
          setShowUpdateShippingDetails(false);
      });
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className={`mt-20 ${pageSpacing} my-10  p-4 md:grid md:grid-cols-[60%_40%] md:gap-4`}
    >
      <section className="">
        <div className="">
          <div className="bg-white p-4 md:p-6 rounded-xl">
            <CustomText
              text="Shipping Details"
              textType="medium"
              weightType="semibold"
              extraStyle="my-3"
            />
            <div className="md:flex gap-4 items-center">
              <CustomInput
                prefixIcon={<User className="w-4 h-4" />}
                label="First Name"
                Id="firstName"
                type="text"
                value={firstName}
                onChange={setFirstName}
                required={true}
                showFullWidth={true}
                placeholder="Your First Name"
                validate={(value) => validator(value, "others")}
                errorMessage={error.firstName || "First name is required"}
                disabled={true}
              />
              <CustomInput
                prefixIcon={<User className="w-4 h-4" />}
                label="Last Name"
                Id="lastName"
                type="text"
                value={lastName}
                onChange={setLastName}
                required={true}
                showFullWidth={true}
                placeholder="Your Last Name"
                validate={(value) => validator(value, "others")}
                errorMessage={error.lastName || "Lastname name is required"}
                disabled={true}
              />
            </div>

            <CustomInput
              prefixIcon={<Phone className="w-4 h-4" />}
              label="Phone Number"
              Id="phone"
              type="text"
              value={phone}
              onChange={setPhone}
              required={true}
              max={11}
              showFullWidth={true}
              placeholder="Your Phone Number"
              validate={(value) => validator(value, "phone")}
              errorMessage={error.phone || "Phone Number is required"}
            />
            <CustomSelect
              prefixIcon={<Country className="w-4 h-4" />}
              countriesOptions={countries}
              label="Country"
              Id="country"
              value={country}
              onChange={setCountry}
              required={true}
              showFullWidth={true}
              validate={(value) => validator(value, "others")}
              errorMessage={error.country || "Country is required"}
            />

            <div className="md:flex gap-4 items-center">
              <CustomSelect
                prefixIcon={<Country className="w-4 h-4" />}
                otherOptions={
                  country === "Nigeria" ? nigerianState : ["Select State"]
                }
                label="State"
                Id="state"
                value={state}
                onChange={setState}
                required={true}
                showFullWidth={true}
                validate={(value) => validator(value, "others")}
                errorMessage={error.state || "State is required"}
              />

              <CustomSelect
                prefixIcon={<Location className="w-4 h-4" />}
                otherOptions={stateLgas}
                label="LGA"
                Id="lga"
                value={lga}
                onChange={setLga}
                required={true}
                showFullWidth={true}
                validate={(value) => validator(value, "others")}
                errorMessage={error.lga || "LGA is required"}
              />
              <CustomInput
                prefixIcon={<Address className="w-4 h-4" />}
                label="Zip Code"
                Id="zipcode"
                type="text"
                value={zipcode}
                onChange={setZipcode}
                required={true}
                showFullWidth={true}
                placeholder="Your Zip Code"
                validate={(value) => validator(value, "others")}
                errorMessage={error.lga || "Zip Code is required"}
              />
            </div>
            <CustomInput
              prefixIcon={<Address className="w-4 h-4" />}
              label="Address"
              Id="address"
              type="text"
              value={address}
              onChange={setAddress}
              required={true}
              showFullWidth={true}
              placeholder="Your Address"
              validate={(value) => validator(value, "others")}
              errorMessage={error.address || "Address is required"}
            />
            <div className="flex gap-4 items-center my-3">
              {shippingDetail &&
              Array.isArray(shippingDetail) &&
              shippingDetail[0] &&
              shippingDetail[0].$id ? (
                <>
                  {showUpdateShippingDetails ? (
                    <CustomButton
                      text="Update Address"
                      type="button"
                      fullwidth={true}
                      showArrow={true}
                      borderRadiusType="threecurved"
                      isLoading={status === "loading"}
                      onClick={() => {
                        shippingDetail &&
                          Array.isArray(shippingDetail) &&
                          shippingDetail[0] &&
                          shippingDetail[0] &&
                          handleShippingDetails(
                            shippingDetail &&
                              shippingDetail[0] &&
                              shippingDetail[0].$id
                          );
                      }}
                    />
                  ) : (
                    <div className="bg-green-500/30 p-2 rounded-lg flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <CustomText
                        text="Shipping Details Up To Date"
                        color="text-green-500"
                      />
                    </div>
                  )}
                </>
              ) : (
                <CustomButton
                  text="Save Address"
                  type="button"
                  fullwidth={true}
                  showArrow={true}
                  borderRadiusType="threecurved"
                  isLoading={status === "loading"}
                  onClick={handleShippingDetails}
                />
              )}

              {/* <CustomButton
                text="Cancel"
                type="button"
                weightType="medium"
                defaultBackgroundColor="bg-red-600 hover:bg-red-600/10"
                defaultBorderColor="hover:border hover:border-red-600"
                fullwidth={true}
                showIcon={true}
                PreFixIcon={Cancel}
                PreFixIconWeight="stroke-2"
                PreFixIconStyle="fill-white group-hover:text-red-600"
                borderRadiusType="threecurved"
                defaultTextColor="text-white group-hover:text-red-600"
              /> */}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 md:p-6 my-5">
            <CustomText
              text="Delivery Timelines & Shipping Method"
              textType="medium"
              weightType="semibold"
              extraStyle="my-5"
            />
            <CustomText
              text="Orders placed before 4:00 PM will be delivered within 3 to 48 hours in Lagos, while deliveries outside Lagos typically take between 3 to 5 business days. If you need your order sooner, consider returning to your cart and using the chat button to explore express delivery options. Once your order has been shipped, tracking details will be provided. Please note that delivery times may be affected by factors such as product availability or weather conditions. If you have any questions or require assistance, feel free to reach out via chat or WhatsApp at +234-081-7200-5311."
              textType="small"
              weightType="normal"
              extraStyle="my-3"
              color="text-gray-500"
            />
          </div>

          <div className="bg-white rounded-xl p-4 md:p-6">
            <CustomText
              text="Select Payment Method"
              textType="medium"
              weightType="semibold"
              extraStyle="my-5"
            />
            <CustomText
              text="All transactions are secure and encrypted."
              textType="small"
              weightType="normal"
              extraStyle="my-3"
              color="text-gray-500"
            />
            <div className="flex gap-2 items-center overflow-x-auto">
              {IconLists.map((Item, index) => (
                <div onClick={() => setPaymentMethodIndex(index)}>
                  <PaymentOption Icon={Item} active={paymentIndex === index} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Cart isCheckOutPage={true} showCheckOutBtn={false} />
    </form>
  );
};

export default CheckOut;
