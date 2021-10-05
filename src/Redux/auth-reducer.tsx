import {authAPI, ResultCode, ResultCodeCaptcha, securityAPI} from "../api/DAL";
import {ThunkAction} from "redux-thunk";
import {ActionsTypes} from "./redux-store";

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


type ActionsType = ActionsTypes<typeof actions>
type ThunkType = ThunkAction<Promise<void>, any, any, ActionsType>

export const actions = {
    setLogin: (id: number | null, login: string | null, email: string | null, isAuth: boolean) => ({type: SET_LOGIN, data: {id, login, email, isAuth}} as const),
    setLoginError: (message: string) => ({type: LOGIN_ERROR, message} as const),
    setCaptchaUrl: (data: string) => ({type: GET_CAPTCHA, data} as const),
}

export const getAuth = (): ThunkType => async (dispatch) => {
    let response = await authAPI.getAuthData();
    if (response.resultCode === ResultCode.Success) {
        let {id, login, email} = response.data;
        dispatch(actions.setLogin(id, login, email, true))
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: boolean): ThunkType => async (dispatch) => {
    let response = await authAPI.loginAuth(email, password, rememberMe, captcha);
    if (response.resultCode === ResultCode.Success) {
        dispatch(getAuth())
    } else {
        if(response.resultCode === ResultCodeCaptcha.Required){
            dispatch(getCaptcha())
        }
        dispatch(actions.setLoginError(response.messages[0]))
    }
}
export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logoutAuth();
    if (response.resultCode === ResultCode.Success) {
        dispatch(actions.setLogin(null, null, null, false))
    }
}
export const getCaptcha = (): ThunkType => async (dispatch) => {
    let response = await securityAPI.getCaptchaUrl();
    dispatch(actions.setCaptchaUrl(response.url))
}

export default authReducer;