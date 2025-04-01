import CustomText from "../../common/Text";
import Search from "../../../assets/icons/search-alt-black.svg?react";
import SearchWhite from "../../../assets/icons/search-alt-white.svg?react";
import Bell from "../../../assets/icons/bell.svg?react";
import { useState } from "react";
import CustomInput from "../../common/Input";
import profileImg from "../../../assets/images/profile7.png";

const NavItems = () => {
  const [search, setSearch] = useState<string>("");
  const [showSearchInput, setShowSearchInput] = useState<boolean>(false);

  const _showSearchInput = () => setShowSearchInput(true);
  const _hideSearchInput = () => setShowSearchInput(false);

  return (
    <div className={`flex items-center gap-5`}>
      {showSearchInput && (
        <div
          onMouseLeave={_hideSearchInput}
          className="flex items-center cursor-pointer w-auto md:w-[350px]"
        >
          <CustomInput
            type="search"
            onChange={setSearch}
            value={search}
            Id="search"
            showFullWidth={true}
            placeholder="Search for User, Product etc"
          />
          <div className="bg-[#3f3114] p-3 flex items-center justify-center cursor-pointer">
            <SearchWhite className="w-3 h-3" />
          </div>
        </div>
      )}
      {!showSearchInput && (
        <div
          onMouseEnter={_showSearchInput}
          className="flex gap-2 items-center cursor-pointer"
        >
          <CustomText text="Search" textType="normal" color="text-gray-900" />
          <Search className="w-5 h-5 stroke-black" />
        </div>
      )}

      <div className="flex gap-4 items-center cursor-pointer">
        <div className="relative">
          <Bell className="w-5 h-5" />
          <span className="bg-red-500 w-3 h-3 rounded-full p-[6px] absolute -top-1 -left-0 flex justify-center items-center">
            <p className="text-[9px] text-white">2</p>
          </span>
        </div>

        <img
          src={profileImg}
          alt="dashboard image"
          className="w-10 h-10 rounded-full object-cover cursor-pointer border border-white"
        />
      </div>
    </div>
  );
};

export default NavItems;
