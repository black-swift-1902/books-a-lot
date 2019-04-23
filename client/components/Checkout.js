import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartFromSession, removeBookThunk, submitOrder} from '../store/cart'
import {priceSum} from '../util'
/**
 * COMPONENT
 */

class Checkout extends Component {
  componentDidMount() {
    this.props.loadCart()
  }

  render() {
    let {books} = this.props
    let totalPrice = books.reduce(priceSum, 0)
    return (
      <div>
        <h1 className="is-size-2 has-text-centered">Cart</h1>
        {books.map((book, index) => {
          return (
            <div key={`book-${book.id}`} className="columns">
              <div className="column">
                <h2 className="is-size-3">Item #{index + 1}</h2>
                <h2 className="is-size-3">{book.title}</h2>
                <figure className="image is-128x128">
                  <img src={book.imgUrl} />
                </figure>
                <br />
              </div>
              <div className="column">
                <h4>Single Price: $ {(book.price / 100).toFixed(2)}</h4>
                <h4>Quantity: {book.order_log.quantity}</h4>
                <h4>
                  Total Price: $
                  {(book.price / 100 * book.order_log.quantity).toFixed(2)}
                </h4>
                <a
                  className="button is-warning"
                  onClick={() => {
                    this.props.removeBookThunk(index)
                  }}
                >
                  <i className="fas fa-trash-alt" />
                  Delete
                </a>
              </div>
            </div>
          )
        })}
        <br />
        <div>
          <h4 className="">Subtotal: $ {(totalPrice / 100).toFixed(2)}</h4>
          <h4>Tax: $ {(totalPrice / 100 * 0.08875).toFixed(2)}</h4>
          <h4>Total: $ {(totalPrice / 100 * 1.08875).toFixed(2)}</h4>
        </div>
        {books.length ? (
          <a
            onClick={() =>
              this.props.submitOrder({total: Math.round(totalPrice * 1.08875)})
            }
            className="button is-primary"
          >
            Submit Order
          </a>
        ) : (
          undefined
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    books: state.cart,
    user: state.user
  }
}

const mapDispatch = dispatch => ({
  loadCart: () => dispatch(getCartFromSession()),
  removeBookThunk: index => dispatch(removeBookThunk(index)),
  submitOrder: total => dispatch(submitOrder(total))
})

export default connect(mapState, mapDispatch)(Checkout)
