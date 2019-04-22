export const LOAD_CART = 'LOAD_CART'
import axios from 'axios'
<<<<<<< HEAD
// const ADD_BOOK = 'ADD_BOOK'
=======
const ADD_BOOK = 'ADD_BOOK'
>>>>>>> d8d808a0f52cb58db1e0fc96621ac122c728b670
const REMOVE_BOOK = 'REMOVE_BOOK'
const CLEAR_CART = 'CLEAR_CART'

const initialState = []
/**
 * ACTION CREATORS
 */
<<<<<<< HEAD

export const removeBook = function (index) {
=======
const addBook = function(book_id) {
  return {
    type: ADD_BOOK,
    book_id
  }
}

export const removeBook = function(index) {
>>>>>>> d8d808a0f52cb58db1e0fc96621ac122c728b670
  return {
    type: REMOVE_BOOK,
    index
  }
}

<<<<<<< HEAD
export const clearCart = function () {
=======
const clearCart = function() {
>>>>>>> d8d808a0f52cb58db1e0fc96621ac122c728b670
  return {
    type: CLEAR_CART
  }
}

<<<<<<< HEAD
const loadCart = function (books) {
=======
const loadCart = function(books) {
>>>>>>> d8d808a0f52cb58db1e0fc96621ac122c728b670
  return {
    type: LOAD_CART,
    books
  }
}

<<<<<<< HEAD
export const addToCart = function (book) {
  return async dispatch => {
    await axios.post('/api/cart', book);
    const { data } = await axios.get('/api/cart')
=======
export const addToCart = function(book) {
  return async dispatch => {
    await axios.post('/api/cart', book);
    const {data} = await axios.get('/api/cart')
>>>>>>> d8d808a0f52cb58db1e0fc96621ac122c728b670
    dispatch(loadCart(data))
  }
}

<<<<<<< HEAD
export const getCartFromSession = function () {
  return async dispatch => {
    const { data } = await axios.get('/api/cart')
=======
export const getCartFromSession = function() {
  return async dispatch => {
    const {data} = await axios.get('/api/cart')
>>>>>>> d8d808a0f52cb58db1e0fc96621ac122c728b670
    dispatch(loadCart(data))
  }
}

<<<<<<< HEAD
export const removeBookThunk = function (index) {

  return async dispatch => {
      await axios.delete(`/api/cart/${index}`)
      dispatch(removeBook(index))
  }
}

export const submitOrder = function () {
=======
export const removeBookThunk = function(index) {
  try {
    return async dispatch => {
      await axios.delete(`/api/cart/${index}`)
      dispatch(removeBook(index))
    }
  } catch (error) {
    console.error(error)
  }
}

export const submitOrder = function() {
>>>>>>> d8d808a0f52cb58db1e0fc96621ac122c728b670
  return async dispatch => {
    await axios.post('/api/orders');
    dispatch(clearCart());
  }
}

/**
 * REDUCER
 */
<<<<<<< HEAD
export default function (state = initialState, action) {
  let newState = [...state];
  switch (action.type) {

    case REMOVE_BOOK:
      newState.splice(action.index, 1);
=======
export default function(state = initialState, action) {
  let newState = [...state];
  switch (action.type) {
    // case ADD_BOOK:
      // if(newState[action.book_id]) newState[action.book_id]++;
      // break

    case REMOVE_BOOK:
    newState.splice(action.index, 1);
>>>>>>> d8d808a0f52cb58db1e0fc96621ac122c728b670
      break

    case CLEAR_CART:
      newState = [];
      console.log('clear');
      break

    case LOAD_CART:
      newState = action.books
      break

    default:
      return state
  }
  return newState
}
