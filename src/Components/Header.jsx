import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <p className="underline text-end p-2">
        <Link to="/">Home</Link>
      </p>
      <h1 className="w-52 mx-auto font-extrabold text-4xl my-11">NC News</h1>
    </div>
  );
}

export default Header;
