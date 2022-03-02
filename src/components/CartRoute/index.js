import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FaCheckCircle} from 'react-icons/fa'
import {BiRupee} from 'react-icons/bi'
// import {HiOutlineMinusSm} from 'react-icons/hi'
// import {BsPlus} from 'react-icons/bs'
import NavBar from '../NavBar/NavBar'
import CartItem from './CartItem'
import Footer from '../Footer'
import cartClass from './Cart.module.css'

import './index.css'

const cartEmptyUrl =
  'https://res.cloudinary.com/dppqkea7f/image/upload/v1625831743/cart-no-order_qivsro.png'

const cartStatusConstants = {
  initial: 'INITIAL',
  cartItemsFound: 'SUCCESS',
  noCartItems: 'FAILURE',
  paymentSuccess: 'PAYMENT',
}

class CartRoute extends Component {
  state = {cartData: [], cartStatus: cartStatusConstants.initial}

  componentDidMount() {
    window.scrollTo(0, 0)
    this.getTheCartData()
  }

  // increment the cart quantity

  incrementCartItemQuantity = id => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === id) {
        console.log(eachItem.quantity)
        const updatedQuantity = eachItem.quantity + 1
        return {...eachItem, quantity: updatedQuantity}
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.getTheCartData()
  }

  // decrement the cart quantity

  decrementCartItemQuantity = id => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === id) {
        if (eachItem.quantity > 0) {
          console.log(eachItem.quantity)
          const updatedQuantity = eachItem.quantity - 1
          console.log('updated:>>', updatedQuantity)
          return {...eachItem, quantity: updatedQuantity}
        }
      }
      return eachItem
    })
    console.log('updatedCartData :>> ', updatedCartData)
    // localStorage.setItem('cart_data', JSON.stringify(updatedCartData))
    // this.getTheCartData()
    this.removeCartItem(updatedCartData)
  }

  // remove the item

  removeCartItem = updatedData => {
    // const cartData = JSON.parse(localStorage.getItem('cartData'))
    const updatedCartData = updatedData.filter(
      eachCartItem => eachCartItem.quantity > 0,
    )
    console.log(updatedCartData)
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.getTheCartData()
  }

  // calculate the total amount

  calculateTheTotalAmount = () => {
    const {cartData} = this.state
    // console.log(cartData)
    const amountList = cartData.map(each => each.quantity * each.cost)
    // console.log(amountList)
    const totalAmount = amountList.reduce((a, b) => a + b)
    return totalAmount
  }

  // get the cart data

  getTheCartData = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    if (cartData.length === 0) {
      // console.log(cartData.length)
      this.setState({
        cartStatus: cartStatusConstants.noCartItems,
      })
    } else {
      const cartItems = cartData.map(each => ({
        cost: each.cost,
        quantity: each.quantity,
        id: each.id,
        imageUrl: each.imageUrl,
        name: each.name,
      }))
      this.setState({
        cartStatus: cartStatusConstants.cartItemsFound,
        cartData: cartItems,
      })
    }
  }

  // go to home page on click

  goToHomePage = () => {
    const {history} = this.props
    history.replace('/')
  }

  // place the Order

  placeOrder = () => {
    this.setState({cartStatus: cartStatusConstants.paymentSuccess})
    localStorage.clear('cartData')
  }

  // cart empty view

  cartEmptyView = () => (
    <div className={cartClass.CartEmptyViewContainer}>
      <img
        src={cartEmptyUrl}
        alt="empty cart"
        className={cartClass.CartEmptyImage}
      />
      <h1 className={cartClass.CartEmptyName}>No Order Yet!</h1>
      <p className={cartClass.CartEmptyDescription}>
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/" style={{textDecoration: 'none'}}>
        <button type="button" className={cartClass.OrderNowButton}>
          Order Now
        </button>
      </Link>
    </div>
  )

  // payment successful view

  paymentSuccessfulView = () => (
    <div className={cartClass.CartSuccessContainer}>
      <FaCheckCircle className={cartClass.CartCircle} />
      <h1 className={cartClass.CartSuccessName}>Payment Successful</h1>
      <p className={cartClass.CartSuccessDescription}>
        Thank you for ordering Your payment is successfully completed.
      </p>
      <Link to="/" style={{textDecoration: 'none'}}>
        <button type="button" className={cartClass.GotoHomeButton}>
          Go To Home Page
        </button>
      </Link>
    </div>
  )

  // cart item view

  cartItemsView = () => {
    const {cartData} = this.state
    // const cartData = JSON.parse(localStorage.getItem('cartData'))
    console.log(cartData)
    const totalAmount = this.calculateTheTotalAmount()
    return (
      <>
        <div className={cartClass.CartContainer}>
          <div className={cartClass.CartItemsContainer}>
            <div className={cartClass.DesktopHeadingContainer}>
              <h1 className={cartClass.Headings}>Item</h1>
              <h1 className={cartClass.Headings}>Quantity</h1>
              <h1 className={cartClass.Headings}>Price</h1>
            </div>
            <ul className={cartClass.MobileCartItemsList}>
              {cartData.map(eachItem => (
                <CartItem
                  key={eachItem.id}
                  eachCartItem={eachItem}
                  incrementQuantity={this.incrementCartItemQuantity}
                  decrementQuantity={this.decrementCartItemQuantity}
                />
              ))}
            </ul>
            <hr className={cartClass.HorizontalLine} />
            <div className={cartClass.TotalContainer}>
              <h1 className={cartClass.OrderHeading}>Order Total:</h1>
              <div className={cartClass.TotalAmountContainer}>
                <BiRupee className={cartClass.TotalRupee} />
                <p testid="total-price" className={cartClass.TotalAmount}>
                  {totalAmount}.00
                </p>
              </div>
            </div>
            <button
              type="button"
              className={cartClass.PlaceOrderButton}
              onClick={this.placeOrder}
            >
              Place Order
            </button>
          </div>
          <Footer />
        </div>
      </>
    )
  }

  // render cart page based on switch case

  onRenderDisplayCartPage = () => {
    const {cartStatus} = this.state

    switch (cartStatus) {
      case cartStatusConstants.cartItemsFound:
        return this.cartItemsView()
      case cartStatusConstants.noCartItems:
        return this.cartEmptyView()
      case cartStatusConstants.paymentSuccess:
        return this.paymentSuccessfulView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className={cartClass.CartBackgroundContainer}>
          {this.onRenderDisplayCartPage()}
        </div>
      </div>
    )
  }
}

export default CartRoute
