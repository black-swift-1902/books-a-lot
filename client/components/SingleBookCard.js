import React from 'react'
import {Link} from 'react-router-dom'
import {truncate} from '../util'

const SingleBookCard = props => {
    const {book} = props
          return <Link to={`/books/${book.id}`}>
              <div className="card column centered-item">
                <h3 className="card-header-title">{truncate(book.title,30)}</h3>
                <div className="card-image image is-128x128">
                  <img src={book.imgUrl} />
                </div>
                <hr />
                <div className="card-footer">
                  <h4 className="card-footer-item">Price: {(book.price/100).toFixed(2)}</h4>
                </div>
              </div>
            </Link>
}

export default SingleBookCard