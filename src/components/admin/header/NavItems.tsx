import { lazy, useEffect, useState } from "react";
const Search = lazy(() => import("../../../assets/icons/search-alt-black.svg?react"));
const Cancel = lazy(() => import("../../../assets/icons/cancel-close.svg?react"));
const SearchWhite = lazy(() => import("../../../assets/icons/search-alt-white.svg?react"));
const Bag = lazy(() => import("../../../assets/icons/order.svg?react"));
const Message = lazy(() => import("../../../assets/icons/email.svg?react"));
const ListMessage = lazy(() => import("../../../assets/icons/rss.svg?react"));
const Payment = lazy(() => import("../../../assets/icons/cash.svg?react"));
const Bell = lazy(() => import("../../../assets/icons/bell.svg?react"));
const CustomText = lazy(() => import("../../common/Text"));
const CustomInput = lazy(() => import("../../common/Input"));
import profileImg from "../../../assets/images/noprofileimage.png";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { selectAuth } from "../../../features/auth/authSlice";
import { fetchAllNotification, fetchAllUnReadNotification, selectUser, updateReadNotification } from "../../../features/user/userSlice";
import { getRelativeTime } from "../../../utils/dateFormatter";
import { NotificationProps } from "../../../types/notification/Notification";
import { UserDataProps } from "../../../types/auth/UserData";
import { selectOrder } from "../../../features/order/orderSlice";
import { selectproductAdmin } from "../../../features/admin/product/productSlice";
import { ProductDataProps } from "../../../types/product/ProductData";
import { AllOrderResultData } from "../../../types/order/OrderType";
import { TransactionProps } from "../../../types/payment/FlutterwavePaymentType";
const UserSearchList = lazy(() => import("./search/UserSearchList"));
const NoResult = lazy(() => import("./search/NoResult"));
const ProductSearchList = lazy(() => import("./search/ProductSearchList"));
const OrderSearchList = lazy(() => import("./search/OrderSearchList"));
const TransactionSearchList = lazy(() => import("./search/TransactionSearchList"));

