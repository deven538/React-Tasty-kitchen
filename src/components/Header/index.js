import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'

import './index.css'

class Header extends Component {
  state = {displayItems: false, isHomeActive: true, isCartActive: false}

  onClickHamburgerIcon = () => {
    this.setState(prevState => ({displayItems: !prevState.displayItems}))
  }

  onClickHomeButton = () => {
    this.setState({isHomeActive: true, isCartActive: false})
  }

  onClickCartActive = () => {
    this.setState({isHomeActive: false, isCartActive: true})
  }

  logoutUser = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {displayItems, isHomeActive, isCartActive} = this.state
    const homeLinkClassName = isHomeActive ? 'active' : null
    const cartLinkClassName = isCartActive ? 'active' : null
    return (
      <>
        <nav className="header-container">
          <div className="header-content">
            <div className="website-logo-container">
              <img
                src="https://res.cloudinary.com/tastykitchen/image/upload/v1633365815/Frame_274logo_kbotq3.png"
                alt="website logo"
                className="website-logo"
                onClick={this.gotohome()}
              />
              <h1 className="header-website-name">Tasty Kitchens</h1>
            </div>
            <ul className="nav-item-website-view">
              <li className="home-nav-item">
                <Link
                  to="/"
                  className={`nav-link ${homeLinkClassName}`}
                  onClick={this.onClickHomeButton}
                >
                  Home
                </Link>
              </li>
              <li className="cart-nav-link">
                <Link
                  to="/cart"
                  className={`nav-link ${cartLinkClassName}`}
                  onClick={this.onClickCartActive}
                >
                  Cart
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="logout-nav-item"
                  onClick={this.logoutUser}
                >
                  Logout
                </button>
              </li>
            </ul>

            <button
              type="button"
              className="nav-menu-button"
              onClick={this.onClickHamburgerIcon}
            >
              <GiHamburgerMenu className="nav-menu-icon" />
            </button>
          </div>
        </nav>
        {displayItems ? (
          <div className="nav-items-mobile-view">
            <ul className="nav-item-mobile-view">
              <li className="home-nav-item">
                <Link
                  to="/"
                  className={`nav-link ${homeLinkClassName}`}
                  onClick={this.onClickHomeButton}
                >
                  Home
                </Link>
              </li>
              <li className="cart-nav-item">
                <Link
                  to="/cart"
                  className={`nav-link ${cartLinkClassName}`}
                  onClick={this.onClickCartActive}
                >
                  Cart
                </Link>
              </li>

              <li>
                <button
                  type="button"
                  className="logout-nav-item"
                  onClick={this.logoutUser}
                >
                  Logout
                </button>
              </li>
            </ul>
            <button
              type="button"
              className="header-close-icon"
              onClick={this.onClickHamburgerIcon}
            >
              <AiFillCloseCircle className="close-icon" />
            </button>
          </div>
        ) : null}
      </>
    )
  }
}
export default withRouter(Header)
