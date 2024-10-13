import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="header bg-red-500">
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/createAdmin">CreateAdmin</Link>
      </div>
      <div>
        <Link to="/allAdmin">AllAdmin</Link>
      </div>
    </div>
  );
};
