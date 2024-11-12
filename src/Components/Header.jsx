import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { LogInBtn } from "./LogInBtn";

function Header({ resetSortByVals }) {
  const { user, setUser } = useContext(UserContext);
  return (
    <div className="bg-gradient-to-r from-custom-turq2 to-custom-turq h-40 shadow-md">
      {Object.keys(user).length === 0 ? (
        <LogInBtn />
      ) : (
        <div className="flex flex-row justify-between p-2">
          <button
            className="hover:cursor-pointer text-white hover:border-black hover:text-black p-2  rounded-xl border-white border"
            onClick={() => {
              localStorage.removeItem("user");
              setUser({});
            }}
          >
            Sign out
          </button>
          <p className="text-end p-2 text-white  rounded-xl border-white border">
            Signed in as: {user.username}
          </p>
        </div>
      )}

      <h1 className="w-52 mx-auto font-extrabold text-4xl m-auto text-white hover:text-black">
        <Link
          to="/"
          onClick={() => {
            resetSortByVals();
          }}
        >
          NC NEWS
        </Link>
      </h1>
    </div>
  );
}

export default Header;
