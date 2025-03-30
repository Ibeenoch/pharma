import CustomText from "../../components/common/Text";
import CustomInput from "../../components/common/Input";
import { useState } from "react";
import CustomButton from "../../components/common/Button";
import Table from "../../components/common/Table";
import { orderColumns, orderRowsData } from "../../utils/orders/order";

const OrderHistory = () => {
  const [started, setStarted] = useState<string>("");
  const [ended, setEnded] = useState<string>("");

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
            text="All Orders(20)"
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
        data={orderRowsData}
        tableHeaderBg="bg-white"
        tableHeaderTxtColor="text-black"
      />
      {/* <div className="w-full overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="overflow-x-auto">
            <tr className="border border-gray-300 ">
              <th className={`text-[10px] sm:text-[14px] p-2 `}>ID</th>
              <th className={`text-[10px] sm:text-[14px] p-2 `}>Product Qty</th>
              <th className={`text-[10px] sm:text-[14px] p-2 `}>
                Payment Method
              </th>
              <th className={`text-[10px] sm:text-[14px] p-2 `}>Status</th>
              <th className={`text-[10px] sm:text-[14px] p-2 `}>Total</th>
              <th className={`text-[10px] sm:text-[14px] p-2 `}>Actions</th>
            </tr>
          </thead>
          <tbody className="overflow-x-auto">
            {tableData.map((order, index) => (
              <tr className="border-b pb-2 border-gray-300">
                <th className="text-sm text-black font-medium p-4">
                  {order.id}
                </th>
                <th className="text-sm text-black font-medium p-4">
                  {order.qty}
                </th>
                <th className="text-sm text-black font-medium p-4">
                  {order.paymentMethod}
                </th>
                <th
                  className={`text-sm ${
                    order && order.status === "Pending"
                      ? "text-amber-500"
                      : order.status === "Cancelled"
                      ? "text-red-500"
                      : order.status === "Delivered"
                      ? "text-[#45ce76]"
                      : ""
                  } font-medium p-4`}
                >
                  {order.status}
                </th>
                <th className="text-sm text-black font-medium p-4">
                  ${order.total}
                </th>
                <th className="text-sm text-black font-medium p-4 cursor-pointer hover:text-amber-500">
                  View Details
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}

      <CustomButton
        text="Show next 10 orders"
        showArrow={true}
        className="my-3"
      />
    </section>
  );
};

export default OrderHistory;
