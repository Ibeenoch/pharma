import CustomText from "../../components/common/Text";
import successImg from "../../assets/images/successpay.png";
import sadImg from "../../assets/images/sadness.png";
import TrackIcon from "../../components/cart/TrackIcon";
import CheckMark from "../../components/cart/CheckMark";
import CustomButton from "../../components/common/Button";
import Exclamation from "../../assets/icons/exclamation-mark.svg?react";
import { useNavigate, useParams } from "react-router-dom";

const PaymentStatus = () => {
  const navigate = useNavigate();
  const { orderId, userId } = useParams();
  const handleTrackOrder = () => {
    navigate(`/order_tracking/${userId}/${orderId}`);
  };
  return (
    <section className="md:grid lg:grid-cols-2 mt-20 md:mt-0 items-center h-screen">
      <div className="mx-auto flex justify-center">
        <img
          src={orderId ? successImg : sadImg}
          alt="profile full image"
          className={`w-3/5 lg:h-full`}
        />
      </div>

      <div className="mx-auto p-3">
        <div className="flex justify-center items-center gap-3 ">
          {orderId ? (
            <CheckMark containerSize={8} iconSize={5} />
          ) : (
            <div
              className={`w-9 h-9 rounded-full bg-red-500 p-2 flex justify-center items-center`}
            >
              <Exclamation className={`w-5 h-5`} />
            </div>
          )}
          <CustomText
            text={`Payment ${orderId ? "Successful" : "Failed"} `}
            textType="large"
            weightType="semibold"
            extraStyle="my-2"
          />
        </div>
        <CustomText
          text={`Order Number #${orderId} `}
          textType="normal"
          weightType="semibold"
          extraStyle="mb-4 text-center"
        />
        <CustomText
          text={`${
            orderId
              ? "Your payment was successful, your order has been successfully placed and is been process for delivery."
              : "Sorry, we could not process your payment! something unexpected happened."
          }`}
          textType="small"
          weightType="thin"
          extraStyle="text-gray-500 text-center px-4"
        />
        <div className="mx-auto">{orderId && <TrackIcon />}</div>

        <div
          className={` ${
            orderId ? "justify-around" : "justify-center"
          } flex items-center gap-2 mt-4`}
        >
          <CustomButton
            text="Continue Shopping"
            type="button"
            textSize="small"
            borderRadiusType="threecurved"
            onClick={() => navigate("/")}
          />
          {orderId && (
            <CustomButton
              text="Track Order"
              type="button"
              textSize="small"
              showArrow={true}
              borderRadiusType="threecurved"
              onClick={handleTrackOrder}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default PaymentStatus;
