import React from 'react'
import noprofileImage from "../../assets/images/noprofileimage.png";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { UserDataProps } from '../../types/auth/UserData';

interface ProfilePicsProps{
    navigate: NavigateFunction;
    user: UserDataProps;
}

const ProfilePics: React.FC<ProfilePicsProps> = ({ navigate, user }) => {
 
    const handleProfile = () => {
        if (user && user.role && user.role?.toLowerCase() === "admin") {
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