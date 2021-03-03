/**
 * ----------------------------------------------------------------------------
 * TAB
 * ----------------------------------------------------------------------------
 */

class Tab {
  constructor(el) {
    this.init(el);
    this.bindEvents();
  }

  init(el) {
    this.el = el;
    this.items = el.querySelectorAll('.tabs a');
  }

  bindEvents() {
    this.items.forEach((element) => {
      element.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleItem(element);
      });
    });
  }

  toggleItem(el) {
    const tabPanels = document.querySelectorAll(".tabs-panel");

    document.querySelector(".tabs li.active").classList.remove("active");
    document.querySelector(".tabs-panel.active").classList.remove("active");

    const parentListItem = el.parentElement;
    parentListItem.classList.add("active");
    const index = [...parentListItem.parentElement.children].indexOf(parentListItem);

    const panel = [...tabPanels].filter(el => el.getAttribute("data-index") == index);
    panel[0].classList.add("active");
  }
}


export default Tab;