import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, Route, Switch} from 'react-router-dom'
import {logout} from '../store'
import {getCartFromSession, clearCart} from '../store/cart'
import {Login, Signup} from './auth-form'

class Navbar extends React.Component {
  componentDidMount() {
    this.props.loadCart()
  }
  render() {
    const {handleClick, isLoggedIn, cart, userEmail} = this.props
    const cartLength = cart.reduce((acc, book) => {
      acc += book.order_log.quantity
      return acc
    }, 0)
    return (
      <div className="navbar">
        <title className="is-size-1 navbar-brand site-logo">
          <i className="fas fa-chess-knight logo-images" />BOOKS-A-LOT!<i className="fas fa-book logo-images" />
        </title>
        <nav className="navbar-end">
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home" className="nav-item">
              Home
            </Link>
            Welcome, {userEmail}!
            <a href="#" onClick={handleClick} className="nav-item">
              Logout
            </a>
          </div>
          ) : (
          <div className="nav-right">
            {/* The navbar will show these links before you log in */}
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
            </Switch>
          </div>
          )}
        </nav>
        <br />
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.cart,
    userEmail: state.user.email
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
      dispatch(clearCart())
    },
    loadCart() {
      dispatch(getCartFromSession())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
