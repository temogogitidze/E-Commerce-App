import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "./Category.module.css";

class Category extends Component {
  render() {
    const { filter } = this.props;

    return (
      <div className={styles.category}>
        {filter === 0 && "ALL"}
        {filter === 1 && "CLOTHES"}
        {filter === 2 && "TECH"}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  };
};

export default connect(mapStateToProps)(Category);
