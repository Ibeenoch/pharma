import Table from "../../common/Table";
import {
  orderLists,
  orderListsColumn,
} from "../../../utils/admin/order/orderLists";

const ActiveOrder = () => {
  const filteredOrder = orderLists.filter(
    (item) => item.status === "Processing" || item.status === "Shipped"
  );
  return (
    <section>
      <div className="p-4 my-3 bg-white rounded-xl">
        <Table
          columns={orderListsColumn}
          data={filteredOrder}
          tableHeaderTxtColor="text-gray-400"
        />
      </div>
    </section>
  );
};

export default ActiveOrder;
