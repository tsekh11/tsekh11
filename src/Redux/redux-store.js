import {combineReducers, createStore} from "redux";
import dialogReducer from "./dialog-reducer";
import profileReducer from "./profile-reducer";
import UsersReducer from "./users-reducer";
import authReducer from "./auth-reducer";

let reducers = combineReducers({
    messagesData: dialogReducer,
    profileData: profileReducer,
    userData: UsersReducer,
    auth: authReducer
});

let store = createStore(reducers);

window.store = store;

export default store;