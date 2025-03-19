import CustomText from "../common/Text"

const NavLinks = () => {
    const links = ['Book', 'Manage', 'Experience', 'Whare', 'Book']
  return (
    
    <ul className="flex items-center gap-4">
        {
            links.map((link) => (
              <li>
                <CustomText text={link} textType="normal" weightType="medium" extraStyle="hover:border-b-2 hover:border-black cursor-pointer"  />
              </li>
            ))
        }
  </ul>
  )
}

export default NavLinks