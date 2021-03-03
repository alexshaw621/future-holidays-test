import React, { Fragment,useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { TimelineMax } from 'gsap/all';
import './ProductAddedBanner.scss';

function ProductAddedBanner({node}) {

  const imageSrc = document.querySelector('.product__image img').src
  const title = document.querySelector('.product__title').innerText
  const type = document.querySelector('.product__type').innerText
  const tl = new TimelineMax({});
  const [cart, setCart] = useState({})
  const [count, setCount] = useState(0)

  const [isTest, setIsTest] = useState(false) 

  const updateCartInfo = (ev) => {
    // console.log('Minicart: Initiate the Cart update process');
    // Get Cart Info
    axios
      .get('/cart.js', { headers: { Pragma: 'no-cache' } })
      .then((response) => {
        
        setCart(response.data)
        return true;

      })
      .catch((error) => {
        console.log(error);
      });
  }

  const flyoutABTest = () => {//AB TEST FLYOUT
    function gtag() {dataLayer.push(arguments)};
    gtag('event', 'optimize.callback', {
      callback: (value, name) => {
        if (name == 'FqRu0A32Qu2lgid_FhcrUw' && value == 1) {
          setIsTest(true)
          updateCartInfo()
          setupAnimation()
          handleSwipe()
        }
      }
    })
  }
  
  useEffect(() => {
    flyoutABTest()//AB TEST FLYOUT
  },[])

  useEffect(() => {
    setCount(cart.item_count)
  },[cart])


  function setupAnimation(){
    tl.set(node, { display: 'block', immediateRender: false });
    tl.from(node, 0.25, {
      yPercent: -100,
      opacity: 0,
      ease: Back.easeOut.config(1.7)
    });
    tl.pause();
    console.log(tl)
  }

  document.body.addEventListener("cart.productAdded", (e) => {
      updateCartInfo()
      tl.play()
      setTimeout(() => {
        tl.reverse()
      },6000)
  })

  document.body.addEventListener("flyout", (e) => {
    tl.reverse()
  })

  const handleSwipe = () => {
    let xDown = null;                                                        
    let yDown = null;
    
    node.addEventListener('touchstart', handleTouchStart, false);        
    node.addEventListener('touchmove', handleTouchMove, false);

    const getTouches = (evt) => {
      return evt.touches ||             // browser API
             evt.originalEvent.touches; // jQuery
    } 

    function handleTouchStart(evt) {
      const firstTouch = getTouches(evt)[0];                                      
      xDown = firstTouch.clientX;                                      
      yDown = firstTouch.clientY;                                    
    };                                                

    function handleTouchMove(evt){
      if ( ! xDown || ! yDown ) {
        return;
      }

      var xUp = evt.touches[0].clientX;                                    
      var yUp = evt.touches[0].clientY;

      var xDiff = xDown - xUp;
      var yDiff = yDown - yUp;

      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
          if ( xDiff > 0 ) {
              console.log("left")
          } else {
            console.log("right")
          }                       
      } else {
          if ( yDiff > 0 ) {
              tl.reverse() 
              console.log("up")
          } else { 
            console.log("down")
          }                                                                 
      }
      /* reset values */
      xDown = null;
      yDown = null;
    }
  }

  function triggerMiniCart() {
    const flyoutClicked = new CustomEvent('flyout');
    document.body.dispatchEvent(flyoutClicked,{});
  }

  return (
    <Fragment>
    { isTest ? ( 
    <div className="wrapper">
      <figure>
        <img src={imageSrc} alt={title}/>
        <figcaption>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25">
            <g fill="none" fillRule="evenodd" transform="translate(1 1)">
              <circle cx="11.5" cy="11.5" r="11.5" fill="#FFF" stroke="#000" strokeWidth=".5"/>
              <path fill="#000" fillRule="nonzero" d="M17.5964452,7.00068736 C17.49665,7.00455067 17.4023643,7.0465629 17.3337762,7.1177285 L9.16716053,15.1233687 L5.62113003,12.3377895 C5.51449466,12.2541159 5.37041729,12.2325784 5.24318788,12.2812928 C5.11595847,12.3300072 5.0249136,12.4415696 5.00435999,12.5739422 C4.98380638,12.7063147 5.03686782,12.8393791 5.14355016,12.9229952 L8.96418909,15.9192484 C9.11893444,16.0391887 9.34138381,16.0239344 9.47758745,15.8840424 L17.8829931,7.64432 C17.998045,7.53566122 18.0319919,7.36830572 17.9680967,7.22476589 C17.9042014,7.08122606 17.7559537,6.99180626 17.5964452,7.00059373 L17.5964452,7.00068736 Z"/>
            </g>
          </svg>
        </figcaption>
      </figure> 

      <div className="details">
        <p className="title">{title}</p>
        <p className="type">{type}</p>
      </div>
      <button className="Button Button--primary" onClick={triggerMiniCart}>bag({ count })</button>
    </div>
    ) : (
      null
    )}
    </Fragment>
  );
}

const init = (el) => {
  const element = <ProductAddedBanner node={el} />;
  ReactDOM.render(element, el);
};

export default init;



