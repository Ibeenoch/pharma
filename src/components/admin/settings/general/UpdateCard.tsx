import { useState } from "react";
import CustomText from "../../../common/Text";
import CustomInput from "../../../common/Input";
import { validator } from "../../../../utils/validator";
import CustomButton from "../../../common/Button";

const UpdateCard = () => {
  const [cardName, setCardName] = useState<string>("");
  const [cardExpiryDate, setCardExpiryDate] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardcvv, setCardcvv] = useState<string>("");

  return (
    <form>
      <CustomText
        text="Update Card Information"
        textType="normal"
        weightType="semibold"
        extraStyle="pt-4"
      />
      <div>
        <div className="flex gap-2 items-center">
          <CustomInput
            label="Card Name"
            labelStyle="text-gray-500 text-xs"
            roundedBorder={true}
            onChange={setCardName}
            showborder={false}
            value={cardName}
            type="text"
            showFullWidth={true}
            validate={(value) => validator(value, "others")}
            placeholder="Enter Card Name"
          />
          <CustomInput
            label="Card Expiration"
            labelStyle="text-gray-500 text-xs"
            roundedBorder={true}
            onChange={setCardExpiryDate}
            showborder={false}
            value={cardExpiryDate}
            type="date"
            validate={(value) => validator(value, "others")}
            showFullWidth={true}
          />
        </div>
        <div className="flex gap-2 items-center">
          <CustomInput
            label="Card Number"
            labelStyle="text-gray-500 text-xs"
            roundedBorder={true}
            onChange={setCardNumber}
            showborder={false}
            value={cardNumber}
            validate={(value) => validator(value, "others")}
            type="text"
            showFullWidth={true}
          />
          <CustomInput
            label="CVV"
            labelStyle="text-gray-500 text-xs"
            roundedBorder={true}
            onChange={setCardExpiryDate}
            showborder={false}
            value={cardcvv}
            type="text"
            showFullWidth={true}
            validate={(value) => validator(value, "others")}
          />
        </div>
        <CustomButton
          text="Update Card"
          showArrow={true}
          fullwidth={true}
          className=" my-3"
          borderRadiusType="threecurved"
        />
      </div>
    </form>
  );
};

export default UpdateCard;
