import { recentPaymentData } from "../../../utils/admin/dashBoardLists";
import CustomText from "../../common/Text";

const RecentPayment = () => {
  return (
    <div className="bg-white p-4 rounded-xl my-3">
      <CustomText
        text="Payment History"
        textType="medium"
        weightType="semibold"
        extraStyle="my-3"
      />

      <div className="w-full overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="overflow-x-auto">
            <tr className="border border-gray-300 text-white  bg-[#ab7843]">
              <th className={`text-[10px] sm:text-[12px] font-light p-2 `}>
                Order ID
              </th>
              <th className={`text-[10px] sm:text-[12px] font-light p-2 `}>
                Customer Name
              </th>
              <th className={`text-[10px] sm:text-[12px] font-light p-2 `}>
                Date Paid
              </th>
              <th className={`text-[10px] sm:text-[12px] font-light p-2 `}>
                Payment Method
              </th>
              <th className={`text-[10px] sm:text-[12px] font-light p-2 `}>
                Price
              </th>
              <th className={`text-[10px] sm:text-[12px] font-light p-2 `}>
                Status
              </th>
            </tr>
          </thead>
          <tbody className="overflow-x-auto text-[8px]">
            {recentPaymentData.map((order) => (
              <tr className="border-b pb-2 border-gray-300">
                <th className="text-[12px] text-black font-medium p-4">
                  {order.order_id}
                </th>
                <th className="text-[12px] text-black font-medium p-4">
                  {order.customer_name}
                </th>
                <th className="text-[12px] text-black font-medium p-4">
                  {order.date}
                </th>
                <th className={`text-[12px]  font-medium p-4`}>
                  {order.payment_method}
                </th>
                <th className="text-[12px] text-black font-medium p-4">
                  {order.price}
                </th>
                <th
                  className={`text-[12px] text-black font-medium p-4 cursor-pointer ${
                    order && order.invoice === "Complete"
                      ? "text-green-500"
                      : order.invoice === "Pending"
                      ? "text-yellow-500"
                      : order.invoice === "Failed"
                      ? "text-red-500"
                      : ""
                  } `}
                >
                  {order.invoice}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentPayment;
