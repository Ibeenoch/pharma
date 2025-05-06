import Table from "../../common/Table";
import { orderListsColumn } from "../../../utils/admin/order/orderLists";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  getAllFilteredOrderByDate,
  getAllOrder,
  resetRefreshOrder,
  selectOrder,
  totalOrderPages,
} from "../../../features/order/orderSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { mappedAllOrders } from "../../../utils/orders/orderHistoryMap";
import {
  mappedAllOrdersProps,
  OrderPaginatedArgs,
  OrderPaginatedFilteredArgs,
} from "../../../types/order/OrderType";
import CustomText from "../../common/Text";
import TableSkeleton from "../../common/animations/TableSkeleton";
import Reset from '../../../assets/icons/reset.svg?react'
import DateFilter from "../DateFilter";
import Pagination from "../../Pagination";
interface AllOrdersProps {
  whichType?:
    | "Processing"
    | "Cancelled"
    | "Shipped"
    | "Delivered"
    | "all";
}

const AllOrder: React.FC<AllOrdersProps> = ({ whichType = "all" }) => {
  const { orders, totalOrderPage, status } =
    useAppSelector(selectOrder);
    const [started, setStarted] = useState<string>("");
    const [ended, setEnded] = useState<string>("");
    const [pageNum, setPageNum] = useState<number>(0);
    const [curPage, setCurPage] = useState<number>(0);
    const [resetPage, setResetPage] = useState<boolean>(false);

    const dispatch = useAppDispatch();
  const { userId } = useParams();
  const mappedOrder: mappedAllOrdersProps[] = orders && Array.isArray(orders) &&
    whichType === "all"
      ?  mappedAllOrders(orders)
      : whichType === "Processing"
        ? mappedAllOrders(orders).filter(
            (m) => m.status.toLowerCase() === "processing"
          )
        : whichType === "Cancelled"
          ? mappedAllOrders(orders).filter(
              (m) => m.status.toLowerCase() === "cancelled"
            )
        : whichType === "Delivered"
          ? mappedAllOrders(orders).filter(
              (m) => m.status.toLowerCase() === "delivered"
            )
            : mappedAllOrders(orders).filter(
                (m) => m.status.toLowerCase() === "delivered"
              );
  const [orderpaginationProps, setOrderPaginationProps] =
    useState<OrderPaginatedArgs>({ page: 0, userId: userId ?? "" });

  const handlePageClicked = (i: number, userId: string) => {
    dispatch(resetRefreshOrder());
    setPageNum(i)
    setCurPage(i)
    setOrderPaginationProps({ page: i, userId: userId });
  };

  useEffect(() => {
    if (userId) {
      dispatch(getAllOrder(orderpaginationProps));
      dispatch(totalOrderPages());
    }
  }, [ userId, pageNum]);

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
      {mappedOrder && Array.isArray(mappedOrder) && mappedOrder.length > 0 ? (
        <>
          {status === "loading" ? (
            <TableSkeleton />
          ) : (
            <section>
            <DateFilter setEnded={setEnded} setStarted={setStarted} applyCallback={handleOrderFilter} started={started} ended={ended} />

              <div className="p-4 my-3 bg-white rounded-xl">
                <Table
                  columns={orderListsColumn}
                  data={mappedOrder}
                  tableHeaderTxtColor="text-gray-400"
                  whichTable="order"
                />
                <Pagination currentPage={pageNum} totalPages={totalOrderPage} onPageChange={(i) => {
                  userId && handlePageClicked(i, userId);
                }} />
              
              </div>
            </section>
          )}
        </>
      ) : (
        <section className="flex justify-center h-screen items-center">
          <div>
          <CustomText text="No Record Found" />
          <div onClick={() => setResetPage(true)} className="flex p-2 my-4 items-center bg-amber-500/30 gap-1 rounded-md cursor-pointer w-max">
            <Reset className="w-4 h-4 text-amber-500" />
            <CustomText text="Reset" textType="normal" weightType="medium" color="text-amber-500" />
          </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AllOrder;
