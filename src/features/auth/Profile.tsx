import { ChangeEvent, lazy, useEffect, useRef, useState } from "react";
import img2 from "../../assets/images/noprofileimage.png";
import Home from "../../assets/icons/home2.svg?react";
import Cart from "../../assets/icons/cart-shopping.svg?react";
import Bag from "../../assets/icons/bag.svg?react";
import User from "../../assets/icons/user.svg?react";
import Date from "../../assets/icons/date.svg?react";
import Upload from "../../assets/icons/upload.svg?react";
import Phone from "../../assets/icons/phone.svg?react";
import Address from "../../assets/icons/address-1.svg?react";
import City from "../../assets/icons/city.svg?react";
import Email from "../../assets/icons/email.svg?react";
import EditPen from "../../assets/icons/pencil.svg?react";
import Location from "../../assets/icons/globe.svg?react";
import { useNavigate } from "react-router-dom";
import { lightgrayBgColor } from "../../constants/appColor";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { addProfilePics, logoutUser, resetUserState, selectAuth, toggleProfileTocheckOut } from "./authSlice";
import { getShippingDetails, resetShippingDetails, selectOrder } from "../order/orderSlice";
const LargeImageSize = lazy(() => import("../../components/common/LargeImageSize"));
const CustomText = lazy(() => import("../../components/common/Text"));
const ProfileLists = lazy(() => import("../../components/auth/ProfileLists"));
const Logout = lazy(() => import("../../components/common/Logout"));


