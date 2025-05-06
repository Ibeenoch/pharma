import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { allproductColumn } from "../../../utils/admin/product/productList";
import Table from "../../common/Table";
import {
  fetchAllUserProduct,
  invalidateFetchAllProductCache,
  selectproductAdmin,
  setProductSubTabIndex,
  totalProductPages,
} from "../../../features/admin/product/productSlice";
import { selectAuth } from "../../../features/auth/authSlice";
import { mapProductToTableData } from "../../../utils/admin/product/productMap";
import CustomText from "../../common/Text";
import TableSkeleton from "../../common/animations/TableSkeleton";
import Pagination from "../../Pagination";
import { current } from "@reduxjs/toolkit";
import { setTitleIndex } from "../../../features/admin/adminSlice";

const AllProduct = () => {
  const dispatch = useAppDispatch();
  const { productAdmin, hasFetchAllProduct, totalProductPage, status } =
    useAppSelector(selectproductAdmin);
  const [pageNum, setPageNum] = useState<number>(0);
  const [curPage, setCurPage] = useState<number>(0);
  
  const handlePageClicked = (i: number) => {
    dispatch(invalidateFetchAllProductCache(false))
    setCurPage(i)
    setPageNum(i)
  };

  useEffect(() => {
    dispatch(totalProductPages())
    if(!productAdmin){
      dispatch(fetchAllUserProduct(pageNum))
    };
    hasFetchAllProduct === false &&  dispatch(fetchAllUserProduct(pageNum));
  }, [pageNum, hasFetchAllProduct]);

  const productData =
    productAdmin && Array.isArray(productAdmin)
      ? mapProductToTableData(productAdmin)
      : [];
  
      useEffect(() => {
        // update the current tab color 
        dispatch(setTitleIndex(2)); // product
          dispatch(setProductSubTabIndex(0)); // all product
      }, [])
  return (
    <section>
      <div className="p-4 my-3 bg-white rounded-xl">
        {productAdmin && Array.isArray(productAdmin) ? (
          <div>
    {
       status === 'loading' ? <TableSkeleton /> :     (
            <>
              <Table
                columns={allproductColumn}
                data={productData}
                tableHeaderTxtColor="text-gray-400"
                whichTable="product"
              />
              <Pagination currentPage={curPage} totalPages={totalProductPage} onPageChange={(i) => {
                    handlePageClicked(i);
              }} />
            </>
            )}
          </div>
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
