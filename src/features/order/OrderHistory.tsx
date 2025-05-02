import CustomText from "../../components/common/Text";
import CustomInput from "../../components/common/Input";
import { useEffect, useState } from "react";
import CustomButton from "../../components/common/Button";
import Table from "../../components/common/Table";
import { orderColumns, orderRowsData } from "../../utils/orders/order";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getAllOrder, selectOrder } from "./orderSlice";
import { useParams } from "react-router-dom";
import { mapOrderHistory } from "../../utils/orders/orderHistoryMap";
import { OrderPaginatedArgs } from "../../types/order/OrderType";
import TableSkeleton from "../../components/common/animations/TableSkeleton";

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
    console.log('pageNum ', pageNum)
    if (userId && pageNum) {
      const orderData: OrderPaginatedArgs = { userId, page: pageNum}
      dispatch(getAllOrder(orderData)).then((res) => console.log('get order ', res.payload));
    }

  }, [pageNum]);

  const mappedOrder = orders && Array.isArray(orders) ? mapOrderHistory(orders) : [];

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

        <div className="md:flex md:justify-between">
          <div className="flex items-center gap-6 overflow-x-auto">
            <CustomText
              text={`All Orders(${mappedOrder.length})`}
              textType="normal"
              weightType="semibold"
              color="text-amber-500"
              extraStyle="my-3"
            />
            <CustomText
              text="Pending(5)"
              textType="normal"
              weightType="semibold"
              color=""
              extraStyle="my-3"
            />
            <CustomText
              text="Completed(8)"
              textType="normal"
              weightType="semibold"
              color=""
              extraStyle="my-3"
            />
            <CustomText
              text="Cancelled(5)"
              textType="normal"
              weightType="semibold"
              color=""
              extraStyle="my-3"
            />
          </div>

          <div className="flex items-center gap-6 overflow-x-auto">
            <div className="flex gap-2 items-center">
              <CustomText
                text="Start"
                textType="small"
                weightType="semibold"
                extraStyle="text-gray-500"
              />
              <CustomInput
                value={started}
                onChange={setStarted}
                type="date"
                Id="started"
              />
            </div>
            <div className="flex gap-2 items-center">
              <CustomText
                text="End"
                textType="small"
                weightType="semibold"
                extraStyle="text-gray-500"
              />
              <CustomInput
                value={ended}
                onChange={setEnded}
                type="date"
                Id="ended"
              />
            </div>
          </div>
        </div>
       {
        status === 'loading' ? <TableSkeleton /> : (
          <>
            <Table
              columns={orderColumns}
              data={mappedOrder}
              tableHeaderBg="bg-white"
              tableHeaderTxtColor="text-black"
              whichTable="order"
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
            text="You have not made any order yet"
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
