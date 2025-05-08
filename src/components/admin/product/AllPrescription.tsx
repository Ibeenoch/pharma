import { lazy, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { fetchAllPrescriptions,  selectproductAdmin, setProductSubTabIndex, totalPrescriptionPages } from '../../../features/admin/product/productSlice';
import { allPrescriptionColumn } from '../../../utils/admin/product/productList';
import { PrescriptionTableProps } from '../../../types/product/ProductData';
import { mappedPrescription } from '../../../utils/admin/product/productMap';
import { setTitleIndex } from '../../../features/admin/adminSlice';
const Pagination = lazy(() => import('../../Pagination'));
const TableSkeleton = lazy(() => import('../../common/animations/TableSkeleton'));
const CustomText = lazy(() => import('../../common/Text'));
const Table = lazy(() => import('../../common/Table'));

const AllPrescription = () => {
  const dispatch = useAppDispatch();
  const { prescription, status, totalPrescriptionPage } = useAppSelector(selectproductAdmin);
    const [pageNum, setPageNum] = useState<number>(0);
    const [curPage, setCurPage] = useState<number>(0);
    
    const handlePageClicked = (i: number) => {
      setCurPage(i)
      setPageNum(i)
    };
  

   useEffect(() => {
    dispatch(totalPrescriptionPages());
    dispatch(fetchAllPrescriptions(pageNum));
   }, [pageNum])

     useEffect(() => {
         dispatch(setTitleIndex(2)); // product
         dispatch(setProductSubTabIndex(2)); // all prescription
     }, [])

   const allPrescriptionData: PrescriptionTableProps[] = prescription && Array.isArray(prescription) ? mappedPrescription(prescription) : []

   return (
    <section className='mt-20'>
    <div className="p-4 my-3 bg-white rounded-xl">
      {prescription && Array.isArray(prescription) ? (
        <>
        { status === 'loading' ? (
          <>
          <TableSkeleton />
          </>
        ) : <> 
            <Table
              columns={allPrescriptionColumn}
              data={allPrescriptionData}
              tableHeaderTxtColor="text-gray-400"
              whichTable="prescription"
            />
            <Pagination currentPage={curPage} totalPages={totalPrescriptionPage} onPageChange={(i) => {
               handlePageClicked(i);
            }} />
          
              </>
              }
        </>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <CustomText text="No prescription has been added" />
        </div>
      )}
    </div>
  </section>
  )
}

export default AllPrescription