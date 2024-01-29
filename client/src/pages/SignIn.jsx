import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function Signin() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      Navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="p-3 mt-4 max-w-md mx-auto">
      <h1 className="text-3xl text-center font-bold font-sans  my-8">
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <input
            autoFocus
            type="email"
            id="email"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none  dark:border-gray-600 dark:focus:border-blue-900 focus:outline-none focus:ring-0  focus:border-2 focus:border-blue-600 peer"
            placeholder=" "
            onChange={handleChange}
          />
          <label
            htmlFor="email"
            className="absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-4 scale-90 top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-900 peer-focus:dark:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-100 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Email
          </label>
        </div>
        <div className="relative">
          <input
            type="password"
            id="password"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none  dark:border-gray-600 dark:focus:border-blue-900 focus:outline-none focus:ring-0  focus:border-2 focus:border-blue-600 peer"
            placeholder=" "
            onChange={handleChange}
          />
          <label
            htmlFor="password"
            className="absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-4 scale-90 top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-900 peer-focus:dark:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-100 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Password
          </label>
        </div>

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase  hover:shadow-black hover:shadow hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-3 mt-5 ">
        <p>Doesn&apos;t have an account?</p>
        <Link to={"/signup"}>
          <span className="text-blue-900 hover:underline hover:text-violet-500 transition-colors">
            Sign up
          </span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
