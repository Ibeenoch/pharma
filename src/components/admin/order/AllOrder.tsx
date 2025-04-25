import Table from "../../common/Table";
import { orderListsColumn } from "../../../utils/admin/order/orderLists";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
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
} from "../../../types/order/OrderType";
import CustomText from "../../common/Text";
import TableSkeleton from "../../common/animations/TableSkeleton";
interface AllOrdersProps {
  whichType?:
    | "pending"
    | "cancelled"
    | "successful"
    | "failed"
    | "all"
    | "active";
}

const AllOrder: React.FC<AllOrdersProps> = ({ whichType = "all" }) => {
  const { orders, refreshOrder, totalOrderPage, status } =
    useAppSelector(selectOrder);
  const dispatch = useAppDispatch();
  const { userId } = useParams();
  const mappedOrder: mappedAllOrdersProps[] = orders && Array.isArray(orders) &&
    whichType === "all"
      ?  mappedAllOrders(orders)
      : whichType === "pending"
        ? mappedAllOrders(orders).filter(
            (m) => m.status.toLowerCase() === "pending"
          )
        : whichType === "cancelled"
          ? mappedAllOrders(orders).filter(
              (m) => m.status.toLowerCase() === "cancelled"
            )
          : whichType === "active"
            ? mappedAllOrders(orders).filter(
                (m) => m.status.toLowerCase() === "shipped"
              )
            : mappedAllOrders(orders).filter(
                (m) => m.status.toLowerCase() === "completed"
              );
  const [orderpaginationProps, setOrderPaginationProps] =
    useState<OrderPaginatedArgs>({ page: 1, userId: userId ?? "" });

  const handlePageClicked = (i: number, userId: string) => {
    dispatch(resetRefreshOrder());
    setOrderPaginationProps({ page: i, userId: userId });
  };

  console.log('userId ', userId, 'refreshOrder ', refreshOrder, 'orders ', orders)
  useEffect(() => {
    if (userId) {
      refreshOrder && dispatch(getAllOrder(orderpaginationProps));
      dispatch(totalOrderPages());
    }
  }, [refreshOrder, userId]);
  return (
    <>
      {mappedOrder && Array.isArray(mappedOrder) && mappedOrder.length > 0 ? (
        <>
          {status === "loading" ? (
            <TableSkeleton />
          ) : (
            <section>
              <div className="p-4 my-3 bg-white rounded-xl">
                <Table
                  columns={orderListsColumn}
                  data={mappedOrder}
                  tableHeaderTxtColor="text-gray-400"
                  whichTable="order"
                />
                <div className="flex items-center gap-2 my-2">
                  {totalOrderPage > 1 &&
                    Array.from({ length: totalOrderPage }, (_, i) => (
                      <div
                        className="border border-gray-300 rounded-lg py-2 px-3 text-[12px] flex justify-center items-center cursor-pointer hover:bg-black hover:text-white"
                        onClick={() => {
                          userId && handlePageClicked(i + 1, userId);
                        }}
                      >
                        {i + 1}
                      </div>
                    ))}
                </div>
              </div>
            </section>
          )}
        </>
      ) : (
        <section className="flex justify-center items-center">
          <CustomText text="No Record Found" />
        </section>
      )}
    </>
  );
};

export default AllOrder;
