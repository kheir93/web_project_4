
export default class Section {
  constructor({ renderer }, containerSelector) {
    //this._data = data;
    this._renderer = renderer;
    this._container = document.querySelector(`${containerSelector}`);
  }

  renderItems(element) {
    /*this.clear();*/
    element.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

