import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const  {currentUser}  = useSelector((state) => state.user);
  console.log(currentUser);
  return (
    <header className=" backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white supports-backdrop-blur:bg-white/95 dark:bg-slate-300/60">
      <div className="flex justify-between items-center max-w-full  mx-auto py-4 px-8">
        <Link to={"/"}>
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Real</span>
            <span className="text-slate-900">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 m-0 rounded-lg flex items-center ">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="flex gap-8">
          <Link to={"/"}>
            <li className="hidden sm:inline text-slate-800 font-medium hover:text-violet-500">
              Home
            </li>
          </Link>
          <Link to={"/about"}>
            <li className="hidden sm:inline text-slate-800 font-medium hover:text-violet-500">
              About
            </li>
          </Link>
          <Link to={"/profile"}>
            {currentUser ? (
              <img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt="Profile" />
            ) : (
              <li className="sm:inline text-slate-800 font-medium hover:text-violet-500">
                Sign in
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
