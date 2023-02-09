import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk"; /* middleware */
import { rootReducer } from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
/* 'composeWithDevTools' is a utility function that provides enhanced functionality for debugging and development of a Redux-based application and allows to connect the 'Redux store' to the 'Redux DevTools Extension' */

const finalReducer = combineReducers({
  rootReducer,
}); /* Here 'combineReducers' function is used to combine the rootReducer into finalReducer. */


// The 'initialstate' is set to an object with the rootReducer key and the cartItem property set to an array that is fetched from the local storage if it exists, or an empty array if it doesn't.
const initialstate = {
  rootReducer: {
    cartItem: localStorage.getItem("cartItem")
      ? JSON.parse(localStorage.getItem("cartItem"))
      : [],
  },
};

const middleware = [thunk]; /* redux-thunk allows to write action creators that return a function instead of an action and can perform asynchronous tasks and dispatch actions when it's finished */

const store = createStore(
  finalReducer,
  initialstate,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
