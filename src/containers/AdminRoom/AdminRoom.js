import React, { Component } from "react";

import axios from "../../axios";
import classes from "./AdminRoom.module.css";

class AdminRoom extends Component {
  state = {
    auth: false,
    login: null,
    password: null,
    admins: null
  };

  checkingInputs = event => {
    if (event.target.name === "login") {
      this.setState({
        login: event.target.value
      });
    } else {
      this.setState({
        password: event.target.value
      });
    }
  };

  logIn = () => {
    this.state.admins.forEach(admin => {
      console.log(admin);

      if (
        admin.password === this.state.password &&
        admin.login === this.state.login
      ) {
        console.log(true);

        this.setState({
          auth: true
        });
      } else {
        this.setState({
          auth: false
        });
      }
    });
  };

  componentDidMount() {
    axios
      .get("/admins.json")
      .then(response => {
        // console.log(response.data);
        let arr = [];
        for (const key in response.data) {
          if (response.data.hasOwnProperty(key)) {
            const element = response.data[key];
            arr.push(element);
          }
        }
        this.setState({
          admins: arr
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let authClassName = classes.auth_false;
    this.state.auth
      ? (authClassName = classes.auth_true)
      : (authClassName = classes.auth_false);

    return (
      <div className={classes.AdminRoom}>
        <div className={authClassName}>
          <h2>please log in!</h2>
          <div className={classes.form}>
            <label htmlFor="login">
              Login*
              <input
                type="text"
                name="login"
                required
                onChange={this.checkingInputs}
              />
            </label>
            <label htmlFor="password">
              Password*
              <input
                type="password"
                name="password"
                required
                onChange={this.checkingInputs}
              />
            </label>
            <button className={classes.submit_false} onClick={this.logIn}>
              log in
            </button>
          </div>
        </div>
        <h2>Welcome to Admin room</h2>
        <h3>Create article</h3>
        <div className={classes.form}>
          <label htmlFor="title">
            Article title
            <input type="text" name="title" required />
          </label>
          <label htmlFor="description">
            Article description
            <input type="text" name="description" required />
          </label>
          <label htmlFor="imgURL">
            Set image URL
            <input type="text" name="imgURL" required />
          </label>
        </div>
      </div>
    );
  }
}

export default AdminRoom;
