import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_BOOKS = 'GOT_BOOKS'

/**
 * INITIAL STATE
 */
<<<<<<< HEAD
const booksArray = [];
=======
const booksArr = [];
>>>>>>> d8d808a0f52cb58db1e0fc96621ac122c728b670

/**
 * ACTION CREATORS
 */
const gotBooks = books => ({type: GOT_BOOKS, books})

/**
 * THUNK CREATORS
 */
export const getBooks = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/books')
    dispatch(gotBooks(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
<<<<<<< HEAD
export default function(state = booksArray, action) {
=======
export default function(state = booksArr, action) {
>>>>>>> d8d808a0f52cb58db1e0fc96621ac122c728b670
  switch (action.type) {
    case GOT_BOOKS:
      return action.books
    default:
      return state
  }
}
