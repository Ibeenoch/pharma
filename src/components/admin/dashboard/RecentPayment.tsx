import {
  paymentColumns,
  recentPaymentData,
} from "../../../utils/admin/dashBoardLists";
import Table from "../../common/Table";
import CustomText from "../../common/Text";

const RecentPayment = () => {
  return (
    <div className="p-4 shadow-lg bg-neutral-50 rounded-xl my-3">
      <CustomText
        text="Recent Transactions"
        textType="medium"
        weightType="semibold"
        extraStyle="my-3"
      />

      <Table
        columns={paymentColumns}
        data={recentPaymentData}
        tableHeaderTxtColor="text-black"
      />
    </div>
  );
};

export default RecentPayment;
