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
import { useNavigate } from "react-router-dom";
import CustomText from "../../common/Text";

const AllProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector(selectAuth);
  const { productAdmin, hasFetchAllProduct, productIndexClicked } =
    useAppSelector(selectproductAdmin);

  useEffect(() => {
    user &&
      user.userId &&
      hasFetchAllProduct === false &&
      dispatch(fetchAllUserProduct(user.userId));
  }, []);

  const productData =
    productAdmin && Array.isArray(productAdmin)
      ? mapProductToTableData(productAdmin)
      : [];

  const editProduct = (id: string) => {
    navigate(`/admin/product/update/${id}`);
  };

  const deleteProduct = (id: string) => {
    console.log("delete ", id);
  };

  return (
    <section>
      <div className="p-4 my-3 bg-white rounded-xl">
        {productAdmin && Array.isArray(productAdmin) ? (
          <Table
            columns={allproductColumn}
            data={productData}
            tableHeaderTxtColor="text-gray-400"
            onEdit={() => editProduct(productIndexClicked)}
            onDelete={() => deleteProduct(productIndexClicked)}
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
