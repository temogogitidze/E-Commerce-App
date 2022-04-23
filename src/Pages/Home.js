import { Component } from "react";
import { connect } from "react-redux";

import Products from "../components/Products & Category/Products";
import Category from "../components/Products & Category/Category";

class Home extends Component {
  render() {
    const { opacity } = this.props;
    return (
      <div style={{ opacity: opacity === true && "0.5" }}>
        <Category />
        <Products />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    opacity: state.opacity,
  };
};

export default connect(mapStateToProps)(Home);
