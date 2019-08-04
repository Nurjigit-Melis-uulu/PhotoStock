import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import axios from "./axios";

import "./App.css";
import Homepage from "./components/Homepage/Homepage";
import Contacts from "./components/Contacts/Contacts";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Article from "./components/Article/Article";
import AdminRoom from "./containers/AdminRoom/AdminRoom";

class App extends Component {
  componentDidMount() {
    axios
      .get("/articles.json")
      .then(response => {
        console.log(response.data);
        let arr = [];
        for (const key in response.data) {
          if (response.data.hasOwnProperty(key)) {
            const element = response.data[key];
            arr.push(element);
          }
        }
        this.props.onAddData(arr);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Route path="/" exact component={Homepage} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/article" component={Article} />
        <Route path="/adminRoom" component={AdminRoom} />
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddData: data => dispatch({ type: "ADD_DATA", data })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
