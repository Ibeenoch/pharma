import React from 'react'
import noprofileImage from "../../assets/images/noprofileimage.png";
import { NavigateFunction } from 'react-router-dom';
import { UserDataProps } from '../../types/auth/UserData';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { fetchAllUnReadNotification } from '../../features/user/userSlice';

interface ProfilePicsProps{
    navigate: NavigateFunction;
    user: UserDataProps;
}


const ProfilePics: React.FC<ProfilePicsProps> = ({ navigate, user }) => {
 const dispatch = useAppDispatch();
    const handleProfile = () => {
        if (user && user.role && user.role?.toLowerCase() === "admin") {
          dispatch(fetchAllUnReadNotification())
          navigate(`/admin/dashboard/${user && user.userId}`);
        }else if( user && user.role?.toLowerCase() === 'customer'){
          navigate(`/profile/${user.userId}`)
        } else {
          navigate(`/profile/${user && user.userId}`);
        }
      };

  return (
    <div onClick={handleProfile}>
    <img
      src={noprofileImage}
      alt="login user image"
      className="w-10 h-10 rounded-full border border-gray-200 cursor-pointer"
    />
  </div>
  )
}

export default ProfilePics