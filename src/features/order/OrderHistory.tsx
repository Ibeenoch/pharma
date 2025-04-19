import CustomText from "../../components/common/Text";
import CustomInput from "../../components/common/Input";
import { useEffect, useState } from "react";
import CustomButton from "../../components/common/Button";
import Table from "../../components/common/Table";
import { orderColumns, orderRowsData } from "../../utils/orders/order";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getAllOrder, selectOrder } from "./orderSlice";
import { useParams } from "react-router-dom";
import { mapOrderHistory } from "../../utils/orders/orderHistoryMap";

const OrderHistory = () => {
  const [started, setStarted] = useState<string>("");
  const [ended, setEnded] = useState<string>("");
  const { orders, refreshOrder } = useAppSelector(selectOrder);
  const dispatch = useAppDispatch();
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      dispatch(getAllOrder(userId));
    }
  }, [refreshOrder]);

  const mappedOrder = mapOrderHistory(orders);

  // ₦

  return (
    <section className="mt-20 bg-white p-4">
      <CustomText
        text="Order History"
        textType="medium"
        weightType="semibold"
        extraStyle="mt-4"
      />

      <div className="md:flex md:justify-between">
        <div className="flex items-center gap-6 overflow-x-auto">
          <CustomText
            text={`All Orders(${mappedOrder.length})`}
            textType="normal"
            weightType="semibold"
            color="text-amber-500"
            extraStyle="my-3"
          />
          <CustomText
            text="Pending(5)"
            textType="normal"
            weightType="semibold"
            color=""
            extraStyle="my-3"
          />
          <CustomText
            text="Completed(8)"
            textType="normal"
            weightType="semibold"
            color=""
            extraStyle="my-3"
          />
          <CustomText
            text="Cancelled(5)"
            textType="normal"
            weightType="semibold"
            color=""
            extraStyle="my-3"
          />
        </div>

        <div className="flex items-center gap-6 overflow-x-auto">
          <div className="flex gap-2 items-center">
            <CustomText
              text="Start"
              textType="small"
              weightType="semibold"
              extraStyle="text-gray-500"
            />
            <CustomInput
              value={started}
              onChange={setStarted}
              type="date"
              Id="started"
            />
          </div>
          <div className="flex gap-2 items-center">
            <CustomText
              text="End"
              textType="small"
              weightType="semibold"
              extraStyle="text-gray-500"
            />
            <CustomInput
              value={ended}
              onChange={setEnded}
              type="date"
              Id="ended"
            />
          </div>
        </div>
      </div>

      <Table
        columns={orderColumns}
        data={mappedOrder}
        tableHeaderBg="bg-white"
        tableHeaderTxtColor="text-black"
        whichTable="order"
      />

      <CustomButton
        text="Show next 10 orders"
        showArrow={true}
        className="my-3"
      />
    </section>
  );
};

export default OrderHistory;
