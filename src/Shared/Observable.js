export default class Observable {
  _value = null;
  observers = [];

  constructor(initialValue) {
    this._value = initialValue;
  }

  set value(newValue) {
    this._value = newValue;
  }

  get value() {
    return this._value;
  }

  subscribe = (subscribeCallBack) => {
    this.observers.push(subscribeCallBack);
  };

  notify = () => {
    this.observers.map((observer) => {
      return observer(this._value);
    });
  };
}
