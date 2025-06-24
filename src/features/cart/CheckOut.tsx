import {  FormEvent, lazy, useEffect, useState } from "react";
import { pageSpacing } from "../../constants/appText";
import { validator } from "../../utils/validator";
import User from "../../assets/icons/user.svg?react";
import CompanyIcon from "../../assets/icons/pharmacy.svg?react";
import PaystackLogo from "../../assets/icons/paystack-logo-vector.svg?react";
import Flutterwave from "../../assets/icons/flutterwave.svg?react";
import Check from "../../assets/icons/check-mark.svg?react";
import Reset from "../../assets/icons/reset.svg?react";
import Country from "../../assets/icons/globe.svg?react";
import Phone from "../../assets/icons/mobile-phone.svg?react";
import Location from "../../assets/icons/maps-and-flags.svg?react";
import Address from "../../assets/icons/home3.svg?react";
import { countries } from "../../utils/countries";
import { nigeriaStateAndLga } from "../../utils/nigeriaStateAndLgas";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { selectAuth, toggleProfileTocheckOut } from "../auth/authSlice";
import { postACart, removeAllItemsInCart, selectCart } from "./cartSlice";
import glovo from "../../assets/images/glove.png";
import chowDesk from "../../assets/images/chowdesk.png";
import errand360 from "../../assets/images/errand360.png";
import gokada from "../../assets/images/gokada.png";
import Spinner from "../../assets/icons/circle-spinner.svg?react";
import {
  getShippingDetails,
  postOrder,
  postShippingDetails,
  postTransaction,
  resetShippingDetails,
  selectOrder,
  updateShippingDetails,
} from "../order/orderSlice";
import {
  AllOrderResultData,
  OrderProps,
  ShippingDetailsProps,
  UpdateShippingArgs,
} from "../../types/order/OrderType";
import Paystack from '@paystack/inline-js';
import { loadFlutterwaveScript } from "../../utils/loadFlutterWave";
import {
  FlutterWaveDataProps,
  PayStackProps,
  TransactionProps,
} from "../../types/payment/FlutterwavePaymentType";
import {
  CartOrderedPropsData,
  UpdateProductCart,
} from "../../types/cart/CartData";
import { useNavigate, useParams } from "react-router-dom";
import { updateHotProductNum, updateProductStockQuantity } from "../admin/product/productSlice";
import { generateRandomCode } from "../../utils/randomCodeGenerator";
import { UpdatedHotProductProps } from "../../types/product/ProductData";
import { NotificationProps } from "../../types/notification/Notification";
import { createNotification } from "../user/userSlice";
const DeliveryOption = lazy(() => import("../../components/common/DeliveryOption"));
const Cart = lazy(() => import("./Cart"));
const CustomText = lazy(() => import("../../components/common/Text"));
const CustomInput = lazy(() => import("../../components/common/Input"));
const PaymentOption = lazy(() => import("../../components/common/PaymentOption"));
const CustomSelect = lazy(() => import("../../components/common/Select"));
const CustomButton = lazy(() => import("../../components/common/Button"));
const Modal = lazy(() => import("../../components/common/Modal"));


