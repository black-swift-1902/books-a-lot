import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

/**
 * COMPONENT
 */
function dateConvert(time) {
  const date = new Date(time);
  return ((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
}

export const UserHome = props => {
  const { email, orderHistory } = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
      {
        orderHistory && orderHistory.map((order, index) => {
          return (<div key={`order-${index+1}`} style={{border : '1px solid #BEBEBE'}}>
            <h2>Order # {orderHistory.length - index}:</h2>
            <h2>total price: $ {(order.total / 100).toFixed(2)}</h2>
            <h3>Date: {dateConvert(order.updatedAt)}</h3>
            {
              order.books.map((book) => {
                return <div key={book.id} className="columns">
                    <div className="column is-narrow">
                      <img src={book.imgUrl} width={100} height={200} />
                    </div>
                    <div className="column is-narrow">
                      <h2>{book.title}</h2>
                      <h2>$ {(book.price / 100).toFixed(2)}</h2>
                      <h2>
                        quantity: {book.order_log.quantity}
                      </h2>
                    </div>
                  </div>             
              })
            }
          </div>
          )
        })
      }
    </div>
  )
}
/**
 * CONTAINER
 */

const mapState = state => {
  return {
    email: state.user.email,
    orderHistory: state.user.orderHistory
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
