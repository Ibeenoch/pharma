import { lazy, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { allproductColumn } from "../../../utils/admin/product/productList";
import {
  fetchAllUserProduct,
  invalidateFetchAllProductCache,
  selectproductAdmin,
  setProductSubTabIndex,
  totalProductPages,
} from "../../../features/admin/product/productSlice";
import { mapProductToTableData } from "../../../utils/admin/product/productMap";
import { setTitleIndex } from "../../../features/admin/adminSlice";
const Pagination = lazy(() => import('../../Pagination'));
const TableSkeleton = lazy(() => import('../../common/animations/TableSkeleton'));
const CustomText = lazy(() => import('../../common/Text'));
const Table = lazy(() => import('../../common/Table'));

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
      {
        status === 'loading' ? (
          <TableSkeleton />
        ) : (
          <div className="p-4 my-3 bg-white rounded-xl">
            {productAdmin && Array.isArray(productAdmin) && productAdmin.length > 0  ? (
              <div>
                  <Table
                    columns={allproductColumn}
                    data={productData}
                    tableHeaderTxtColor="text-gray-400"
                    whichTable="product"
                  />
                  <Pagination currentPage={curPage} totalPages={totalProductPage} onPageChange={(i) => {
                        handlePageClicked(i);
                  }} />
    
              
              </div>
            ) : (
              <div className="flex items-center justify-center h-screen">
                <CustomText text="No Product has been added" />
              </div>
            )}
          </div>
        )
      }
    </section>
  );
};

export default AllProduct;
