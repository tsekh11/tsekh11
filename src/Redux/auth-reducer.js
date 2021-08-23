import {authAPI} from "../api/DAL";

const SET_LOGIN = 'auth/SET-LOGIN';
const LOGIN_ERROR = 'auth/LOGIN-ERROR';

const initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: null,
    errorMessage: '',
    isErrorLogin: false,
    isInitialized: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGIN:
            return {
                ...state,
                ...action.data
            };
        case LOGIN_ERROR:
            return {
                ...state,
                errorMessage: action.message,
                isErrorLogin: true
            };
        default:
            return state;
    }
}

export const setLogin = (id, login, email, isAuth) => ({type: SET_LOGIN, data: {id, login, email, isAuth}});
export const setLoginError = (message) => ({type: LOGIN_ERROR, message});

export const getAuth = () => async (dispatch) => {
    let response = await authAPI.getAuthData();
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setLogin(id, login, email, true))
    }
}
export const login = (email, password, rememberMe) => async (dispatch) => {
    let response = await authAPI.loginAuth(email, password, rememberMe);
    if (response.data.resultCode === 0) {
        dispatch(getAuth())
    } else if (response.data.resultCode === 1) {
        dispatch(setLoginError(response.data.messages[0]))
    }
}
export const logout = () => async (dispatch) => {
    let response = await authAPI.logoutAuth();
    if (response.data.resultCode === 0) {
        dispatch(setLogin(null, null, null, false))
    }
}

export default authReducer;