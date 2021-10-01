import {authAPI, securityAPI} from "../api/DAL";
import {ThunkAction} from "redux-thunk";

const SET_LOGIN = 'auth/SET-LOGIN';
const LOGIN_ERROR = 'auth/LOGIN-ERROR';
const GET_CAPTCHA = 'auth/GET-CAPTCHA';


const initialState = {
    id: null as null | number,
    login: null as null | string,
    email: null as null | string,
    isAuth: null as null | boolean,
    errorMessage: '',
    isErrorLogin: false,
    isInitialized: false,
    captchaUrl: null as null | string
}

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
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

type SetLoginType = {type: typeof SET_LOGIN, data: object}
type SetLoginErrorType = {type: typeof LOGIN_ERROR, message: string}
type SetCaptchaUrlType = {type: typeof GET_CAPTCHA, data: string}

type ActionsType = SetCaptchaUrlType | SetLoginErrorType | SetLoginType
type ThunkType = ThunkAction<Promise<void>, any, any, ActionsType>

export const setLogin = (id: number | null, login: string | null, email: string | null, isAuth: boolean): SetLoginType => ({type: SET_LOGIN, data: {id, login, email, isAuth}});
export const setLoginError = (message: string): SetLoginErrorType => ({type: LOGIN_ERROR, message});
export const setCaptchaUrl = (data: string): SetCaptchaUrlType => ({type: GET_CAPTCHA, data});

export const getAuth = (): ThunkType => async (dispatch) => {
    let response = await authAPI.getAuthData();
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setLogin(id, login, email, true))
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: boolean): ThunkType => async (dispatch) => {
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
export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logoutAuth();
    if (response.data.resultCode === 0) {
        dispatch(setLogin(null, null, null, false))
    }
}
export const getCaptcha = (): ThunkType => async (dispatch) => {
    let response = await securityAPI.getCaptchaUrl();
    dispatch(setCaptchaUrl(response.data.url))
}

export default authReducer;