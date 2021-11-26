import {WISHLIST_ITEMS} from '../type'

const initialState = {
    wishlist:[],
}

export default function(state = initialState, action){

    switch(action.type){

        case WISHLIST_ITEMS:
        return {
            items:action.payload,
        }
        default: return state
    }

}