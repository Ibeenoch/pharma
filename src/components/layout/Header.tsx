const Header = () => {
  return (
    <header className="bg-whitebg w-full flex p-6 items-center">
      <nav className="flex w-full items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold">ChiMark Pharmacy</h1>
        </div>

        <ul className="flex items-center gap-4">
          <li>Book</li>
          <li>Manage</li>
          <li>Experience</li>
          <li>where </li>
          <li>Book</li>
        </ul>

        <div>
          <button type="button">Login</button>
          <button type="button">Register</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
