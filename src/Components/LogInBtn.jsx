import React from "react";
import { Link, useLocation } from "react-router-dom";

export const LogInBtn = () => {
  const location = useLocation();
  return (
    <p className="underline text-end p-2">
      <Link to={`/login?rtn=${location.pathname}`}>Log in</Link>
    </p>
  );
};
