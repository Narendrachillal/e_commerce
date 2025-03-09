import React, { useContext, useMemo, useRef, useState } from "react";
import "./navbar.css";
import logo from "../assets/logo.png";
import cart_icon from "../assets/cart_icon.png";
import { Link, useLocation } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import dropdown_icon from "../assets/dropdown_icon.png";

const Navbar = () => {
  const { getTotalCartItems } = useContext(ShopContext);
  const location = useLocation();

  const MenuItem = useMemo(
    () => [
      { name: "Shop", path: "/" },
      { name: "Men", path: "/mens" },
      { name: "Women", path: "/womens" },
      { name: "Kids", path: "/kids" },
    ],
    []
  );
  return (
    <div className="navbar">
      <Link to={"/"} style={{ textDecoration: "none" }}>
        {" "}
        <div className="nav-logo">
          <img src={logo} alt="logo" />
          <p>SHOPPER</p>
        </div>
      </Link>
      <img className="nav-dropdown" src={dropdown_icon} alt="" />

      <ul className="nav-menu">
        {MenuItem.map((item) => (
          <li key={item.path}>
            <Link style={{ textDecoration: "none" }} to={item.path}>
              {item.name}
            </Link>
            {location.pathname === item.path && <hr />}
          </li>
        ))}
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>

        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
