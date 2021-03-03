import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

class QuantityInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    };

    this.handleChange = this.handleChange.bind(this);
    this.setQuantity = this.setQuantity.bind(this);
  }

  setQuantity(modifier) {
    let newQuantity = Number(this.state.quantity) + Number(modifier);
    if (newQuantity < 1) {
      return;
    }
    this.setState({ quantity: newQuantity });
  }

  handleChange(e) {
    this.setState({ quantity: e.target.value });
  }

  render() {
    return (
      <Fragment>
        <label htmlFor="Quantity" className="u-hidden">
          Quantity
        </label>
        <button type="button" onClick={() => this.setQuantity(-1)}>
          <svg viewBox="0 0 20 20" className="icon" width="1em" height="1em">
            <use xlinkHref="#icon-minus" />
          </svg>
        </button>
        <input
          type="number"
          id="Quantity"
          name="quantity"
          value={this.state.quantity}
          min="1"
          onChange={this.handleChange}
        />
        <button type="button" onClick={() => this.setQuantity(+1)}>
          <svg viewBox="0 0 20 20" className="icon" width="1em" height="1em">
            <use xlinkHref="#icon-plus" />
          </svg>
        </button>
      </Fragment>
    );
  }
}

const init = (el) => {
  const element = <QuantityInput />;
  ReactDOM.render(element, el);
};

export default init;
