import { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import CartDropdown from "../Dropdowns/CartDropdown";
import CurrencySwitcher from "../Dropdowns/CurrencySwitcher";

import logo from "../../assets/logo.png";
import Cart from "../../assets/Cart.png";
import Vector from "../../assets/Vector.png";
import classes from "./Navbar.module.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartBadgeQty: 0,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.itemsArr !== this.props.itemsArr) {
      this.setState({
        cartBadgeQty: this.props.itemsArr.reduce((acummulator, object) => {
          return acummulator + object.quantity;
        }, 0),
      });
    }
  }

  render() {
    const {
      filter,
      setFilterState,
      setOpacityState,
      currency,
      currencySymbol,
    } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <div className={classes.left__menu}>
            <NavLink
              to="/"
              onClick={() => setFilterState(0)}
              className={filter === 0 ? classes.active : undefined}
            >
              ALL
            </NavLink>
            <div className={classes.lmenu__categories}>
              <NavLink
                to="/"
                onClick={() => setFilterState(1)}
                className={filter === 1 ? classes.active : undefined}
              >
                CLOTHES
              </NavLink>
            </div>
            <div className={classes.lmenu__categories}>
              <NavLink
                to="/"
                onClick={() => setFilterState(2)}
                className={filter === 2 ? classes.active : undefined}
              >
                TECH
              </NavLink>
            </div>
          </div>
          <div className={classes.center__menu}>
            <NavLink to="/">
              <img src={logo} alt="not found" />
            </NavLink>
          </div>
          <div className={classes.right__menu}>
            <div className={classes.rmenu__categories}>
              <div className={classes.dropdown}>
                <button className={classes.dropbtn}>
                  <p className={classes.symbol}>
                    {currencySymbol && currencySymbol[currency].symbol}
                  </p>
                  <img
                    className={classes.vector}
                    alt="not found"
                    src={Vector}
                  />
                </button>
                <div className={classes.dropdown_content}>
                  <CurrencySwitcher />
                </div>
              </div>
            </div>
            <div className={classes.rmenu__categories}>
              <div
                onMouseEnter={() => setOpacityState(true)}
                onMouseLeave={() => setOpacityState(false)}
                className={classes.dropdown}
              >
                <button className={classes.dropbtn}>
                  <div className={classes.cart__badge}>
                    <img src={Cart} alt="not found" />
                    <div className={classes.badge}>
                      {this.state.cartBadgeQty}
                    </div>
                  </div>
                </button>
                <div className={classes.dropdown_content}>
                  <CartDropdown />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
    itemsArr: state.itemsArr,
    opacity: state.opacity,
    currency: state.currency,
    currencySymbol: state.currencySymbol,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFilterState: (val) => dispatch({ type: "set", filterState: val }),
    setOpacityState: (val) => dispatch({ type: "hover", opacityState: val }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
