import { FETCH_PLANTS, UPDATE_PLANT } from "../actions/types";

const initialState = {
    items: [],
    item: {}
}

export default function plantReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_PLANTS:
            return {
                ...state,
                items: action.payload
            };
        case UPDATE_PLANT:
            return {
                ...state,
                item: action.payload
            }
        default:
            return state;
    }
}