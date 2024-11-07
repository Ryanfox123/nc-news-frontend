import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Header({ resetSortByVals }) {
  const { user, setUser } = useContext(UserContext);
  return (
    <div className="bg-gradient-to-r from-custom-turq2 to-custom-turq h-40 shadow-md">
      {Object.keys(user).length === 0 ? (
        <p className="underline text-end p-2">
          <Link to="/login">Log in</Link>
        </p>
      ) : (
        <div className="flex flex-row justify-between p-2">
          <button
            className="hover:cursor-pointer bg-gray-200 p-2 hover:bg-gray-300 rounded-xl border-white border"
            onClick={() => {
              setUser({});
            }}
          >
            Sign out
          </button>
          <p className="text-end p-2">
            <Link to="/login">Signed in as: {user.username}</Link>
          </p>
        </div>
      )}

      <h1 className="w-52 mx-auto font-extrabold text-4xl m-auto">
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
