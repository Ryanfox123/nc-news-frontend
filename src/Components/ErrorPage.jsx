import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="text-center p-10">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="underline">
        Go back to Home
      </Link>
    </div>
  );
}

export default ErrorPage;
