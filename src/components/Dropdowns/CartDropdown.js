import { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import classes from "./CartDropdown.module.css";

class CartDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemQuantity: 0,
      totalPrice: 0,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.itemsArr !== this.props.itemsArr) {
      this.setState({
        itemQuantity: this.props.itemsArr.reduce((acummulator, object) => {
          return acummulator + object.quantity;
        }, 0),
      });
    }

    if (prevProps.itemsArr !== this.props.itemsArr) {
      this.setState({
        totalPrice: this.props.itemsArr.reduce((acummulator, total) => {
          return (
            acummulator +
            total.prices[this.props.currency].amount * total.quantity
          );
        }, 0),
      });
    }
  }

  render() {
    const { itemsArr, currency, currencySymbol } = this.props;
    const { totalPrice, itemQuantity } = this.state;

    if (itemsArr.length === 0) {
      return (
        <div className={classes.container}>
          <div className={classes.bag}>Your cart is empty</div>
          <NavLink to="/mycart" className={classes.view__cart}>
            VIEW CART
          </NavLink>
          <p className={classes.checkout}>CHECK OUT</p>
        </div>
      );
    }

    return (
      <div className={classes.container}>
        <div className={classes.bag}>
          My Bag,
          <span className={classes.items}>{itemQuantity}</span>
        </div>
        {itemsArr.map((item, i) => (
          <div className={classes.wrapper} key={i}>
            <div className={classes.left__menu}>
              <div className={classes.item__brand}>{item.brand}</div>
              <div className={classes.item__name}>{item.name}</div>
              <div className={classes.item__price}>
                {currencySymbol[currency].symbol}
                {parseFloat(
                  item.quantity * item.prices[currency].amount
                ).toFixed(2)}
              </div>
              <div className={classes.attribute__container}>
                {item.checked.map((item, i) => (
                  <div key={i}>
                    <p className={classes.attribute__name}>
                      {Object.keys(item)}
                    </p>
                    <div className={classes.attribute__value}>
                      {Object.keys(item).includes("Size") && (
                        <button className={classes.size__square}>
                          {Object.values(item)}
                        </button>
                      )}
                      {Object.keys(item).includes("Color") ? (
                        <div
                          className={classes.color__square}
                          style={{
                            color: Object.values(item),
                            backgroundColor: Object.values(item),
                          }}
                        ></div>
                      ) : (
                        <p>
                          {!Object.keys(item).includes("Size") &&
                            Object.values(item)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={classes.right__menu}>
              <div className={classes.quantity__buttons}>
                <button
                  type="submit"
                  className={classes.btn__plus__minus}
                  onClick={() => this.props.addToCart(item)}
                >
                  +
                </button>
                <div className={classes.quantity}>{item.quantity}</div>
                <button
                  type="submit"
                  className={classes.btn__plus__minus}
                  onClick={() => this.props.removeItem(item)}
                >
                  -
                </button>
              </div>
              <img
                className={classes.cart__img}
                src={item.gallery[0]}
                alt="not found"
              />
            </div>
          </div>
        ))}
        <div className={classes.total__container}>
          <div className={classes.totalTxt}>Total</div>
          <div className={classes.totalAmount}>
            {currencySymbol[currency].symbol}
            {parseFloat(totalPrice).toFixed(2)}
          </div>
        </div>
        <NavLink to="/mycart" className={classes.view__cart}>
          VIEW CART
        </NavLink>
        <p className={classes.checkout}>CHECK OUT</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
    itemsArr: state.itemsArr,
    currencySymbol: state.currencySymbol,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (val) => dispatch({ type: "add", obj: val }),
    removeItem: (val) => dispatch({ type: "remove", obj: val }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartDropdown);
