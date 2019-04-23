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
      <div className='single-book-container'>
        <h2 className='single-book-title'>{title}</h2>
        <div className='single-book-information'>
        <div className="single-book-column">
          <img src={imgUrl} />  
        </div>
        <div className="single-book-column description-and-price">
          <div className="book-description">
            <h2 className="overview">Overview</h2>
            <br />
            <p>{description}</p>
          </div>
          <br />
          <p className='single-book-price'>$ {(price / 100).toFixed(2)}</p>
        </div>
        </div>
        <button className="button is-link"
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
