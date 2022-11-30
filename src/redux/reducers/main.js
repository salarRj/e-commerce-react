import { combineReducers } from "redux";
import { cartReducer } from "./reducer";

const rooted = combineReducers({
    cartReducer
})

export default rooted