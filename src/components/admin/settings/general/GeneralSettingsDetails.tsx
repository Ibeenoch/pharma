import {
  adminDefaultBgColor,
  lightgrayBgColor,
} from "../../../../constants/appColor";
import { generalSettingsTabList } from "../../../../utils/admin/settings/settingsList";
import CustomText from "../../../common/Text";
import NavTab from "../../NavTab";
import Add from "../../../../assets/icons/plus-slim.svg?react";
import CustomInput from "../../../common/Input";
import { useState } from "react";
import Modal from "../../../common/Modal";
import UpdateCard from "./UpdateCard";

const GeneralSettingsDetails = () => {
  const [cardName, setCardName] = useState<string>("");
  const [cardExpiryDate, setCardExpiryDate] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardcvv, setCardcvv] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [error, setError] = useState<{
    cardName?: string;
    cardExpiryDate?: string;
    cardNumber?: string;
    cardcvv?: string;
  }>({});

  const handleCardUpdate = () => {};
  function handleOrderTabs(index: number): void {
    throw new Error("Function not implemented.");
  }

  const showupdateCardDetails = () => {
    setShowModal(true);
  };
  const hideupdateCardDetails = () => {
    setShowModal(false);
  };

  return (
    <main className={`md:mt-12 mt-20 ${adminDefaultBgColor}`}>
      <div className="flex flex-col md:flex-row p-4 items-center justify-between">
        <NavTab
          handleTabclicked={handleOrderTabs}
          indexClicked={0}
          // indexClicked={adminOrdertabIndex}
          navLists={generalSettingsTabList}
        />
      </div>

      <div className={` mx-auto w-full ${adminDefaultBgColor}`}>
        <section className={`${lightgrayBgColor} p-4 rounded-xl mb-3  pb-8`}>
          <CustomText
            text="Payment Method"
            textType="normal"
            weightType="semibold"
            extraStyle="my-1"
          />
          <CustomText
            text="Update your billing details"
            textType="small"
            color="text-gray-500"
            extraStyle="my-1 pb-4 border-b border-gray-300"
          />

          <div className="grid grid-cols-2 ">
            <div>
              <CustomText
                text="Card Details"
                textType="normal"
                weightType="semibold"
                extraStyle="my-1"
              />
              <CustomText
                text="Update your card details"
                textType="small"
                color="text-gray-500"
                extraStyle="my-2"
              />
              <div
                onClick={showupdateCardDetails}
                className="flex items-center gap-1 px-2 py-1 rounded-xl border border-gray-300 w-max"
              >
                <Add className="w-3 h-3 text-gray-500" />
                <CustomText
                  text="Add another card"
                  textType="small"
                  color="text-gray-500"
                />
              </div>
            </div>
            <div>
              <div className="flex gap-2 items-center">
                <CustomInput
                  label="Card Name"
                  labelStyle="text-gray-500 text-xs"
                  roundedBorder={true}
                  onChange={setCardName}
                  showborder={false}
                  value={"Adewale bolaji"}
                  type="text"
                  disabled={true}
                  showFullWidth={true}
                />
                <CustomInput
                  label="Card Expiration"
                  labelStyle="text-gray-500 text-xs"
                  roundedBorder={true}
                  onChange={setCardExpiryDate}
                  showborder={false}
                  value={"03/29"}
                  type="text"
                  disabled={true}
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
                  value={"3454 7812 0990 4434"}
                  type="text"
                  disabled={true}
                  showFullWidth={true}
                />
                <CustomInput
                  label="cvv"
                  labelStyle="text-gray-500 text-xs"
                  roundedBorder={true}
                  onChange={setCardExpiryDate}
                  showborder={false}
                  value={"***"}
                  type="text"
                  disabled={true}
                  isPassword={true}
                  showFullWidth={true}
                />
              </div>
            </div>
          </div>
          {showModal && (
            <Modal
              isOpen={showModal}
              onClose={hideupdateCardDetails}
              children={<UpdateCard />}
            />
          )}
        </section>
      </div>
    </main>
  );
};

export default GeneralSettingsDetails;
