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

const PendingOrder = () => {
  const { orders, refreshOrder, totalOrderPage } = useAppSelector(selectOrder);
  const dispatch = useAppDispatch();
  const { userId } = useParams();
  const mappedOrder: mappedAllOrdersProps[] = mappedAllOrders(orders).filter(
    (c) => c.status?.toLowerCase() === "processing"
  );
  const [orderpaginationProps, setOrderPaginationProps] =
    useState<OrderPaginatedArgs>({ page: 0, userId: userId ?? "" });

  const handlePageClicked = (i: number, userId: string) => {
    dispatch(resetRefreshOrder());
    setOrderPaginationProps({ page: i, userId: userId });
  };

  useEffect(() => {
    if (userId) {
      dispatch(totalOrderPages());
      refreshOrder && dispatch(getAllOrder(orderpaginationProps));
    }
  }, [refreshOrder]);
  return mappedOrder.length > 0 ? (
    <section>
      <div className="p-4 my-3 bg-white rounded-xl">
        <Table
          columns={orderListsColumn}
          data={mappedOrder}
          tableHeaderTxtColor="text-gray-400"
          whichTable="order"
        />
        <div className="flex items-center gap-2 my-4">
          {Array.from(
            { length: mappedAllOrders.length < 10 ? 1 : totalOrderPage },
            (_, i) => (
              <div
                className="border border-gray-300 rounded-lg py-2 px-3 text-[12px] flex justify-center items-center cursor-pointer hover:bg-black hover:text-white"
                onClick={() => {
                  userId && handlePageClicked(i + 1, userId);
                }}
              >
                {i + 1}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  ) : (
    <section className="flex justify-center items-center">
      <CustomText text="No Record Found" />
    </section>
  );
};

export default PendingOrder;
