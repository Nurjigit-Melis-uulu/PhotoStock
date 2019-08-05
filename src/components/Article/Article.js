import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import classes from "./Article.module.css";

function Article(props) {
  // console.log(props.articleID);

  let article = (
    <article>
      No Article <Link to="/">Back to home</Link>
    </article>
  );

  if (props.articleID) {
    props.data.forEach(element => {
      if (element.id === props.articleID) {
        article = (
          <article>
            <img src={element.img} alt="" />
            <h2>{element.title}</h2>
            <p>{element.description}</p>
          </article>
        );
      }
    });
  } else {
    article = (
      <article>
        <h2>
          No Article <Link to="/">Back to home</Link>
        </h2>
      </article>
    );
  }

  return <div className={classes.Article}>{article}</div>;
}

const mapStateToProps = state => {
  return {
    articleID: state.articleID,
    data: state.data
  };
};

export default connect(
  mapStateToProps,
  null
)(Article);
