import CustomText from "../common/Text";
import SearchBar from '../../assets/icons/searchbar.svg?react';

const NavLinks = () => {
  const links = [
    'Home',
    'Products',
    'Prescription',
    'About',
    'Contact',
    'Support',
  ];
  return (
    <div className="hidden lg:block">
      <form className="flex items-center mb-4">
        <input type="search" name="search" id="search" placeholder="Search for any Product or Brand..." className="hidden lg:flex w-full px-4 py-2 border border-gray-300 focus:border-gray-300 outline outline-gray-300 placeholder:text-xs" />
        <div className="bg-gray-500 p-3 flex items-center justify-center cursor-pointer">
          <SearchBar className="stroke-white w-5 h-5" />
        </div>
      </form>
      <ul className="hidden lg:flex items-center gap-4">
        {links.map((link) => (
          <li>
            <CustomText
              text={link}
              textType="normal"
              weightType="medium"
              extraStyle="hover:border-b-2 hover:border-black cursor-pointer"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavLinks;
