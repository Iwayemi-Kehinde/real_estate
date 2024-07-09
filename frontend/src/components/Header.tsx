import { BsFillHouseUpFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { FaBars, FaRightToBracket } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  return (
    <header className="border-bottom z-20 bg-white px-[2%] flex justify-between items-center py-[20px]">
      <Link to="/">
        <h1 className="flex gap-2">
          <span className="text-2xl lg:block hidden">Real estate</span>
          <BsFillHouseUpFill />
        </h1>
      </Link>
      <div className="flex items-center gap-6">
        <form className="flex">
          <input
            type="text"
            placeholder="Search..."
            className="px-2 py-2 border border-gray-300 rounded-l-[3px] w-60 sm:w-96 outline-none focus:border-blue-300 transition duration-300 ease-in-out"
          />
          <button
            className="px-3 cursor-pointer border-0 border-r-1 bg-blue-500"
            type="submit"
          >
            <FaSearch className="text-lg text-white" />
          </button>
        </form>
        <FaBars className="xl:hidden block text-lg w-10 h-10 text-blue-500 cursor-pointer" />
      </div>
      <ul className="list-none hidden xl:block">
        <Link to={"/"}>
          <li className="inline-block m-4 hover:text-blue-500 transition-all">
            Home
          </li>
        </Link>
        <Link to={"/about"}>
          <li className="inline-block m-4 hover:text-blue-500 transition-all">
            About
          </li>
        </Link>
        <Link to={"/services"}>
          <li className="inline-block m-4 hover:text-blue-500 transition-all">
            Services
          </li>
        </Link>
        <Link to="/contact">
          <li className="inline-block m-4 hover:text-blue-500 transition-all">
            Contact
          </li>
        </Link>
        {currentUser ? (
          <Link to="/profile">
            <div>Profile</div>
          </Link>
        ) : (
          <Link to="/signup">
            <li className="inline-block text-white bg-blue-500 ml-4 px-4 py-2 rounded-[4px] cursor-pointer hover:bg-blue-400 transition-all">
              Get Started{" "}
              <FaRightToBracket className=" align-middle mt-[-4px] ml-1" />{" "}
            </li>
          </Link>
        )}
      </ul>
    </header>
  );
};

export default Header;
