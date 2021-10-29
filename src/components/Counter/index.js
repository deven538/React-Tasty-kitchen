import {Component} from 'react'

import './index.css'

class Counter extends Component {
  render() {
    const {quantity, onDecrement, onIncrement} = this.props
    return (
      <div className="counter-container">
        <button
          type="button"
          onClick={onDecrement}
          testid="decrement-quantity"
          className="quantity-controller-button"
        >
          -
        </button>
        <div>
          <p testid="item-quantity" className="cart-quantity">
            {quantity}
          </p>
        </div>
        <button
          type="button"
          onClick={onIncrement}
          testid="increment-quantity"
          className="quantity-controller-button"
        >
          +
        </button>
      </div>
    )
  }
}

export default Counter
