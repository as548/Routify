import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducers";
import { deleteUrlReducer, editUrlReducer, myUrlsReducer, newUrlReducer } from "./reducers/urlReducers";

const reducer=combineReducers({
    user:userReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    newUrl:newUrlReducer,
    myUrls:myUrlsReducer,
    delUrl:deleteUrlReducer,
    updateUrl:editUrlReducer
})

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;