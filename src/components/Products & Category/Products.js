import { Component } from "react";
import { connect } from "react-redux";

import Product from "./Product";

class Products extends Component {
  constructor() {
    super();
    this.state = {
      productList: [],
    };
  }

  productsQuerry = `
{
  categories {
    name
    products {
      name
      id
      inStock
      gallery
      description
      category
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
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
}
`;

  fetchData() {
    fetch("http://localhost:4000/", {
      body: JSON.stringify({ query: this.productsQuerry }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Dnt: "1",
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          productList: data.data.categories[this.props.filter].products,
        });
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filter !== this.props.filter) {
      this.fetchData();
    }
  }

  render() {
    const { productList } = this.state;

    if (productList.length === 0) {
      return null;
    }
    return (
      <div>
        <div>
          {productList.map((item) => (
            <Product item={item} key={item.id} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  };
};

export default connect(mapStateToProps)(Products);
