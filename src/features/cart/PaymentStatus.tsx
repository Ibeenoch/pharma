import CustomText from "../../components/common/Text";
import successImg from "../../assets/images/successpay.png";
import sadImg from "../../assets/images/sadness.png";
import TrackIcon from "../../components/cart/TrackIcon";
import CheckMark from "../../components/cart/CheckMark";
import CustomButton from "../../components/common/Button";
import Exclamation from "../../assets/icons/exclamation-mark.svg?react";
import { useState } from "react";

const PaymentStatus = () => {
  const [isSucessfully, setIsSucessfully] = useState<boolean>(true);
  return (
    <section className="md:grid md:grid-cols-2 mt-20 md:mt-0 items-center h-screen">
      <div className="mx-auto flex justify-center">
        <img
          src={isSucessfully ? successImg : sadImg}
          alt="profile full image"
          className={`w-3/5 lg:h-full`}
        />
      </div>

      <div className="mx-auto p-3">
        <div className="flex justify-center items-center gap-3 ">
          {isSucessfully ? (
            <CheckMark containerSize={8} iconSize={5} />
          ) : (
            <div
              className={`w-9 h-9 rounded-full bg-red-500 p-2 flex justify-center items-center`}
            >
              <Exclamation className={`w-5 h-5`} />
            </div>
          )}
          <CustomText
            text={`Payment ${isSucessfully ? "Successful" : "Failed"} `}
            textType="large"
            weightType="semibold"
            extraStyle="my-2"
          />
        </div>
        <CustomText
          text={`Order Number #AE5r78Fr9p08fty `}
          textType="normal"
          weightType="semibold"
          extraStyle="mb-4 text-center"
        />
        <CustomText
          text={`${
            isSucessfully
              ? "Your payment was successful, your order has been successfully placed and is been process for delivery."
              : "Sorry, we could not process your payment! something unexpected happened."
          }`}
          textType="small"
          weightType="thin"
          extraStyle="text-gray-500 text-center px-4"
        />
        <div className="mx-auto">{isSucessfully && <TrackIcon />}</div>

        <div
          className={` ${
            isSucessfully ? "justify-around" : "justify-center"
          } flex items-center mt-4`}
        >
          <CustomButton
            text="Continue Shopping"
            type="button"
            borderRadiusType="threecurved"
          />
          {isSucessfully && (
            <CustomButton
              text="Track Order"
              type="button"
              showArrow={true}
              borderRadiusType="threecurved"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default PaymentStatus;
