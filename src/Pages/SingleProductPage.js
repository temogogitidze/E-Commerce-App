import { Component } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import classes from "./SingleProduct.module.css";

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleItem: [],
      id: this.props.params,
      attributes: [],
      color: "#44FF03",
      imageId: 0,
    };
  }

  itemQuerry = `
  {
    product(id: "${this.props.params.id}"){
      id
      name
      inStock
      description
      category
      brand
      gallery
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices{
        currency{
          label
          symbol
        }
        amount
      }
    }
  }
  `;

  componentDidMount() {
    fetch("http://localhost:4000/", {
      body: JSON.stringify({ query: this.itemQuerry }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Dnt: "1",
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ singleItem: data.data.product });
      });
  }

  changeColor = (e) => {
    this.setState({ color: e.target.value });
  };

  addItem = (val) => {
    let temp = val;
    temp.checked = this.state.attributes;
    this.props.sendItem(temp);
  };

  handleSubmit = (event, singleItem) => {
    event.preventDefault();
    let dataArr = [];

    for (let index = 0; index < event.target.length; index++) {
      dataArr.push({ [event.target[index].name]: event.target[index].value });
    }
    this.setState({ attributes: dataArr });
    setTimeout(() => {
      this.addItem(singleItem);
    }, 200);
  };

  handleImage = (event) => {
    this.setState({ imageId: event });
  };

  render() {
    const { imageId, singleItem, color } = this.state;
    const { currency, opacity } = this.props;

    if (singleItem.length === 0) {
      return null;
    }

    return (
      <div
        style={{ opacity: opacity === true && "0.5" }}
        className={classes.container}
      >
        <div className={classes.left__container}>
          {singleItem.gallery.map((item, i) => (
            <img
              className={classes.left__image}
              src={item}
              alt="not found"
              key={i}
              onClick={() => this.handleImage(i)}
            />
          ))}
        </div>

        <div className={classes.center__image__container}>
          {
            <img
              alt="not found"
              className={classes.center__image}
              src={singleItem.gallery[imageId]}
            />
          }
        </div>
        <div className={classes.infoContainer}>
          <div className={classes.item__brand}>{singleItem.brand}</div>
          <div className={classes.item__name}>{singleItem.name}</div>

          <form
            onSubmit={(event) => this.handleSubmit(event, singleItem)}
            style={{
              opacity: !singleItem.inStock && "0.5",
              pointerEvents: !singleItem.inStock && "none",
            }}
          >
            {singleItem.attributes.map((item) => (
              <label key={item.id}>
                <p className={classes.attribute__selector}>{item.name}</p>
                <select
                  className={classes.attribute__options}
                  value={item.value}
                  onChange={this.changeColor}
                  style={{
                    backgroundColor: item.type === "swatch" && color,
                    color: item.type === "swatch" && color,
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
                      value={e.value}
                      key={e.id}
                    >
                      {e.id}
                    </option>
                  ))}
                </select>
              </label>
            ))}

            <div className={classes.item__priceTxt}>PRICE:</div>
            {
              <div className={classes.item__price}>
                {singleItem.prices[currency].currency.symbol}
                {singleItem.prices[currency].amount}
              </div>
            }
            {singleItem.inStock && (
              <button className={classes.cart__button} type="submit">
                ADD TO CART
              </button>
            )}
            {!singleItem.inStock && (
              <button
                className={`${classes.cart__button} ${
                  !singleItem.inStock && classes.cart__numb
                }`}
              >
                OUT OF STOCK
              </button>
            )}
          </form>

          <div
            className={classes.description}
            dangerouslySetInnerHTML={{
              __html: singleItem.description,
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
    opacity: state.opacity,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendItem: (val) => dispatch({ type: "add", obj: val }),
  };
};

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withParams(SingleProduct));
