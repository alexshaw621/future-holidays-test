import React, { Component } from 'react';
import CartLineItem from './CartLineItem';

class CartList extends Component {
  render() {
    const products = this.props.products;
    if (products == undefined || products.length < 1) {
      return (
        <div className="Loop Loop--minicart">
          <div className="empty-loop">
            You don't have any items in your cart.
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="Loop Loop--minicart">
            {products.map((product) => (
              <CartLineItem
                product={product}
                key={product.id}
                updateLineQuantity={this.props.updateLineQuantity}
              />
            ))}
          </div>
        </div>
      );
    }
  }
}

export default CartList;
