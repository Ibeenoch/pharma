import { lazy, useState } from "react";
import Search from "../../../assets/icons/search-alt-black.svg?react";
import Cancel from "../../../assets/icons/cancel-close.svg?react";
import SearchWhite from "../../../assets/icons/search-alt-white.svg?react";
import Bag from "../../../assets/icons/order.svg?react";
import Message from "../../../assets/icons/email.svg?react";
import Payment from "../../../assets/icons/cash.svg?react";
import Bell from "../../../assets/icons/bell.svg?react";
const CustomText = lazy(() => import("../../common/Text"));
const CustomInput = lazy(() => import("../../common/Input"));
import profileImg from "../../../assets/images/noprofileimage.png";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { selectAuth } from "../../../features/auth/authSlice";

const NavItems = () => {
  const [search, setSearch] = useState<string>("");
  const [showSearchInput, setShowSearchInput] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const { userId } = useParams();
  const { user } = useAppSelector(selectAuth);
  const navigate = useNavigate()


  const toggleShowSearchInput = () => {
    setShowSearchInput((prev) => !prev)
  }

  const closeNotification = () => setShowNotification(false)
  const openNotification = () => setShowNotification(true)

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
            <span className="bg-red-500 w-3 h-3 rounded-full p-[6px] absolute -top-1 -left-0 flex justify-center items-center">
              <p className="text-[9px] text-white">2</p>
            </span>
          </div>

        <div onClick={() => navigate(`/profile/${userId}`)}>
            <img
              src={ user && user.image || profileImg}
              alt="dashboard image"
              className="w-10 h-10 rounded-full object-cover cursor-pointer border border-white"
            />
        </div>
        </div>

      
      </div>
      <div className={`${showNotification ? 'block' : 'hidden'} absolute top-14 w-7 rotate-[45deg] h-7 right-17 bg-white`}></div>
      <div className={`${showNotification ? 'block' : 'hidden'} absolute bg-white right-[0%] top-15 w-[100%] md:w-[500px] h-screen overflow-y-auto rounded-md p-4`}>
        {/* Notification header  */}
        <div className="flex justify-between border-b border-gray-200/40">
          <CustomText 
          text="Notification"
          textType="normal"
          weightType="semibold"
          extraStyle="pb-2"
          />

          <Cancel onClick={closeNotification} className="w-5 h-5"/>
        </div>
          {/* Notification body / items  */}
          <div className="flex items-center py-2 gap-2 border-b border-gray-200/40">
            <div className="p-2 rounded-md bg-amber-500/30">
              <Bag className="w-4 h-4 text-amber-500" />
            </div>
            <div>

            <CustomText 
            text="Emeka chinere has made 2 orders, waiting for to be delivered"  
            textType="small"
            weightType="normal"
            color="text-gray-500"
            extraStyle="break-words"
            />
            </div>
            <CustomText 
            text="4 mins ago"  
            textType="extrasmall"
            weightType="medium"
            color="text-gray-400"
            extraStyle="pl-4"
            />

          </div>

      </div>
    </>
  ); 
};

export default NavItems;
