import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { fetchAllPrescriptions,  selectproductAdmin, totalPrescriptionPages } from '../../../features/admin/product/productSlice';
import CustomText from '../../common/Text';
import Table from '../../common/Table';
import { allPrescriptionColumn } from '../../../utils/admin/product/productList';
import { PrescriptionTableProps } from '../../../types/product/ProductData';
import { mappedPrescription } from '../../../utils/admin/product/productMap';
import TableSkeleton from '../../common/animations/TableSkeleton';

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
             <div className="flex items-center gap-2 my-2"> 
                {
                  totalPrescriptionPage > 1 && Array.from({length : totalPrescriptionPage}, (_, i) => (
                    <div
                    className={`border  ${curPage === i ? 'bg-black text-white border-black' : 'border-gray-300' } rounded-lg py-2 px-3 text-[12px] flex justify-center items-center cursor-pointer hover:bg-black hover:text-white`}
                    onClick={() => {
                      handlePageClicked(i);
                    }}
                  >
                    {i + 1}
                  </div>
                  ))
                }
              </div>
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