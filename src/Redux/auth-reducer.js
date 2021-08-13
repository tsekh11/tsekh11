import {authAPI} from "../api/DAL";

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
        case 'SET-LOGIN':
            return {
                ...state,
                ...action.data
            };
        case 'LOGIN-ERROR':
            return {
                ...state,
                errorMessage: action.message,
                isErrorLogin: true
            };
        default:
            return state;
    }
}

export const setLogin = (id, login, email, isAuth) => ({type: 'SET-LOGIN', data: {id, login, email, isAuth}});
export const setLoginError = (message) => ({type: 'LOGIN-ERROR', message});

export const getAuth = () => (dispatch) => {
    authAPI.getAuthData()
        .then(response => {
            if(response.data.resultCode === 0){
                let {id, login, email} = response.data.data;
                dispatch(setLogin(id, login, email, true))
            }
        })
}
export const login = (email, password, rememberMe) => (dispatch) => {
    authAPI.loginAuth(email, password, rememberMe)
        .then(response => {
            if(response.data.resultCode === 0){
                dispatch(getAuth())
            }else if(response.data.resultCode === 1){
                dispatch(setLoginError(response.data.messages[0]))
            }
        })
}
export const logout = () => (dispatch) => {
    authAPI.logoutAuth()
        .then(response => {
            if(response.data.resultCode === 0){
                dispatch(setLogin(null, null, null, false))
            }
        })
}

export default authReducer;