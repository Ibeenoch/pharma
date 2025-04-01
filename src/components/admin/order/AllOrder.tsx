import Table from "../../common/Table";
import {
  orderLists,
  orderListsColumn,
} from "../../../utils/admin/order/orderLists";

const AllOrder = () => {
  return (
    <section>
      <div className="p-4 my-3 bg-white rounded-xl">
        <Table
          columns={orderListsColumn}
          data={orderLists}
          tableHeaderTxtColor="text-gray-400"
        />
      </div>
    </section>
  );
};

export default AllOrder;
