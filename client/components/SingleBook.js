import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getOneBook} from '../store'
import {addToCart} from '../store/cart'

class SingleBook extends Component {
  componentDidMount() {
    const bookId = this.props.match.params.id
    this.props.getOneBook(bookId)
  }

  render() {
    const {title, imgUrl, price, description} = this.props.selectBook
    const message = this.props.message
    return (
      <div className='centered-item'>
        <h2 className='single-book-title'>{title}</h2>
        <img src={imgUrl} />
        <h4>$ {(price / 100).toFixed(2)}</h4>
        <p>{description}</p>
        <button
          onClick={() => {
            this.props.addBookToCart(this.props.selectBook)
          }}
        >
          Add To Cart
        </button>
        {message && <h5>{message}</h5>}
      </div>
    )
  }
}

const mapState = state => {
  return {
    selectBook: state.selectBook,
    message: state.cart.message
  }
}

const mapDispatch = dispatch => {
  return {
    getOneBook(bookId) {
      return dispatch(getOneBook(bookId))
    },
    addBookToCart(book) {
      return dispatch(addToCart(book))
    }
  }
}

/**
 * PROP TYPES
 */
SingleBook.propTypes = {
  selectBook: PropTypes.object
}

export default connect(mapState, mapDispatch)(SingleBook)
