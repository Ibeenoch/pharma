import { lazy, useEffect, useState } from "react";
import { orderColumns,  } from "../../utils/orders/order";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getAllFilteredOrderByDate, getAllOrder, selectOrder } from "./orderSlice";
import { useParams } from "react-router-dom";
import { mapOrderHistory } from "../../utils/orders/orderHistoryMap";
import { OrderPaginatedArgs, OrderPaginatedFilteredArgs } from "../../types/order/OrderType";
const CustomText = lazy(() => import("../../components/common/Text"));
const CustomButton = lazy(() => import("../../components/common/Button"));
const Table = lazy(() => import("../../components/common/Table"));
const TableSkeleton = lazy(() => import("../../components/common/animations/TableSkeleton"));
const DateFilter = lazy(() => import("../../components/admin/DateFilter"));

const OrderHistory = () => {
  const [started, setStarted] = useState<string>("");
  const [ended, setEnded] = useState<string>("");
  const [pageNum, setPageNum] = useState<number>(0);
  const [curPage, setCurPage] = useState<number>(0);
    
    const handlePageClicked = (i: number) => {
      setCurPage(i)
      setPageNum(i)
    };
  const { orders, totalOrderPage, status } = useAppSelector(selectOrder);
  
  const dispatch = useAppDispatch();
  const { userId } = useParams();

  useEffect(() => {
    if (userId && pageNum >= 0) {
      const orderData: OrderPaginatedArgs = { userId, page: pageNum}
      dispatch(getAllOrder(orderData))
    }

  }, [pageNum]);

  const mappedOrder = orders && Array.isArray(orders) && orders.length > 0 ? mapOrderHistory(orders) : [];

  const handleOrderFilter = () => {
    if(!started || !ended) return;

    if(userId){
      setPageNum(0)
      const start = new Date(started).toISOString();
      const end = new Date(ended).toISOString();
      const data: OrderPaginatedFilteredArgs = { end, start, page: 0, userId}
      dispatch(getAllFilteredOrderByDate(data));
    }

  }

  return (
    <>
    {
      orders && Array.isArray(orders) && orders.length > 0 ? (
      <section className="mt-20 bg-white p-4">
        <CustomText
          text="Order History"
          textType="medium"
          weightType="semibold"
          extraStyle="mt-4"
        />

        <div className="md:flex md:justify-between my-3">
        <DateFilter setEnded={setEnded} setStarted={setStarted} applyCallback={handleOrderFilter} started={started} ended={ended} />

         
        </div>
       {
        status === 'loading' ? <TableSkeleton /> : (
          <>
            <Table
              columns={orderColumns}
              data={mappedOrder}
              tableHeaderTxtColor="text-black"
              whichTable="customerorder"
            />
            <div className="flex items-center gap-2 my-2"> 
                {
                  totalOrderPage > 1 && Array.from({length : totalOrderPage}, (_, i) => (
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
        )
       } 

       
      </section>
      ) : (
        <div className="flex justify-center items-center h-screen">
            <CustomText 
            text="No Order Found"
            textType="normal"
            weightType="medium"
            />
        </div>
      )
    }
    </>
  );
};

export default OrderHistory;
