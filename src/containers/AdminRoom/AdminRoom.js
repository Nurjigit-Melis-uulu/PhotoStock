import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "../../axios";
import classes from "./AdminRoom.module.css";

class AdminRoom extends Component {
  state = {
    login: null,
    password: null,
    admins: null,
    adminName: "Admin"
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
      if (
        admin.password === this.state.password &&
        admin.login === this.state.login
      ) {
        this.props.onAuth(true);
        this.setState({
          adminName: admin.login
        });
      } else {
        this.props.onAuth(false);
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
    this.props.auth
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
        <h2>Welcome {this.state.adminName}</h2>
        <h3>Create article</h3>
        <div className={classes.form}>
          <label htmlFor="title">
            Article title
            <input type="text" name="title" required />
          </label>
          <label htmlFor="callout">
            Article callout
            <input type="text" name="callout" required />
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

const mapDispatchToProps = dispatch => {
  return {
    onAuth: auth => dispatch({ type: "AUTH", auth })
  };
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminRoom);
