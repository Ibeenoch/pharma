import CustomText from "../common/Text";

const MobileNav = () => {
  const links = [
    "Research",
    "Treatments",
    "Innovations",
    "Patient Support",
    "Contact",
  ];

  return (
    <nav className="sm:hidden fixed">
      <ul className="flex flex-col flex-start items-center gap-4">
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
    </nav>
  );
};

export default MobileNav;
