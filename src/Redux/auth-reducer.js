import {authAPI, securityAPI} from "../api/DAL";

const SET_LOGIN = 'auth/SET-LOGIN';
const LOGIN_ERROR = 'auth/LOGIN-ERROR';
const GET_CAPTCHA = 'auth/GET-CAPTCHA';

const initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: null,
    errorMessage: '',
    isErrorLogin: false,
    isInitialized: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGIN:
            return {
                ...state,
                ...action.data
            };
        case GET_CAPTCHA:
            return {
                ...state,
                captchaUrl: action.data
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
export const setCaptchaUrl = (data) => ({type: GET_CAPTCHA, data});

export const getAuth = () => async (dispatch) => {
    let response = await authAPI.getAuthData();
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setLogin(id, login, email, true))
    }
}
export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.loginAuth(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch(getAuth())
    } else {
        if(response.data.resultCode === 10){
            dispatch(getCaptcha())
        }
        dispatch(setLoginError(response.data.messages[0]))
    }
}
export const logout = () => async (dispatch) => {
    let response = await authAPI.logoutAuth();
    if (response.data.resultCode === 0) {
        dispatch(setLogin(null, null, null, false))
    }
}
export const getCaptcha = () => async (dispatch) => {
    let response = await securityAPI.getCaptchaUrl();
    dispatch(setCaptchaUrl(response.data.url))

}

export default authReducer;