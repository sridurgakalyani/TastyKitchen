import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {HiOutlineMinusSm} from 'react-icons/hi'
import {BsPlus} from 'react-icons/bs'
import cartClass from './Cart.module.css'
import './index.css'

class CartItem extends Component {
  increment = () => {
    const {eachCartItem, incrementQuantity} = this.props
    incrementQuantity(eachCartItem.id)
  }

  decrement = () => {
    const {eachCartItem, decrementQuantity} = this.props
    decrementQuantity(eachCartItem.id)
  }

  render() {
    const {eachCartItem} = this.props
    // console.log(eachCartItem)
    const price = eachCartItem.cost * eachCartItem.quantity
    console.log(price)
    return (
      <li>
        <div testid="cartItem" className={cartClass.CartListItem}>
          <img
            src={eachCartItem.imageUrl}
            alt="cart-item"
            className={cartClass.ItemImage}
          />
          <div className={cartClass.CartNameDetailsContainer}>
            <h1 className={cartClass.CartItemName}>{eachCartItem.name}</h1>
            <div className="each-item-counter-container">
              <button
                testid="decrement-quantity"
                type="button"
                className="minus-icon-container"
                onClick={this.decrement}
              >
                <HiOutlineMinusSm className="minus-icon" />
              </button>
              <p testid="item-quantity" className="count-value">
                {eachCartItem.quantity}
              </p>
              <button
                testid="increment-quantity"
                type="button"
                className="plus-icon-container"
                onClick={this.increment}
              >
                <BsPlus className="plus-icon" />
              </button>
            </div>
            <div className={cartClass.ItemRateContainer}>
              <BiRupee className={cartClass.ItemRupee} />
              <p className={cartClass.ItemCost}>{eachCartItem.cost}</p>
            </div>
          </div>
        </div>
      </li>
    )
  }
}

export default CartItem
