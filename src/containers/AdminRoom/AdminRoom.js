import React, { Component } from "react";
import classes from "./AdminRoom.module.css";

class AdminRoom extends Component {
  state = {};
  render() {
    return (
      <div className={classes.AdminRoom}>
        <h2>Welcome to Admin room</h2>
        <h3>Create article</h3>
        <label htmlFor="title">
          Article title
          <input type="text" name="title" />
        </label>
        <label htmlFor="description">
          Article description
          <input type="text" name="description" />
        </label>
        <label htmlFor="imgURL">
          set image URL
          <input type="text" name="imgURL" />
        </label>
      </div>
    );
  }
}

export default AdminRoom;
