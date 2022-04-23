import { Component } from "react";
import { connect } from "react-redux";

import Slider from "../components/Slider/Slider";
import classes from "./Cart.module.css";

class Cart extends Component {
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

  componentDidMount() {
    setTimeout(() => {
      this.componentDidUpdate(this.props.itemsArr);
    }, 50);
  }

  render() {
    const {
      itemsArr,
      currency,
      addToCart,
      removeItem,
      opacity,
      currencySymbol,
    } = this.props;
    const { totalPrice, itemQuantity } = this.state;

    if (itemsArr.length === 0) {
      return <div className={classes.cart__empty}>Your cart is empty</div>;
    }

    return (
      <div
        style={{ opacity: opacity === true && "0.5" }}
        className={classes.container}
      >
        <div className={classes.cart__text}>CART</div>
        {itemsArr.length !== 0 &&
          itemsArr.map((item) => (
            <div className={classes.wrapper} key={item.id}>
              <div className={classes.left}>
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
                      <div className={classes.attribute__option}>
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
              <div className={classes.right}>
                <div className={classes.quantity__buttons}>
                  <button
                    type="submit"
                    className={classes.plus__minus}
                    onClick={() => addToCart(item)}
                  >
                    +
                  </button>
                  <div className={classes.quantity}>{item.quantity}</div>
                  <button
                    type="submit"
                    className={classes.plus__minus}
                    onClick={() => removeItem(item)}
                  >
                    -
                  </button>
                </div>
                <Slider slides={item.gallery} />
              </div>
            </div>
          ))}
        <div className={classes.total__container}>
          <div>
            Tax:
            <span className={classes.total__values}>
              {currencySymbol[currency].symbol}
              {parseFloat(totalPrice * 0.07).toFixed(2)}
            </span>
          </div>
          <div>
            Qty: <span className={classes.total__values}>{itemQuantity}</span>
          </div>
          <div className={classes.total__text}>
            Total:
            <span className={classes.total__values}>
              {currencySymbol[currency].symbol}
              {parseFloat(totalPrice).toFixed(2)}
            </span>
          </div>
          <button className={classes.order__button}>ORDER</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    itemsArr: state.itemsArr,
    currency: state.currency,
    opacity: state.opacity,
    currencySymbol: state.currencySymbol,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (val) => dispatch({ type: "add", obj: val }),
    removeItem: (val) => dispatch({ type: "remove", obj: val }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
