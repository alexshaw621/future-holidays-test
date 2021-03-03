import React, { Component } from 'react';

class CartLineItem extends Component {
  increaseQuantity = (e) => {
    e.preventDefault();
    this.props.updateLineQuantity(
      this.props.product.variant_id,
      this.props.product.quantity + 1
    );
  };

  decreaseQuantity = (e) => {
    e.preventDefault();
    this.props.updateLineQuantity(
      this.props.product.variant_id,
      this.props.product.quantity - 1
    );
  };

  removeProduct = () => {
    this.props.updateLineQuantity(this.props.product.variant_id, 0);
  };

  imgURL(src, size) {
    // remove any current image size then add the new image size
    return src.replace(/_(pico|icon|thumb|small|compact|medium|large|grande|original|1024x1024|2048x2048|master)+\./g, '.')
      .replace(/\.jpg|\.png|\.gif|\.jpeg/g, (match) => {
        return '_'+size+match;
      });
  };

  render() {
    const product = this.props.product;
    const thumb_image = this.imgURL(product.image, 'medium');
    
    return (
      <div className="Card">
        <figure className="Card__figure">
          <a href={product.url}>
            <img src={thumb_image} alt={product.product_title} />
          </a>
        </figure>
        <div className="Card__details">
          <p className="Card__title">
            <a href={product.url}>
              {product.product_title}{' '}
              {product.variant_title && <small>{product.variant_title}</small>}
            </a>
          </p>
          <div className="quantity_and_amount">
            <div className="quantity">
              <button onClick={this.decreaseQuantity}>-</button>
              <span className="value">{product.quantity}</span>
              <button onClick={this.increaseQuantity}>+</button>
            </div>
            <div className="amount">${(product.line_price / 100).toFixed(2)}</div>
            <button
              className="Button Button--noLayout delete-line"
              onClick={this.removeProduct}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CartLineItem;
