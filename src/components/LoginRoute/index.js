import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import classes from './Login.module.css'

const smallImageUrl =
  'https://res.cloudinary.com/ddgvegjgk/image/upload/v1635311318/tastykitchens/Rectangle_1457_ri10vf.png'
console.log(smallImageUrl)
const largeImageURl =
  'https://res.cloudinary.com/ddgvegjgk/image/upload/v1635315803/tastykitchens/Rectangle_1457_noyo6j.png'
console.log(largeImageURl)
const logoUrl =
  'https://res.cloudinary.com/dppqkea7f/image/upload/v1625742512/Frame_274_zlrzwk.svg'
console.log(logoUrl)

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    isShowPassword: false,
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  showAndHidePassword = () => {
    this.setState(pre => ({isShowPassword: !pre.isShowPassword}))
  }

  successLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  failedLogin = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const apiLoginUrl = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiLoginUrl, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.successLogin(data.jwt_token)
    } else {
      this.failedLogin(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {username, password, showErrorMsg, errorMsg} = this.state

    // const inputType = isShowPassword ? 'text' : 'password'

    return (
      <div className={classes.BgContainer}>
        <img
          src="https://res.cloudinary.com/ddgvegjgk/image/upload/v1635315803/tastykitchens/Rectangle_1457_noyo6j.png"
          alt="website login"
          className={classes.LargeImage}
        />
        <div className={classes.LoginContainer}>
          <img src={logoUrl} className={classes.Logo} alt="website logo" />
          <h1 className={classes.LargeHeading}>Tasty Kitchens</h1>
          <img
            className={classes.Rectangle}
            src="https://res.cloudinary.com/ddgvegjgk/image/upload/v1635311318/tastykitchens/Rectangle_1457_ri10vf.png"
            alt="website login"
          />

          <h1 className={classes.LoginHeading}>Login</h1>
          <form className={classes.FormContainer} onSubmit={this.onSubmitForm}>
            <label htmlFor="userName" className={classes.LabelElement}>
              USERNAME
            </label>
            <input
              type="text"
              id="userName"
              className={classes.InputElement}
              onChange={this.onChangeUsername}
              value={username}
              placeholder="USER NAME"
            />
            <label htmlFor="password" className={classes.LabelElement}>
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className={classes.InputElement}
              onChange={this.onChangePassword}
              value={password}
              placeholder="PASSWORD"
            />

            {showErrorMsg ? (
              <p className={classes.ErrorMsg}>*{errorMsg}</p>
            ) : null}
            <button className={classes.LoginButton} type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginRoute
