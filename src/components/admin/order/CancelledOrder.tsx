import Table from "../../common/Table";
import {
  orderLists,
  orderListsColumn,
} from "../../../utils/admin/order/orderLists";
import CustomText from "../../common/Text";

const CancelledOrder = () => {
  const filteredOrder = orderLists.filter(
    (item) => item.status === "Cancelled"
  );
  return filteredOrder.length > 0 ? (
    <section>
      <div className="p-4 my-3 bg-white 
      rounded-xl">
        <Table
          columns={orderListsColumn}
          data={filteredOrder}
          tableHeaderTxtColor="text-gray-400"
        />
      </div>
    </section>
  ) : (
    <section className="flex justify-center items-center">
      <CustomText text="No Record Found" />
    </section>
  );
};

export default CancelledOrder;
