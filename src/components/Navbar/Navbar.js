import React from "react";
import classes from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

function Navbar(props) {
  return (
    <nav className={classes.Navbar}>
      <ul>
        <li>
          <NavLink to="/" exact>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/contacts">Contacs us</NavLink>
        </li>
        <li>
          <NavLink to="/adminRoom">Admin room</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