const Profile = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user,  } = useAppSelector(selectAuth);
  const { shippingDetail } = useAppSelector(selectOrder);
  const imageRef = useRef<HTMLInputElement>(null);

  const uploadImage = () => {
    imageRef.current?.click();
  }

  const handleImageUploaded = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setImageFiles((prev) => [...prev, file]); // append each image file to the image array
      }
     
    };

    const uploadImageToServer = () => {
      if(user && user.$id && imageFiles.length > 0){

        const imageForm = new FormData();
        imageForm.append('userId', user.$id);
        imageFiles.forEach((file) => {
          imageForm.append("imageFiles", file);
        });

        dispatch(addProfilePics(imageForm));
      }
    }

    useEffect(() => {
      uploadImageToServer();
    }, [imageFiles])

    const handleProfileToCheckout = () => {
      dispatch(toggleProfileTocheckOut('yes'))
      navigate(`/checkout/${user && user.userId}`);
    }
    
  const navigateHome = () => {
    navigate("/");
  };

    const handleLogout = () => {
      dispatch(logoutUser())
        .then(() => dispatch(resetUserState()))
        .then(() => dispatch(resetShippingDetails()))
        .then(() => navigate("/login"));
    };

  useEffect(() => {
    shippingDetail.address.length < 1 && user && user.userId && dispatch(getShippingDetails(user.userId));
  }, [])

  const about = [
    {Icon: Address, name: 'Address', value: shippingDetail && shippingDetail.userId === user.userId && shippingDetail.address ? shippingDetail.address : 'N/A'},
    {Icon: City, name: 'State', value: shippingDetail && shippingDetail.userId === user.userId && shippingDetail.state ? shippingDetail.state : 'N/A'},
    {Icon: Location, name: 'Zipcode', value: shippingDetail && shippingDetail.userId === user.userId && shippingDetail.zipcode ? shippingDetail.zipcode : 'N/A'},
  ]

  const profile = [
    {Icon: Phone, name: 'Phone', value: shippingDetail && shippingDetail.userId === user.userId && shippingDetail.phoneNumber ? shippingDetail.phoneNumber : 'N/A'},
    {Icon: Email, name: 'Email', value: user && user.email ? user.email : 'N/A'},
  ]

  const personal = [
    {Icon: Date, name: 'Date Of Birth:', value: user && user.dob},
    {Icon: User, name: 'Role:', value: user && user.role},
  ]


  return (
    <>
    <main className="block lg:grid lg:grid-cols-2">
     <LargeImageSize img={user && user.image || img2} />

      <section className={`p-4 ${lightgrayBgColor}`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src={user && user.image || img2}
              alt="profile image"
              className="w-16 h-16 rounded-full border border-amber-500"
            />
            <div>
              <CustomText
                text={`${user && user.firstName} ${user && user.lastName}`}
                textType="small"
                weightType="bold"
              />
              <CustomText
                text={`${user && user.email}`}
                textType="extrasmall"
                weightType="normal"
              />
            </div>
          </div>

            <div onClick={uploadImage} className="p-2 mx-1 rounded-md bg-amber-500/20 font-semibold flex items-center gap-2 cursor-pointer">
              <Upload className="w-4 h-4 text-amber-500" />
              <p className="text-amber-500 text-xs"> change photo</p>
            </div>
           
          <input type="file" hidden ref={imageRef} name="profile-img" id="profile-img" onChange={handleImageUploaded} />


          <div className="hidden lg:flex items-center gap-3">
            <div onClick={navigateHome} className="cursor-pointer">
              <Home className="w-8 h-8 text-amber-500" />
            </div>
            <div onClick={() => navigate('/cart')} className="cursor-pointer">
              <Cart className="w-6 h-6 text-amber-500" />
            </div>
            <div onClick={() => navigate(`/order_history/${user && user.userId}`)} className="cursor-pointer">
              <Bag className="w-6 h-6 text-amber-500" />
            </div>
          </div>
        </div>

        <div className="flex lg:hidden justify-between my-2 px-2 items-center gap-3">
            <div onClick={navigateHome} className="cursor-pointer">
              <Home className="w-8 h-8 text-amber-500" />
            </div>
            <div onClick={() => navigate('/cart')} className="cursor-pointer">
              <Cart className="w-6 h-6 text-amber-500" />
            </div>
            <div onClick={() => navigate(`/order_history/${user && user.userId}`)} className="cursor-pointer">
              <Bag className="w-6 h-6 text-amber-500" />
            </div>
          </div>

        <div className="pb-4 border-b border-gray-300">
          <CustomText
            text="About"
            textType="normal"
            weightType="semibold"
            extraStyle="my-2"
          />
          {/* phone & email  */}

          {
            profile.map((p) => (

              <ProfileLists
                  Icon={p.Icon}
                  leftText={p.name}
                  rightText={p.value}
                />
            ))
          }
        
        </div>

        <div className="pb-4 border-b border-gray-300">
          <CustomText
            text="Address"
            textType="normal"
            weightType="semibold"
            extraStyle="my-2"
          />
          {/* about items address, city, zipcode  */}
        {
            about.map((a) => (
              <ProfileLists
                  Icon={a.Icon}
                  leftText={a.name}
                  rightText={a.value}
                />
            ))
          }
        </div>

        <div className="pb-4 border-b border-gray-300">
          <CustomText
            text="Personal Details"
            textType="normal"
            weightType="semibold"
            extraStyle="my-2"
          />
          {/* personal items  */}

          {personal.map((item) => (
            <ProfileLists
              Icon={item.Icon}
              leftText={item.name}
              rightText={item.value}
            />
          ))}

        </div>
        { shippingDetail && shippingDetail.address && shippingDetail.address.length > 0 ? (
          <div  onClick={handleProfileToCheckout} className="flex gap-2 items-center cursor-pointer">
             <EditPen className='w-5 h-5 text-amber-500' /> <CustomText text="Edit Shipping Details" textType="normal" weightType="medium" color="text-amber-500" extraStyle="cursor-pointer" />
          </div>
        ) : (<div className="pt-7">
            <CustomText text="Your profile details is incomplete because you haven't updated your shipping Details." textType="normal" weightType="normal" color="text-gray-500" />
            <div onClick={handleProfileToCheckout}>
              <CustomText text="Update Now" textType="normal" weightType="medium" color="text-amber-500" extraStyle="cursor-pointer" />
            </div>
          </div>)}
          <div className="py-3">
            <Logout iconColor="text-red-500" textColor="text-red-500" handleLogout={handleLogout} />
          </div>
      </section>
    </main>
    -
    </>
  );
};

export default Profile;
