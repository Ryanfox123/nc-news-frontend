import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Header() {
  const { user, setUser } = useContext(UserContext);
  return (
    <div className="bg-gradient-to-r from-custom-turq2 to-custom-turq h-36 shadow-md">
      {Object.keys(user).length === 0 ? (
        <p className="underline text-end p-2">
          <Link to="/login">Log in</Link>
        </p>
      ) : (
        <div className="flex flex-row justify-between p-2">
          <p
            className="hover:cursor-pointer underline"
            onClick={() => {
              setUser({});
            }}
          >
            Sign out
          </p>
          <p className="text-end p-2">
            <Link to="/login">Signed in as: {user.username}</Link>
          </p>
        </div>
      )}

      <h1 className="w-52 mx-auto font-extrabold text-4xl my-11">
        <Link
          to="/"
          onClick={() => {
            setSortByVals({});
          }}
        >
          NC NEWS
        </Link>
      </h1>
    </div>
  );
}

export default Header;