const NavItems = () => {
  const [search, setSearch] = useState<string>("");
  const [currentSearchTabIndex, setcurrentSearchTabIndex] = useState<number>(0);
  const [searchType, setSearchType] = useState<'user' | 'product' | 'order' | 'transaction'>("user");
  const [foundUser, setFoundUser] = useState<UserDataProps[]>([]);
  const [foundOrder, setFoundOrder] = useState<AllOrderResultData[]>([]);
  const [foundProduct, setFoundProduct] = useState<ProductDataProps[] >([]);
  const [foundTransaction, setFoundTransaction] = useState<TransactionProps[]>([]);
  const [showSearchInput, setShowSearchInput] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [showSearchResult, setshowSearchResult] = useState<boolean>(false);
  const { userId } = useParams();
  const { user, users } = useAppSelector(selectAuth);
  const { notifications, totalUnreadnotification } = useAppSelector(selectUser);
  const { ordersWithoutPagination, transactions } = useAppSelector(selectOrder);
  const { allProduct } = useAppSelector(selectproductAdmin);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const closeSearchList = () => {
    setshowSearchResult(false)
  }

  useEffect(() => {
    dispatch(fetchAllNotification())
  }, [])

  useEffect(() => {
    dispatch(fetchAllUnReadNotification())
  }, [dispatch])

  const toggleShowSearchInput = () => {
    setShowSearchInput((prev) => !prev)
  }

  const closeNotification = () => setShowNotification(false);
  const searchItems = ["User", 'Product', 'Order', 'Transaction'];

const searchEntity = () => {
  if(search.length >= 1){
    setshowSearchResult(true);
    if(searchType === 'user'){

      let findUser = users.filter((u) => {
       return (u.firstName?.toLowerCase().startsWith(search.toLowerCase()) ||
       u.lastName?.toLowerCase().startsWith(search.toLowerCase()) ||
       u.email?.toLowerCase().startsWith(search.toLowerCase()) )
      
      });
      setFoundUser(findUser);
    }else if(searchType === 'order') {
      let findOrder = ordersWithoutPagination.filter((f) => {
        return (
          f.$id.toLowerCase().startsWith(search.toLowerCase()) ||
          f.orderStatus.toLowerCase().startsWith(search.toLowerCase()) 
        )
      });
      setFoundOrder(findOrder);
    }else if(searchType === 'product') {
      let findProduct = allProduct.filter((p) => {
        return (
          p.brand.toLowerCase().startsWith(search.toLowerCase()) ||
          p.category.toLowerCase().startsWith(search.toLowerCase()) ||
          p.name.toLowerCase().startsWith(search.toLowerCase()) 
        )
      });
      setFoundProduct(findProduct);
    }else if(searchType === 'transaction') {
      let findTransaction = transactions.filter((t) => {
        return (
          String(t.amount) === search ||
         t.status.toLowerCase().startsWith(search.toLowerCase()) ||
         t.customerName.toLowerCase().startsWith(search.toLowerCase()) ||
         t.payMethod.toLowerCase().startsWith(search.toLowerCase()) ||
         t.status.toLowerCase().startsWith(search.toLowerCase())
        )
      });
      setFoundTransaction(findTransaction);
    }
   }else{
    setshowSearchResult(false);
   }

}

  useEffect(() => {
     searchEntity()
  }, [search, searchType])

  const openNotification = () => {
    setShowNotification(true);
    const allUnreadNotification = notifications.filter((n) => n.hasBeenRead === false);
    allUnreadNotification.forEach(async(n) => {
      const notificationData: NotificationProps = {
        $id: n.$id
      }
     await dispatch(updateReadNotification(notificationData));
    });
    dispatch(fetchAllUnReadNotification());
  }

  const setSearchText = (str: string, index: number) => {
      setSearchType(str as "user" | "product" | "order" | "transaction");
      setcurrentSearchTabIndex(index)
  }

  useEffect(() => {
    let timer : NodeJS.Timeout;

    if(showSearchInput && search === ''){
     timer = setTimeout(() => {
        setShowSearchInput(false);
      }, 7000)
    }
    
    return () => clearTimeout(timer);
  }, [showSearchInput, search])

  return (
    <>
      <div className={`flex items-center gap-5`}>
      <div className="relative flex -left-15 items-center">
      <div
        className={`hidden md:flex items-center relative transition-all duration-300 ease-in-out 
          ${showSearchInput ? 'opacity-100 scale-100 w-auto md:w-[350px]' : 'opacity-0 scale-95 w-0 overflow-hidden'}
        `}
      >
        <CustomInput
          type="search"
          onChange={setSearch}
          value={search}
          Id="search"
          showFullWidth={true}
          placeholder="Search for User, Product etc"
        />
        <div
          onClick={toggleShowSearchInput}
          className="bg-black p-3 flex items-center justify-center cursor-pointer"
        >
          <SearchWhite className="w-3 h-3" />
        </div>
      </div>

    {!showSearchInput && (
      <div
        onClick={toggleShowSearchInput}
        className="flex gap-2 items-center cursor-pointer absolute"
      >
        <CustomText text="Search" textType="small" color="text-gray-900" />
        <Search className="w-5 h-5 stroke-black" />
      </div>
    )}

  </div>
  {/* mobile search input  */}
      <div
        className={`flex md:hidden items-center absolute top-20 left-4  transition-all duration-300 ease-in-out 
          ${showSearchInput ? 'opacity-100 scale-100 w-[380px]' : 'opacity-0 scale-95 w-0 overflow-hidden'}
        `} >
        <CustomInput
          type="search"
          onChange={setSearch}
          value={search}
          Id="search"
          showFullWidth={true}
          placeholder="Search for User, Product etc"
        />
        <div
          onClick={toggleShowSearchInput}
          className="bg-black p-3 flex items-center justify-center cursor-pointer"
        >
          <SearchWhite className="w-3 h-3" />
        </div>
      </div>

        
        <div className="flex gap-4 items-center cursor-pointer">
          <div className="relative">
            <Bell onClick={openNotification} className="w-5 h-5" />
           { totalUnreadnotification > 0 && 
          ( <span className="bg-red-500 w-3 h-3 rounded-full p-[6px] absolute -top-1 -left-0 flex justify-center items-center">
              <p className="text-[9px] text-white">{totalUnreadnotification}</p>
            </span>)
            }
          </div>

        <div onClick={() => navigate(`/profile/${userId}`)}>
            <img
              src={ user && user.image || profileImg}
              alt="dashboard image"
              className="w-10 h-10 rounded-full object-cover cursor-pointer border border-white"
              loading="lazy"
            />
        </div>
        </div>

      
      </div>
            {/* notification pointer shape  */}
      <div className={`${showNotification ? 'block' : 'hidden'} absolute top-14 w-7 rotate-[45deg] h-7 right-17 bg-white`}></div>
      <div className={`${showNotification ? 'block' : 'hidden'} absolute bg-white right-[0%] top-15 w-[100%] md:w-[400px] h-screen overflow-y-auto rounded-md p-4`}>
        {/* Notification header  */}
        <div className="flex justify-between border-b border-gray-200/90">
          <CustomText 
          text="Notification"
          textType="normal"
          weightType="semibold"
          extraStyle="pb-2"
          />

          <Cancel onClick={closeNotification} className="w-5 h-5 cursor-pointer"/>
        </div>
          {/* Notification body / items  */}
          {
            notifications && Array.isArray(notifications) && notifications.map((n) => (

        n && n.$createdAt &&  
        <div key={n.$id} className="grid grid-cols-[8%_72%_20%] items-center py-2 gap-2 border-b border-gray-200/90">
            <div className="p-2 rounded-md bg-amber-500/30">
            {
              n.notificationType === 'order' ? (
                <Bag className="w-4 h-4 text-amber-500" />
              ) : n.notificationType === 'message' ? (
                <ListMessage className="w-4 h-4 text-amber-500" />
              ) : n.notificationType === 'transaction' ? (
                <Payment className="w-4 h-4 text-amber-500" />
              ) : (
                <Message className="w-4 h-4 text-amber-500" />
              )
            }
            </div>
            <div>

            <CustomText 
            text={n.message}  
            textType="small"
            weightType="normal"
            color="text-black/80"
            extraStyle="break-words"
            />
            </div>
            <CustomText 
            text={getRelativeTime(n.$createdAt)} 
            textType="extrasmall"
            weightType="medium"
            color="text-gray-400"
            extraStyle=""
            />

          </div>
            ))
          }

      </div>
        {/* search results  */}
      <div className={`${showSearchResult ? 'block' : 'hidden'} absolute bg-white right-0 md:right-[25%] top-14 w-[100%] md:w-[700px] rounded-md max-h-screen overflow-y-auto`}>
          <div onClick={closeSearchList} className="absolute top-1 right-3 cursor-pointer">
            <Cancel className="w-5 h-5" />
          </div>
          <div className="grid grid-cols-4 items-center p-4">
            {
              searchItems.map((s, i) => (
                <div onClick={() => setSearchText(s.toLowerCase(), i)}>
                  <CustomText text={s} textType="normal" weightType="medium" color={currentSearchTabIndex === i ? "text-amber-500 border-b border-amber-500" : "text-black"} extraStyle="text-center cursor-pointer"/>
                </div>
              ))
            }
          </div>
         
         {/* users  */}
         {
         searchType === 'user' && (
          <>
          {
            foundUser && Array.isArray(foundUser) && foundUser.length > 0 ? (
              foundUser.map((user) => (
                <UserSearchList key={user.$id} user={user} />
              ))
            ) : (
              <NoResult title="user"/>
            )
          }
          </>
         )
         }
       
           {/* products */}
           {
        searchType === 'product' &&  (
          <>
          {
            foundProduct && Array.isArray(foundProduct) && foundProduct.length > 0 ? (
              foundProduct.map((product) => (
                <ProductSearchList key={product.$id} product={product} />
              ))
            ) : (
              <NoResult title="product"/>
            )
          }
          </>
        )
         }
        
           {/* orders */}
           {
        searchType === 'order' && (
          <>
          {
            foundOrder && Array.isArray(foundOrder) && foundOrder.length > 0 ? (
              foundOrder.map((order) => (
                <OrderSearchList key={order.$id} order={order} />
              ))
            ) : (
              <NoResult title="order"/>
            )
          }
          </>
        )
         }
         
           {/* transaction */}
           {
         searchType === 'transaction' &&  (
            <>
            {
              foundTransaction && Array.isArray(foundTransaction) && foundTransaction.length > 0 ? (
                foundTransaction.map((transaction) => (
                  <TransactionSearchList key={transaction.$id} transaction={transaction} />
                ))
              ) : (
                <NoResult title="transaction"/>
              )
            }
            </>
         )
         }

          
      </div>

    </>
  ); 
};

export default NavItems;
