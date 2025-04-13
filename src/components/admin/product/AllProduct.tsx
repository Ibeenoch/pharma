import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { allproductColumn } from "../../../utils/admin/product/productList";
import Table from "../../common/Table";
import {
  fetchAllUserProduct,
  selectproductAdmin,
} from "../../../features/admin/product/productSlice";
import { selectAuth } from "../../../features/auth/authSlice";
import { mapProductToTableData } from "../../../utils/admin/product/productMap";
import CustomText from "../../common/Text";

const AllProduct = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const { productAdmin, hasFetchAllProduct } =
    useAppSelector(selectproductAdmin);

  useEffect(() => {
    user &&
      user.userId &&
      hasFetchAllProduct === false &&
      dispatch(fetchAllUserProduct(user.userId));
  }, [user, hasFetchAllProduct]);

  const productData =
    productAdmin && Array.isArray(productAdmin)
      ? mapProductToTableData(productAdmin)
      : [];

  return (
    <section>
      <div className="p-4 my-3 bg-white rounded-xl">
        {productAdmin && Array.isArray(productAdmin) ? (
          <Table
            columns={allproductColumn}
            data={productData}
            tableHeaderTxtColor="text-gray-400"
            whichTable="product"
          />
        ) : (
          <div className="flex items-center justify-center h-screen">
            <CustomText text="No Product has been added" />
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProduct;
