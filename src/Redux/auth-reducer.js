import {usersAPI} from "../api/DAL";

const initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET-LOGIN':
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        default:
            return state;
    }
}

export const setLogin = (id, login, email) => ({type: 'SET-LOGIN', data: {id, login, email}});

export const getAuth = () => (dispatch) => {
    usersAPI.getAuthData()
        .then(response => {
            if(response.data.resultCode === 0){
                let {id, login, email} = response.data.data;
                dispatch(setLogin(id, login, email))
            }
        })
}

export default authReducer;