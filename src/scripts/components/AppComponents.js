// COMMON UI ==================================================================
import Accordion from './ui/Accordion';
import Drawer from './ui/Drawer';
import Dropdown from './ui/Dropdown';

import Modal from './ui/Modal';
import SubscribeModal from './ui/SubscribeModal';
import QuickSearch from './ui/QuickSearch';
import Tab from './ui/Tab';
import MiniCart from './cart/MiniCart.jsx';

// NAV UI Components ==========================================================
import MainNav from './nav/MainNav';
import AccordionMenu from './nav/AccordionMenu';
import CollectionSort from './nav/CollectionSort';
// import LazyLoader from './nav/LazyLoader';

// PRODUCT ====================================================================
import CartButton from './product/CartButton';
import ProductForm from './product/ProductForm';
// import QuantityInput from './product/QuantityInput';
import ProductGallery from './product/ProductGallery';
import ProductSelector from './product/ProductSelector.jsx';
import ProductAddedBanner from './product/ProductAddedBanner.js';

// SOCIAL ============================================================
import InstagramFeed from './social/InstagramFeed';

const classes = {
  // UI ==================================================================
  Accordion,
  Drawer,
  Dropdown,
  QuickSearch,
  Tab,
  MiniCart,

  // UI ==================================================================
  Modal,
  SubscribeModal,
  // NAV UI ===================================================================
  MainNav,
  AccordionMenu,
  CollectionSort,
  // LazyLoader,
  
  // PRODUCT ==================================================================
  CartButton,
  ProductForm,
  // QuantityInput,
  ProductGallery,
  ProductSelector,
  ProductAddedBanner,

  // SOCIAL ============================================================
  InstagramFeed
};

// Init the array that holds the reference for the various components
window.theme.Components = [];
Object.keys(classes).forEach((key) => {
  window.theme.Components[key] = [];
});

class AppComponents {
  constructor(className, el) {
    if (classes.hasOwnProperty(className)) {
      // if(className == "QuickSearch") debugger;
      const componentEl = new classes[className](el);
      if (el.dataset.identifier) {
        window.theme.Components[className][el.dataset.identifier] = componentEl;
      }
      return componentEl;
    }
  }
}

export default AppComponents;