const CheckOut = () => {
  const { user, profileToCheckOut } = useAppSelector(selectAuth);
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [paymentProcessing, setPaymentProcessing] = useState<boolean>(false);
  const { cart, total } = useAppSelector(selectCart);
  const { transaction } = useAppSelector(selectOrder);
  const { status, hasPreviousShippingDetails, shippingDetail } =  useAppSelector(selectOrder);

  const handleTransaction = (transactionDetails:  TransactionProps, hotDealsNum: UpdatedHotProductProps[]) => {

    dispatch(postTransaction(transactionDetails)).then(() => {

      // dispatch the cart
      dispatch(postACart(cart)).then((res) => {

        // dispatch the order
        if (res.payload !== undefined && userId) {
          let cartRes = res.payload as CartOrderedPropsData[];
          const cartIds: string[] = cartRes.map((c) => c.$id);
          if (
            transaction &&
            transaction.$id &&
            shippingDetail &&
            shippingDetail.$id &&
            cartIds.length > 0
          ) {
            const order: OrderProps = {
              cart: cartIds,
              userId,
              transaction: {
                amount: transaction.amount,
                customerName: transaction.customerName,
                imageUrl: transaction.imageUrl,
                payerId: transaction.payerId,
                payMethod: transaction.payMethod,
                productName: transaction.productName,
                productQty: transaction.productQty,
                shippingId: transaction.shippingId,
                shippingStatus: transaction.shippingStatus,
                shippingType: transaction.shippingType,
                status: transaction.status,
                transactionId: transaction.transactionId,
                transactionRef: transaction.transactionRef,
                createdAt: transaction.createdAt,
              },
              shippingDetails: shippingDetail,
            };

            dispatch(postOrder(order)).then((res) => {
              console.log('stage 4');
              let response = res.payload as AllOrderResultData;
              if (
                response &&
                response.transaction &&
                response.cart &&
                response.shippingDetails
              ) {

                setPaymentProcessing(false);
                // reduce stock quantity
                cartRes.forEach((c) => {
                  let qty = c.quantity;
                  const productId = c.productId;
                  let productStockUpdataData: UpdateProductCart = {
                    qty,
                    productId,
                  };
                  dispatch(
                    updateProductStockQuantity(productStockUpdataData)
                  ).then(() => {
                    
                   hotDealsNum.forEach((h) => {
                     let hotDealData: UpdatedHotProductProps = {isHotDeal: h.isHotDeal, productId: h.productId};
                     dispatch(updateHotProductNum(hotDealData)).then(() => {
                        const orderNotificationData: NotificationProps = {
                          message: `${firstName} ${lastName} has ordered ${cart.length} item${cart.length > 1 ? 's': ''}, waiting to be delivered. order id ${response.$id}`,
                          notificationType: 'order',
                        }
                        const transactionNotificationData: NotificationProps = {
                          message: `A sum of ₦${total} was paid by ${firstName} ${lastName} from ${response.transaction.payMethod} conatining ${cart.length} item${cart.length > 1 ? 's': ''}, waiting to be review.`,
                          notificationType: 'transaction',
                        }
                        dispatch(createNotification(orderNotificationData)).then(() => {
                          dispatch(createNotification(transactionNotificationData)).then(() => {
                            dispatch(removeAllItemsInCart());
                            navigate(`/payment_status/${userId}/${response.$id}`);
                          })
                        })
                     })
                   })

                   
                  });
                });
              }
            });
          }
        }
      });
    });
  }


  const [firstName, setFirstName] = useState<string>(
    user && user.firstName ? user.firstName : ""
  );
  const [lastName, setLastName] = useState<string>(
    user && user.lastName ? user.lastName : ""
  );

  useEffect(() => {
    userId &&
      hasPreviousShippingDetails === false &&
      dispatch(getShippingDetails(userId));
  }, [hasPreviousShippingDetails, shippingDetail]);

  const [phone, setPhone] = useState<string>(
    shippingDetail && shippingDetail && shippingDetail.phoneNumber
      ? shippingDetail.phoneNumber
      : ""
  );
  const [country, setCountry] = useState<string>(
    shippingDetail && shippingDetail && shippingDetail.country
      ? shippingDetail.country
      : "Nigeria"
  );
  const [state, setState] = useState<string>(
    shippingDetail && shippingDetail && shippingDetail.state
      ? shippingDetail.state
      : ""
  );
  const [lga, setLga] = useState<string>(
    shippingDetail && shippingDetail && shippingDetail.lga
      ? shippingDetail.lga
      : ""
  );
  const [zipcode, setZipcode] = useState<string>(
    shippingDetail && shippingDetail && shippingDetail.zipcode
      ? shippingDetail.zipcode
      : ""
  );
  const [address, setAddress] = useState<string>(
    shippingDetail && shippingDetail && shippingDetail.address
      ? shippingDetail.address
      : ""
  );
  const [showUpdateShippingDetails, setShowUpdateShippingDetails] =
    useState<boolean>(true);
  const [paymentIndex, setPaymentIndex] = useState<number>(0);
  const [deliveryIndex, setdeliveryIndex] = useState<number>(0);

  const setPaymentMethodIndex = (index: number) => {
    setPaymentIndex(index);
  };
  const setDeliveryMethodIndex = (index: number) => {
    setdeliveryIndex(index);
  };

  const shouldUpdateShippingDetails = () => {
    let s = shippingDetail && shippingDetail;
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

  // icon displaying the payment icon and text
  const IconLists = [
    { icon: PaystackLogo, name: "Pay Stack" },
    { icon: Flutterwave, name: "Flutterwave" },
  ];
  // icon displaying the delivery text and images

  const ImgLists = [
    { img: glovo, name: "Glovo" },
    { img: chowDesk, name: "Chow Deck" },
    { img: gokada, name: "Gokada" },
    { img: errand360, name: "Errand360" },
  ];
  // using to show lists of countries, nigerian state and its respective lga
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

  
 const makePaymentThroughPayStack = () => {
   const popup = new Paystack()
 popup.checkout({
   key: import.meta.env.VITE_PAYSTACK_TEST_PUBLIC_KEY,
   email: user && user.email,
   amount: total * 100,
   // handle successful transaction
    onSuccess: (reference: PayStackProps) => {
     let images: string[] = [];
     cart.forEach((c) => {
       images.push(c.item.imagesUrl[0]);
     });
     let productNames: string[] = [];
     cart.forEach((c) => {
       productNames.push(c.item.name);
     });
     let productQtys: string[] = [];
     cart.forEach((c) => {
       productQtys.push(String(c.qty));
     });
 
     let hotDealsNum: UpdatedHotProductProps[] = [];
    //  cart.forEach((c: ) => {
    //   console.log('ccc ', c)
    //   if(c && c.item && c.item.$id  && c.item.isHotDeal  && c.item.isHotDeal >= 0){
    //     hotDealsNum.push({isHotDeal: c.item.isHotDeal, productId: c.item.$id });
    //   }
    //  });
    cart.forEach((c) => {
      if (c?.item?.$id !== undefined && c.item.isHotDeal !== undefined) {
        hotDealsNum.push({
          isHotDeal: c.item.isHotDeal, // can be 0 or any number
          productId: c.item.$id,
        });
      }
    });

 console.log('hotDealsNum ', hotDealsNum, cart)
     setPaymentProcessing(true);
     if (userId) {
       const transactionDetails: TransactionProps = {
         amount: total,
         payerId: userId,
         status: reference.status,
         transactionId: reference.transaction,
         transactionRef: reference.trxref,
         payMethod: "Paystack",
         customerName: `${user && user.firstName} ${user && user.lastName}`,
         imageUrl: images,
         productName: productNames,
         productQty: productQtys,
         shippingId: `SHIP${generateRandomCode()}`,
         shippingStatus: "Pending",
         shippingType:
           deliveryIndex === 0
             ? "Glovo"
             : deliveryIndex === 1
               ? "ChowDesk"
               : deliveryIndex === 2
                 ? "Gokada"
                 : "Errand360",
       };
 
       // dispatch the transaction
       dispatch(postTransaction(transactionDetails)).then(() => {

      // dispatch the cart
      dispatch(postACart(cart)).then((res) => {

        // dispatch the order
        if (res.payload !== undefined && userId) {
          let cartRes = res.payload as CartOrderedPropsData[];
          const cartIds: string[] = cartRes.map((c) => c.$id);
          if (
            transaction &&
            transaction.$id &&
            shippingDetail &&
            shippingDetail.$id &&
            cartIds.length > 0
          ) {
            const order: OrderProps = {
              cart: cartIds,
              userId,
              transaction: {
                amount: transaction.amount,
                customerName: transaction.customerName,
                imageUrl: transaction.imageUrl,
                payerId: transaction.payerId,
                payMethod: transaction.payMethod,
                productName: transaction.productName,
                productQty: transaction.productQty,
                shippingId: transaction.shippingId,
                shippingStatus: transaction.shippingStatus,
                shippingType: transaction.shippingType,
                status: transaction.status,
                transactionId: transaction.transactionId,
                transactionRef: transaction.transactionRef,
                createdAt: transaction.createdAt,
              },
              shippingDetails: shippingDetail,
            };

            dispatch(postOrder(order)).then((res) => {
              console.log('stage 4');
              let response = res.payload as AllOrderResultData;
                  console.log('stage 4 response ', response);
              if (
                response &&
                response.transaction &&
                response.cart &&
                response.shippingDetails
              ) {

                
                // reduce stock quantity
                cartRes.forEach((c) => {
                  let qty = c.quantity;
                  const productId = c.productId;
                  let productStockUpdataData: UpdateProductCart = {
                    qty,
                    productId,
                  };
                  dispatch(
                    updateProductStockQuantity(productStockUpdataData)
                  ).then((res) => {
                    console.log('productStockUpdataData ', res, hotDealsNum);
                   hotDealsNum.forEach((h) => {
                     let hotDealData: UpdatedHotProductProps = {isHotDeal: h.isHotDeal, productId: h.productId};
                     dispatch(updateHotProductNum(hotDealData)).then(() => {
                        const orderNotificationData: NotificationProps = {
                          message: `${firstName} ${lastName} has ordered ${cart.length} item${cart.length > 1 ? 's': ''}, waiting to be delivered. order id ${response.$id}`,
                          notificationType: 'order',
                        }
                        const transactionNotificationData: NotificationProps = {
                          message: `A sum of ₦${total} was paid by ${firstName} ${lastName} from ${response.transaction.payMethod} conatining ${cart.length} item${cart.length > 1 ? 's': ''}, waiting to be review.`,
                          notificationType: 'transaction',
                        }
                        dispatch(createNotification(orderNotificationData)).then(() => {
                          dispatch(createNotification(transactionNotificationData)).then(() => {
                            dispatch(removeAllItemsInCart());
                            navigate(`/payment_status/${userId}/${response.$id}`);
                            setPaymentProcessing(false);
                          })
                        })
                     })
                   })

                   
                  });
                });
              }
            });
          }
        }
      });
    });
    
     }
   },
   onLoad: () => {
   },
   onCancel: () => {
     setPaymentProcessing(false);
   },
   onError: () => {
     setPaymentProcessing(false);
   }
 })
 }

  // initialize payment with flutter wave
  const makePaymentThroughFlutterWave = async () => {
    await loadFlutterwaveScript();
    setPaymentProcessing(true);
    // @ts-ignore: TS doesn't know FlutterwaveCheckout is on window
    window.FlutterwaveCheckout({
      public_key: import.meta.env.VITE_FLUTTER_PUBLIC_KEY,
      tx_ref: "Tx-" + Date.now().toString(),
      amount: total,
      currency: "NGN",
      customer: {
        email: user && user.email,
        phone_number: shippingDetail && shippingDetail.phoneNumber,
        name:
          user &&
          user.firstName &&
          user.lastName &&
          `${user.firstName} ${user.lastName}`,
      },
      customizations: {
        title: "Chimark Pharma",
        description: "Payment",
        logo: CompanyIcon,
      },
      callback: function (response: FlutterWaveDataProps) {
        let images: string[] = [];
        cart.forEach((c) => {
          images.push(c.item.imagesUrl[0]);
        });
        let productNames: string[] = [];
        cart.forEach((c) => {
          productNames.push(c.item.name);
        });
        let productQtys: string[] = [];
        cart.forEach((c) => {
          productQtys.push(String(c.qty));
        });

        let hotDealsNum: UpdatedHotProductProps[] = [];
        // cart.forEach((c) => {
        // c && c.item && c.item.$id && c.item.isHotDeal && hotDealsNum.push({isHotDeal: c.item.isHotDeal, productId: c.item.$id });
        // });

         cart.forEach((c) => {
            if (c?.item?.$id !== undefined && c.item.isHotDeal !== undefined) {
              hotDealsNum.push({
                isHotDeal: c.item.isHotDeal, // can be 0 or any number
                productId: c.item.$id,
              });
            }
          });
            console.log(' cvcv ',  hotDealsNum, cart)
        if (userId) {
          let transactionDetails: TransactionProps = {
            transactionId: String(response.transaction_id),
            amount: response.amount,
            payerId: userId,
            status: response.status,
            transactionRef: response.tx_ref,
            payMethod: "Flutterwave",
            customerName: `${user && user.firstName} ${user && user.lastName}`,
            imageUrl: images,
            productName: productNames,
            productQty: productQtys,
            shippingId: `SHIP${generateRandomCode()}`,
            shippingStatus: "Pending",
            shippingType:
              deliveryIndex === 0
                ? "Glovo"
                : deliveryIndex === 1
                  ? "ChowDesk"
                  : deliveryIndex === 2
                    ? "Gokada"
                    : "Errand360",
          };

            // dispatch the transaction
            dispatch(postTransaction(transactionDetails)).then(() => {

      // dispatch the cart
      dispatch(postACart(cart)).then((res) => {

        // dispatch the order
        if (res.payload !== undefined && userId) {
          let cartRes = res.payload as CartOrderedPropsData[];
          const cartIds: string[] = cartRes.map((c) => c.$id);
          if (
            transaction &&
            transaction.$id &&
            shippingDetail &&
            shippingDetail.$id &&
            cartIds.length > 0
          ) {
            const order: OrderProps = {
              cart: cartIds,
              userId,
              transaction: {
                amount: transaction.amount,
                customerName: transaction.customerName,
                imageUrl: transaction.imageUrl,
                payerId: transaction.payerId,
                payMethod: transaction.payMethod,
                productName: transaction.productName,
                productQty: transaction.productQty,
                shippingId: transaction.shippingId,
                shippingStatus: transaction.shippingStatus,
                shippingType: transaction.shippingType,
                status: transaction.status,
                transactionId: transaction.transactionId,
                transactionRef: transaction.transactionRef,
                createdAt: transaction.createdAt,
              },
              shippingDetails: shippingDetail,
            };

            dispatch(postOrder(order)).then((res) => {
              console.log('stage 4');
              let response = res.payload as AllOrderResultData;
              if (
                response &&
                response.transaction &&
                response.cart &&
                response.shippingDetails
              ) {

                
                // reduce stock quantity
                cartRes.forEach((c) => {
                  let qty = c.quantity;
                  const productId = c.productId;
                  let productStockUpdataData: UpdateProductCart = {
                    qty,
                    productId,
                  };
                  dispatch(
                    updateProductStockQuantity(productStockUpdataData)
                  ).then(() => {
                    
                   hotDealsNum.forEach((h) => {
                     let hotDealData: UpdatedHotProductProps = {isHotDeal: h.isHotDeal, productId: h.productId};
                     dispatch(updateHotProductNum(hotDealData)).then(() => {
                        const orderNotificationData: NotificationProps = {
                          message: `${firstName} ${lastName} has ordered ${cart.length} item${cart.length > 1 ? 's': ''}, waiting to be delivered. order id ${response.$id}`,
                          notificationType: 'order',
                        }
                        const transactionNotificationData: NotificationProps = {
                          message: `A sum of ₦${total} was paid by ${firstName} ${lastName} from ${response.transaction.payMethod} conatining ${cart.length} item${cart.length > 1 ? 's': ''}, waiting to be review.`,
                          notificationType: 'transaction',
                        }
                        dispatch(createNotification(orderNotificationData)).then(() => {
                          dispatch(createNotification(transactionNotificationData)).then(() => {
                            dispatch(removeAllItemsInCart());
                            navigate(`/payment_status/${userId}/${response.$id}`);
                            setPaymentProcessing(false);
                          })
                        })
                     })
                   })

                   
                  });
                });
              }
            });
          }
        }
      });
    });
          
        }
      },
      onclose: function () {
        setPaymentProcessing(false);
      },
    });
  };

  
    useEffect(() => {
      // start the page from the top when a user visit the page
      window.scrollTo(0,0)
    },[])

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      cart &&
      Array.isArray(cart) &&
      cart.length >= 1 &&
      shippingDetail &&
      shippingDetail.$id
    ) {
      switch (paymentIndex) {
        case 0:
          makePaymentThroughPayStack();
          break;
        case 1:
          makePaymentThroughFlutterWave();
          break;
      }
    }
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
    if (userId && typeof shippingID === "string" && shippingID.length > 0) {
      const shippingDetails: ShippingDetailsProps = {
        userId: userId,
        phoneNumber: phone,
        country,
        state,
        lga,
        zipcode,
        address,
        fullname: `${firstName} ${lastName}`,
        email: user && user.email,
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
          if(profileToCheckOut === "yes"){
            dispatch(toggleProfileTocheckOut('no'));
            if(user && user.userId)dispatch(getShippingDetails(user.userId));
            navigate(`/profile/${user.$id}`);
          }
      });
    }
    // create shipping address
    if (userId && typeof shippingID === "object") {
      const shippingDetails: ShippingDetailsProps = {
        userId: userId,
        phoneNumber: phone,
        country,
        state,
        lga,
        zipcode,
        address,
        fullname: `${firstName} ${lastName}`,
        email: user && user.email,
      };
      dispatch(postShippingDetails(shippingDetails)).then((res) => {

        res &&
          res.payload &&
          res.payload !== undefined &&
          setShowUpdateShippingDetails(false);
          if(profileToCheckOut === "yes"){
            if(user && user.userId)dispatch(getShippingDetails(user.userId));
            navigate(`/profile/${user.$id}`);
            dispatch(toggleProfileTocheckOut('no'));
          }
      });
    }
  };

  const handleResetShippingAddress = () => {
    dispatch(resetShippingDetails());
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
              {shippingDetail && shippingDetail.$id ? (
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
                          handleShippingDetails(
                            shippingDetail && shippingDetail.$id
                          );
                      }}
                    />
                  ) : (
                    <div className="flex gap-4 items-center">
                      <div className="bg-green-500/30 p-2 rounded-lg flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <CustomText
                          text="Shipping Details Up To Date"
                          color="text-green-500"
                        />
                      </div>

                      <div
                        onClick={handleResetShippingAddress}
                        className="bg-red-500/30 p-2 rounded-lg flex items-center gap-2 cursor-pointer"
                      >
                        <Reset className="w-4 h-4 text-red-500" />
                        <CustomText
                          text="Reset Shipping Details"
                          color="text-red-500"
                        />
                      </div>
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

       { profileToCheckOut === 'no' && (   
        <>
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
            {/* Delivery method  */}
            <div className="bg-white rounded-xl py-4">
              <CustomText
                text="Choose Delivery Method"
                textType="medium"
                weightType="semibold"
                extraStyle="my-2"
              />
              <CustomText
                text="We Offer the best delivery services across Nigeria."
                textType="small"
                weightType="normal"
                extraStyle="my-2"
                color="text-gray-500"
              />
              <div className="flex gap-2 items-center overflow-x-auto">
                {ImgLists.map((Item, index) => (
                  <div onClick={() => setDeliveryMethodIndex(index)}>
                    <DeliveryOption
                      img={Item}
                      active={deliveryIndex === index}
                    />
                  </div>
                ))}
              </div>

              <Modal
                isOpen={paymentProcessing}
                nowhiteBg={true}
                onClose={() => {}}
                children={
                  <div>
                    <Spinner className="w-24 h-24 text-white" />
                  </div>
                }
              />
            </div>
          </div>
          {/* payment method  */}
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
                  <PaymentOption Item={Item} active={paymentIndex === index} />
                </div>
              ))}
            </div>

            <Modal
              isOpen={paymentProcessing}
              nowhiteBg={true}
              onClose={() => {}}
              children={
                <div>
                  <Spinner className="w-24 h-24 text-white" />
                </div>
              }
            />
          </div>
          </>
        )
          }
        </div>
      </section>

   {profileToCheckOut === 'no' &&  <Cart isCheckOutPage={true} showCheckOutBtn={false} />}
    </form>
  );
};

export default CheckOut;
