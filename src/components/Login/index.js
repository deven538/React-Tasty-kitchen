import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = JWTtoken => {
    const {history} = this.props
    Cookies.set('jwt_token', JWTtoken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showSubmitError: true})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state

    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="mobile-login-container">
        <img
          src="https://res.cloudinary.com/djbwslukn/image/upload/v1633485462/Rectangle_1456_qhnxwr.png"
          alt="website login"
          className="login-website-landing"
        />
        <p className="mobile-login-heading">Login</p>
        <form className="form-container" onSubmit={this.submitForm}>
          <div className="login-website-logo-heading-container">
            <img
              src="https://res.cloudinary.com/djbwslukn/image/upload/v1633477905/Group_7420_dvpwga.png"
              alt="website logo"
              className="login-website-logo"
            />
            <h1 className="login-website-heading">Tasty Kitchens</h1>
            <h1 className="login-website-login-heading">Login</h1>
          </div>
          <div className="input-label-container">
            <label className="label" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="input"
              value={username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="password-label-container">
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="input"
              value={password}
              onChange={this.onChangePassword}
            />
          </div>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login
