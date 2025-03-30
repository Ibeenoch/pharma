import {
  allproductColumn,
  allproductLists,
} from "../../../utils/admin/product/productList";
import Table from "../../common/Table";

const AllProduct = () => {
  return (
    <section>
      <div className="p-4 my-3 bg-white rounded-xl">
        <Table
          columns={allproductColumn}
          data={allproductLists}
          tableHeaderTxtColor="text-gray-400"
        />
      </div>
    </section>
  );
};

export default AllProduct;
