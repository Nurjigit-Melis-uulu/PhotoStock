import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "../../axios";
import classes from "./AdminRoom.module.css";

class AdminRoom extends Component {
  state = {
    login: null,
    password: null,
    admins: null,
    adminName: "Admin",
    imgURL: null,
    imgURLs: null
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
    let stop = false;
    this.state.admins.forEach(admin => {
      if (
        admin.password === this.state.password &&
        admin.login === this.state.login
      ) {
        this.props.onAuth(true);
        this.setState({
          adminName: admin.login
        });
        stop = true;
      } else if (stop === false) {
        this.props.onAuth(false);
      }
    });
  };

  addImgURL = event => {
    if (this.state.imgURLs) {
      this.state.imgURLs.forEach(url => {
        if (url !== event.target.value) {
          this.setState({
            imgURL: event.target.value
          });
        }
      });
    } else {
      this.setState({
        imgURL: event.target.value
      });
    }
    console.log(this.state.imgURL);
  };

  imgPriview = () => {
    if (this.state.imgURLs) {
      if (this.state.imgURL) {
        this.state.imgURLs.forEach(url => {
          if (url !== this.state.imgURL) {
            let arr = [...this.state.imgURLs];
            arr.push(this.state.imgURL);
            this.setState({
              imgURLs: arr
            });
          }
        });
      }
    } else {
      if (this.state.imgURL) {
        let arr = [];
        arr.push(this.state.imgURL);
        this.setState({
          imgURLs: arr
        });
      }
    }
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
    let imagePriviewClassName = classes.img_priview_empty;
    let images = "Images priview";

    if (this.state.imgURLs) {
      images = this.state.imgURLs.map(img => {
        return <img src={img} alt="" key={img} />;
      });
      imagePriviewClassName = classes.img_priview;
    } else {
      images = "Images priview";
      imagePriviewClassName = classes.img_priview_empty;
    }

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
            <textarea rows="10" cols="10" name="description" />
          </label>
          <label htmlFor="imgURL">
            Set image URL
            <div>
              <input
                type="text"
                name="imgURL"
                required
                onChange={this.addImgURL}
              />
              <button onClick={this.imgPriview}>Add image</button>
            </div>
          </label>
        </div>
        <div className={imagePriviewClassName}>{images}</div>
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
