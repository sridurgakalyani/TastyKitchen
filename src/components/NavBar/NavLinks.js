/* eslint-disable react/destructuring-assignment */
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import classes from './NavBar.Module.css'

const NavLinks = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  /* const changeTheCss = () => {
    console.log(1)
  } */

  return (
    <ul>
      <Link to="/">
        <li onClick={() => props.isMobile && props.closeMobileMenu()}>Home</li>
      </Link>
      <Link to="/cart">
        <li onClick={() => props.isMobile && props.closeMobileMenu()}>Cart</li>
      </Link>
      <li onClick={() => props.isMobile && props.closeMobileMenu()}>
        <button
          type="button"
          className={classes.LogoutButton}
          onClick={onClickLogout}
        >
          Logout
        </button>
      </li>
    </ul>
  )
}

export default withRouter(NavLinks)
