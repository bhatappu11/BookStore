import {CART_ITEMS,CART_ERROR, ADD_TO_CART,ADD_TO_CART_ERROR,WISHLIST_ITEMS,WISHLIST_ERROR} from '../type'
import axios from 'axios'
import UserService from '../../services/UserService'
const userService = new UserService();

export const getCartItems = () => async dispatch => {
    
    try{
        let config = {
            headers: {
                'x-access-token' : localStorage.getItem("token"),
            }
        };
        const res = await userService.getCart('/get_cart_items',config)
        let bookIds = [];
        res.data.result.map(book => {
            bookIds.push(book.product_id._id)
        })
        dispatch( {
            type: CART_ITEMS,
            payload: bookIds
        })
    }
    catch(e){
        dispatch( {
            type: CART_ERROR,
            payload: console.log(e),
        })
    }

}

export const addCartItems = (book,getCart) => async dispatch => {
    try{
        let config = {
            headers: {
                'x-access-token' : localStorage.getItem("token"),
            }
        };
        const res = await userService.addToCart(`/add_cart_item/${book._id}`,{},config)
        console.log("added to cart")
        dispatch( {
            type: ADD_TO_CART,
            payload: book._id
        })
        getCart();
    }
    catch(e){
        dispatch( {
            type: ADD_TO_CART_ERROR,
            payload: console.log(e),
        })
    }

}
export const getWishlistItems = () => async dispatch => {
    try{
        let config = {
            headers: {
                'x-access-token' : localStorage.getItem("token"),
            }
        };
        const res = await userService.getCart('/get_wishlist_items',config)
        let wishlistBookIds = [];
        res.data.result.map(book => {
            wishlistBookIds.push(book.product_id._id)
        })        
        dispatch({
            type:WISHLIST_ITEMS,
            payload: wishlistBookIds,
        })
    }
    catch(e){
        dispatch({
            type: WISHLIST_ERROR,
            payload: console.log(e),
        })
    }
}