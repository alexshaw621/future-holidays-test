import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import update from 'immutability-helper';
import jump from 'jump.js';
import { TimelineMax } from 'gsap/all';
import CartList from './CartList';

class MiniCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      cart: {}
    };
    this.toggle = this.toggle.bind(this);
    this.updateLineQuantity = this.updateLineQuantity.bind(this);
  }

  componentDidMount() {
    this.container = ReactDOM.findDOMNode(this);
    this.setupAnimations();
    this.updateCartInfo();

    document.body.addEventListener('cart.productAdded', (ev) => {
      // console.log('Minicart received cart.productAdding event');
      this.updateCartInfo(ev);
    });

    //AB TEST FLYOUT
    function gtag() {dataLayer.push(arguments)};
    gtag('event', 'optimize.callback', {
      callback: (value, name) => {
        if (name == 'FqRu0A32Qu2lgid_FhcrUw' && value == 1) {
          document.body.addEventListener("flyout", () => {
            this.open()
          })
          document.body.addEventListener('cart.productAdded', (ev) => {
            if ( window.innerWidth > 768 ){
              this.open();
            }
          });
        }
      }
    })

    // When minicart open and users clicks outside it, close the dialog
    document.addEventListener('click', (ev) => {
      let isClickInside = this.container.contains(event.target);
      const flyout = document.querySelector('.ProductAddedBanner');
      

      if (this.state.open && !isClickInside && !flyout.contains(ev.target)) {
        this.close(ev);
      }

      if (typeof ev.target.className === 'string' && ev.target.className.indexOf('js-close') > -1 && this.state.open) {
        this.close(ev);
      }
    });

    // Check if we have a logged in customer
    this.setState({
      customerName: ReactDOM.findDOMNode(this).parentNode.dataset.loggedIn
    });
  }

  setupAnimations() {
    const container = this.container;
    const dropdown = container.querySelector('.MiniCart__dropdown');
    const dropdownSections = container.querySelector('.MiniCart__contents');
    const buttonDeco = container.querySelector('.MiniCart__toggle .background');

    this.tl = new TimelineMax({});
    this.tl.set(dropdown, { display: 'grid', immediateRender: false });
    this.tl.from(dropdown, 0.25, {
      y: 100,
      opacity: 0,
      ease: Back.easeOut.config(1.7)
    });
    this.tl.to(buttonDeco, 0.6, { rotation: 140 }, '-=0.45');
    this.tl.staggerFrom(
      dropdownSections,
      0.3,
      {
        y: '10%',
        opacity: 0,
        ease: Back.easeOut.config(1.3)
      },
      0.1
    );
    this.tl.pause();
  }

  toggle(ev) {
    ev.preventDefault();

    if (this.state.open) {
      this.close();
      
    } else {
      this.open();

    }
  }

  open() {

    this.setState({ open: true }, () => {
      const container = this.container;
      const dropdown = container.querySelector('.MiniCart__dropdown');
      const freeShippingBar = document.querySelector('#fsb_background');
      let paddingTop = 0;

      if (freeShippingBar != null) {
        paddingTop = freeShippingBar.scrollHeight + 'px';
      }
      dropdown.style.paddingTop = paddingTop;

      this.tl.play();
      //AB Test Product Block In Cart
      //dataLayer.push({'event': 'optimize.activate'});
    });
    document.querySelector('html').style.overflowY = "hidden"
  }

  close(e) {
    e.preventDefault();
    this.setState({ open: false }, () => {
      this.tl.reverse();
    });
    document.querySelector('html').style.overflowY = "visible"
  }

  updateCartInfo(ev) {
    // console.log('Minicart: Initiate the Cart update process');
    // Get Cart Info
    axios
      .get('/cart.js', { headers: { Pragma: 'no-cache' } })
      .then((response) => {
        const newState = update(this.state.cart, {
          $set: response.data
        });

        this.setState({ cart: newState }, () => {
          // When reacting to add to cart events, broadcast the update
          // (excludes the initial state update)
          if (ev) {
            const minicartUpdated = new CustomEvent('cart.cartUpdated', {
              detail: response.data
            });
            document.body.dispatchEvent(minicartUpdated);

            // @Request: Enable Flash cart.
            // this.open();
            // jump(document.querySelector('.Header'), {
            //   duration: 600,
            //   offset: -200
            // });

            setTimeout(() => {
              document.querySelector('.MiniCart__toggle .icon').classList.remove('bounce');
              document.querySelector('.MiniCart__toggle .icon').classList.remove('animated');
            }, 400)
          }
          
        });
        return true;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateLineQuantity(productVariantId, newQuantity) {
    axios
      .post('/cart/update.js', {
        updates: { [productVariantId]: newQuantity }
      })
      .then((response) => {
        const newState = update(this.state.cart, {
          $set: response.data
        });
        this.setState({ cart: newState });
        // console.log('Cart has updated with the data: ', newState);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  miniCartFooter() {
    return (
      <div>
        <ul className="MiniCart__totals">
          {this.state.cart.total_discount > 0 && (
            <li>
              <span className="label">Discounts</span>
              <span className="discount">
                ${(this.state.cart.total_discount / 100 ).toFixed(2)}
              </span>
            </li>
          )}
          <li className="subtotal">
            <span className="label">Subtotal</span>
            <span className="total">
              ${(this.state.cart.total_price / 100 ).toFixed(2)}
            </span>
          </li>
          <li className="notes">Shipping & taxes calculated at checkout</li>
        </ul>
        <div className="cart-notes">
          <label htmlFor="CartSpecialInstructions">{theme.strings.cartNote}</label>
          <textarea name="note" id="CartSpecialInstructions"></textarea>
        </div>
        {
          this.state.cart.item_count > 0 && <div className="route-div" desktop-align="center"></div> 
        }
        <div className="options">
          <a href="/cart" className="Button Button--outline Button--viewCart">View Cart</a>
          <input type="submit" name="checkout" className="Button Button--primary Button--checkout" value="Checkout" />
        </div>
        {this.renderUserAccountOptions()}
      </div>
    );
  }

  renderUserAccountOptions() {
    if (this.state.customerName !== '') {
      return (
        <div className="Nav">
          <div className="header">Hello, {this.state.customerName}!</div>
          <a href="/account" className="Nav__item">
            My Account
          </a>
          <a href="/account/logout" className="Nav__item" data-no-swup>
            Sign Out
          </a>
        </div>
      );
    } else {
      return (
        <div className="Nav">
          <a href="/account/login" className="Nav__item">
            Sign In
          </a>
          <a href="/account/register" className="Nav__item">
            Create Account
          </a>
        </div>
      );
    }
  }

  render() {
    let cartIcon;
    if (this.state.cart.item_count > 0) {
      cartIcon = 'cartFull';
    } else {
      cartIcon = 'cartEmpty';
    }

    return (
      <div className="MiniCartButton">
        <a
          href="/cart"
          className="Button Button--noLayout MiniCart__toggle"
          onClick={this.toggle}
        >
          <svg viewBox="0 0 500 501" className="icon">
            <g transform="translate(107 54)" fillRule="nonzero" fill="none">
              <path
                d="M24.828 398.537h238.344c13.904 0 24.828-10.732 24.828-24.39v-224.39c0-13.66-10.924-24.391-24.828-24.391h-39.724V79.024C223.448 35.61 187.697 0 144 0c-43.697 0-79.448 35.61-79.448 79.024v46.342H24.828C10.924 125.366 0 136.098 0 149.756v224.39c0 13.171 10.924 24.39 24.828 24.39zm49.655-320c0-38.05 31.283-69.269 69.517-69.269 38.234 0 69.517 31.22 69.517 69.269v46.341H74.483V78.537zM9.93 149.757c0-8.294 6.455-14.635 14.897-14.635h39.724v98.537h9.93v-98.537h139.035v98.537h9.931v-98.537h39.724c8.442 0 14.897 6.341 14.897 14.634v224.39c0 8.293-6.455 14.634-14.897 14.634H24.828c-8.442 0-14.897-6.341-14.897-14.634v-224.39z"
                fill="currentColor"
              />
              {this.state.cart.item_count > 0 ? (
                <circle fill="#35D8CF" cx="144" cy="288" r="48" />
              ): ''}
            </g>
          </svg>
          {this.state.cart.item_count > 0 ? (
            <div className="item_count">
              {this.state.cart.item_count}
            </div>
          ): ''}
          <span className="backgroundll" />
        </a>

        <form action="/cart" method="post" noValidate>
          <div className="MiniCart__dropdown">
            <span className="arrow" />
            <header className="MiniCart__header">
              {window.innerWidth < 750 ? (
                <a href="/cart">
                  <h6><u>Shopping Cart</u></h6>
                </a>
              ): <h6>Shopping Cart</h6>}

              <button className="Button Button--close js-close">close</button>
            </header>
            <div className="MiniCart__contents">
              <CartList
                cart={this.state.cart}
                products={this.state.cart.items}
                updateLineQuantity={this.updateLineQuantity}
              />
            </div>
            <div className="MiniCart__footer">
              {this.miniCartFooter()}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const init = (el) => {
  const element = <MiniCart />;
  ReactDOM.render(element, el);
};

export default init;
