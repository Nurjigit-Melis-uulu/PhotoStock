import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import classes from "./Item.module.css";

function Item(props) {
  return (
    <div className={classes.Item}>
      <img src={props.img} alt="" />
      <div className={classes.desc}>
        <h2>{props.title}</h2>
        <div className={classes.dop_info}>
          <p>
            {props.callout}
            <Link
              onClick={() => {
                props.onSendID(props.id);
              }}
              to="/article"
            >
              Read more
            </Link>
          </p>
          <div className={classes.date}>
            <small>{props.date}</small>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onSendID: id => dispatch({ type: "SEND_ID", id })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Item);
