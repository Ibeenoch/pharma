import CustomButton from "../common/Button";

const Header = () => {
  const handleLogin = () => {};
  const handleRegister = () => {};
  return (
    <header className="bg-whitebg w-full ">
      <nav className="flex w-full items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold">ChiMark Pharmacy</h1>
        </div>

        <ul className="flex items-center gap-4">
          <li className="bg-black p-8 rounded-md text-white text-xs">Book</li>
          <li>Manage</li>
          <li>Experience</li>
          <li>where </li>
          <li>Book</li>
        </ul>

        <div className="flex gap-4">
          <CustomButton text="Login" onClick={handleLogin} />
          <CustomButton text="Register" onClick={handleRegister} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
