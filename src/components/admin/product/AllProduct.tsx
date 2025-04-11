import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  allproductColumn,
  allproductLists,
} from "../../../utils/admin/product/productList";
import Table from "../../common/Table";
import { fetchAllUserProduct, selectproductAdmin } from "../../../features/admin/product/productSlice";
import { selectAuth } from "../../../features/auth/authSlice";
import { mapProductToTableData } from "../../../utils/admin/product/productMap";
import { useNavigate } from "react-router-dom";

const AllProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector(selectAuth);
  const { productAdmin, hasFetchAllProduct, productIndexClicked } = useAppSelector(selectproductAdmin);

  useEffect(() => {
    user && user.userId && hasFetchAllProduct === false && dispatch(fetchAllUserProduct(user.userId))
  }, [])

  const productData = mapProductToTableData(productAdmin)

  const editProduct = (id: string) => {
    navigate(`/admin/product/update/${id}`)
  }

  const deleteProduct = (id: string) => {
    console.log('delete ', id)
  }

  return (
    <section>
      <div className="p-4 my-3 bg-white rounded-xl">
        <Table
          columns={allproductColumn}
          data={productData}
          tableHeaderTxtColor="text-gray-400"
          onEdit={() =>editProduct(productIndexClicked)}
          onDelete={() =>deleteProduct(productIndexClicked)}
        />
      </div>
    </section>
  );
};

export default AllProduct;
