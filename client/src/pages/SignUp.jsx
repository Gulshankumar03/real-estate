import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error,setError]=useState(null);
  const [loading,setLoading]=useState(false);
  const Navigate=useNavigate();
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if(data.success===false){
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      Navigate('/signin');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="p-3 mt-4 max-w-md mx-auto">
      <h1 className="text-3xl text-center font-bold font-sans  my-8">
        Sign Up
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative ">
          <input
            autoFocus
            type="text"
            id="username"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none  dark:border-gray-600 dark:focus:border-blue-900 focus:outline-none focus:ring-0  focus:border-2 focus:border-blue-600 peer "
            placeholder=" "
            required
            onChange={handleChange}
          />
          <label
            htmlFor="username"
            className="absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-4 scale-90 top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-900 peer-focus:dark:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-100 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Username
          </label>
        </div>
        <div className="relative">
          <input
            type="email"
            id="email"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none  dark:border-gray-600 dark:focus:border-blue-900 focus:outline-none focus:ring-0  focus:border-2 focus:border-blue-600 peer"
            placeholder=" "
            required
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
            required
            onChange={handleChange}
          />
          <label
            htmlFor="password"
            className="absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-4 scale-90 top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-900 peer-focus:dark:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-100 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Password
          </label>
        </div>
        <div className="relative">
          <input
            type="text"
            id="confirmPassword"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none  dark:border-gray-600 dark:focus:border-blue-900 focus:outline-none focus:ring-0  focus:border-2 focus:border-blue-600 peer"
            placeholder=" "
            required
            onChange={handleChange}
          />
          <label
            htmlFor="confirmPassword"
            className="absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-4 scale-90 top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-900 peer-focus:dark:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-100 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Confirm Password
          </label>
        </div>

        <button disabled={loading} className=" transition-transform bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-75">
          {loading?'Loading...':'Sign Up'}
        </button>
      </form>
      <div className="flex gap-3 mt-5 ">
        <p>Have an account?</p>
        <Link to={"/signin"}>
          <span className="text-blue-700 hover:underline hover:text-violet-500 transition-colors">
            Sign in
          </span>
        </Link>
      </div>
      {error&&<p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
