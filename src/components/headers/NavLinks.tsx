import CustomText from "../common/Text";

const NavLinks = () => {
  const links = [
    "Research",
    "Treatments",
    "Innovations",
    "Patient Support",
    "Contact",
  ];
  return (
    <ul className="hidden sm:flex items-center gap-4">
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
  );
};

export default NavLinks;
