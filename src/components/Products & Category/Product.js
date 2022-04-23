import { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import classes from "./Product.module.css";
import AddToCart from "../../assets/AddToCart.png";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCart: false,
      attributes: [],
      color: "#44FF03",
    };
  }

  showFn = (val) => {
    this.setState({ showCart: val });
  };

  addItem = (val) => {
    const temp = val;
    temp.checked = this.state.attributes;
    this.props.sendItem(temp);
  };

  handleSubmit = (event, item) => {
    event.preventDefault();
    const dataArr = [];
    for (let index = 0; index < event.target.length; index++) {
      dataArr.push({ [event.target[index].name]: event.target[index].value });
    }
    this.setState({ attributes: dataArr });
    setTimeout(() => {
      this.addItem(item);
    }, 200);
  };

  colorChange = (event) => {
    this.setState({ color: event.target.value });
  };

  render() {
    const { showCart, color } = this.state;
    const { item, currency } = this.props;

    return (
      <div className={classes.container}>
        <div
          className={`${classes.column} ${
            !item.inStock && classes.outOfStock
          } `}
        >
          <div
            className={classes.card}
            onMouseEnter={() => this.showFn(true)}
            onMouseLeave={() => this.showFn(false)}
          >
            <NavLink to={`/product/${item.id}`}>
              {!item.inStock && (
                <p className={classes.outOfStockText}>OUT OF STOCK</p>
              )}
              <img
                src={item.gallery[0]}
                className={classes.product__image}
                alt="not found"
              />
            </NavLink>

            <p className={classes.item__name}>
              {item.brand} {item.name}
            </p>
            <div className={classes.item__price}>
              {item.prices[currency].currency.symbol}
              {item.prices[currency].amount}
            </div>
            <div>
              <form
                style={{ pointerEvents: !item.inStock && "none" }}
                className={classes.selector__container}
                onSubmit={(event) => {
                  this.handleSubmit(event, item);
                }}
              >
                {item.attributes.map((item) => (
                  <label className={classes.attribute__selector} key={item.id}>
                    <p>{item.name}</p>
                    <select
                      onChange={this.colorChange}
                      value={item.value}
                      style={{
                        backgroundColor: item.type === "swatch" && color,
                        color: item.type === "swatch" && color,
                        width: item.type === "swatch" && "45px",
                        borderRadius: "10px",
                      }}
                      name={item.name}
                      id={item.id}
                    >
                      {item.items.map((e) => (
                        <option
                          style={{
                            backgroundColor: e.value,
                            color: e.value,
                          }}
                          key={e.id}
                        >
                          {item.type === "swatch" ? e.id : e.value}
                        </option>
                      ))}
                    </select>
                  </label>
                ))}

                {showCart && item.inStock && (
                  <button className={classes.cart__container}>
                    <img
                      className={classes.cart}
                      src={AddToCart}
                      alt="not found"
                    />
                  </button>
                )}
              </form>
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

    currency: state.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendItem: (val) => dispatch({ type: "add", obj: val }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Product);
