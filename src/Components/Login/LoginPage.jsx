import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { getUserByUsername } from "../../../utils";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  let [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("rtn"));
  const submitUsername = (e) => {
    e.preventDefault();
    if (userLogin.length === 0) {
      return setError("Please enter a username to log in.");
    }
    setError(null);
    setIsLoading(true);
    getUserByUsername(userLogin)
      .then((res) => {
        const rtn = searchParams.get("rtn") ?? "/";
        setUser(res);
        setUserLogin("");
        setError(null);
        setIsLoading(false);
        navigate(rtn);
      })
      .catch((err) => {
        setError("User not found, please enter a valid username to log in.");
        setIsLoading(false);
      });
  };

  useEffect(() => {});
  return (
    <div>
      <div>
        <header className="w-2/6 mx-auto mt-28">
          <h1 className="text-center font-extrabold text-xl">
            Welcome to NC News
          </h1>
        </header>
        <section className="flex flex-row w-5/6 mx-auto mt-10 h-72 shadow-md">
          <div className="w-7/12 justify-center bg-white">
            <form
              id="login-form"
              className="flex flex-col px-16 gap-2 mt-8"
              onSubmit={submitUsername}
            >
              <label htmlFor="login-form">Username</label>
              <input
                className="bg-slate-200 rounded-md pt-1 pb-1 pl-3"
                type="text"
                value={userLogin}
                onChange={(e) => {
                  setUserLogin(e.target.value);
                }}
              />
              <input
                type="submit"
                className="text-white bg-gradient-to-r from-custom-turq2 to-custom-turq mt-3 rounded-md pt-1 pb-1 
             hover:from-custom-turq hover:to-custom-turq2 
             active:bg-custom-turq3
             transition duration-200 ease-in-out cursor-pointer"
                value="Log in"
              />
            </form>
            <div className="text-center mt-5">
              {isLoading ? <p>Logging in.. </p> : error ? <p>{error}</p> : null}
            </div>
          </div>
          <div className=" text-white flex flex-col w-3/6 text-center bg-gradient-to-r from-custom-turq2 to-custom-turq">
            <h2 className="font-extrabold mt-20 text-2xl">Welcome to login</h2>
            <p className="font-light">Don't have an account ?</p>
            <button className="mt-12 mx-auto  w-1/6 border border-white rounded-md">
              Sign Up
            </button>
          </div>
        </section>
      </div>
      <p className="italic text-gray-500 text-center">
        You can use the username: 'grumpy19' to log in.
      </p>
    </div>
  );
}

export default LoginPage;
