import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { fetchAllPrescriptions, selectproductAdmin } from '../../../features/admin/product/productSlice';
import CustomText from '../../common/Text';
import Table from '../../common/Table';
import { allPrescriptionColumn } from '../../../utils/admin/product/productList';
import { PrescriptionTableProps } from '../../../types/product/ProductData';
import { mappedPrescription } from '../../../utils/admin/product/productMap';

const AllPrescription = () => {
  const dispatch = useAppDispatch();
  const { prescription, hasFetchAllPrescription } = useAppSelector(selectproductAdmin);

   useEffect(() => {
     if(!prescription){
       dispatch(fetchAllPrescriptions())
     }else{
       hasFetchAllPrescription === false && dispatch(fetchAllPrescriptions())
     }
   }, [prescription])

   const allPrescriptionData: PrescriptionTableProps[] = prescription && Array.isArray(prescription) ? mappedPrescription(prescription) : []

   return (
    <section className='mt-20'>
    <div className="p-4 my-3 bg-white rounded-xl">
      {prescription && Array.isArray(prescription) ? (
        <Table
          columns={allPrescriptionColumn}
          data={allPrescriptionData}
          tableHeaderTxtColor="text-gray-400"
          whichTable="prescription"
        />
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