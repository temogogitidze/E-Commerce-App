import { Component } from "react";
import { connect } from "react-redux";
import classes from "./CurrenctySwitcher.module.css";

class CurrencySwitcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: [],
    };
  }

  currencyQuery = `{
        currencies {
          label
          symbol
        }
      }`;

  componentDidMount() {
    fetch("http://localhost:4000/", {
      body: JSON.stringify({ query: this.currencyQuery }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Dnt: "1",
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ currency: data.data.currencies });
        this.setCurrencySymbol(data.data.currencies);
      });
  }

  setCurrencySymbol = (val) => {
    this.props.sendValue(val);
  };

  render() {
    const { currency } = this.state;

    return (
      <div>
        <div className={classes.container}>
          {currency.map((curr, i) => (
            <div
              onClick={() => this.props.switchCurr(i)}
              className={`${classes.currencies} ${
                this.props.currency === i ? classes.active : undefined
              } `}
              key={curr.label}
            >
              {curr.symbol} {curr.label}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    switchCurr: (val) => dispatch({ type: "switchCurr", curr: val }),
    sendValue: (val) => dispatch({ type: "symbolValue", symbol: val }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySwitcher);
