import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Select, { components } from 'react-select';

const theme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#f2f2f2',
    primary: '#60707b'
  }
});

const customStyles = {
  valueContainer: (base, state) => {
    return {
      ...base,
      padding: '0.4rem 0.8rem',
      fontSize: '16px'
    };
  }
};

class ProductSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      params: {}
    };
    this.getLabel = this.getLabel.bind(this);
  }

  componentDidMount() {
    const parentNode = ReactDOM.findDOMNode(this).parentNode;

    const params = JSON.parse(parentNode.dataset.params);

    // Format the options to be consumed by the select component
    const options = JSON.parse(parentNode.dataset.options);
    const formattedOptions = options.map((option) => {
      return { value: option, label: option };
    });

    this.setState(
      {
        options: formattedOptions,
        params: params
      },
      () => {
        this.getInitialValue();
      }
    );

    this.selector = parentNode.parentNode.querySelector('select');
  }

  getLabel(option) {
    return (
      <div
        className="Product__select__option"
        data-value={`${this.state.params.material} ${option.label}`}
      >
        <div className="image" />
        <div className="title">{option.label}</div>
      </div>
    );
  }

  onVariantSelected(option) {
    // console.log(option.value);
    this.setState({ selectedVariant: option }, () => {
      this.selector.value = option.value;
      this.selector.dispatchEvent(new Event('change'));
      
      //Jquery change event trigger for istock notifications 
      $(this.selector).trigger('change')
    });
    // this.selector.value = option.value;
  }

  getInitialValue() {
    if (this.state.params.selected) {
      let selectedIndex = this.state.options.findIndex(
        (element) => element.value === this.state.params.selected
      );
      this.setState({
        selectedVariant: this.state.options[selectedIndex]
      });
    } else {
      this.setState({
        selectedVariant: this.state.options[0]
      });
    }
  }

  render() {
    return (
      <div>
        <Select
          getOptionLabel={this.getLabel}
          getOptionValue={(option) => option}
          onChange={(option) => this.onVariantSelected(option)}
          value={this.state.selectedVariant}
          options={this.state.options}
          placeholder="Choose a product option"
          className="Product__select"
          menuPlacement="auto"
          styles={customStyles}
          theme={theme}
        />
      </div>
    );
  }
}

const init = (el) => {
  const element = <ProductSelector />;
  ReactDOM.render(element, el.querySelector('.component-wrapper'));
};

export default init;
