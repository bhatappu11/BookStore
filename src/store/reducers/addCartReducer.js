import {CART_ITEMS,ADD_TO_CART} from '../type'

const initialState = {
    items:[],
}

export default function(state = initialState, action){

    switch(action.type){

        case CART_ITEMS:
        return {
            items:action.payload,
        }
        case ADD_TO_CART:
            return {
                ...state,
            items:action.payload,
        }
        default: return state
    }

}