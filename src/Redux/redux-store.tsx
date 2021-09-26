import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import dialogReducer from "./dialog-reducer";
import profileReducer from "./profile-reducer";
import UsersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk"
import appReducer from "./app-reducer";

let rootReducer = combineReducers({
    messagesData: dialogReducer,
    profileData: profileReducer,
    userData: UsersReducer,
    auth: authReducer,
    app: appReducer
});

type RootReducer = typeof rootReducer
export type AppStateType = ReturnType<RootReducer>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)
));

// @ts-ignore
window.__store__ = store;

export default store;