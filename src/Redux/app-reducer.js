import {getAuth} from "./auth-reducer";

const SET_INITIALIZED = 'app/app/SET-INITIALIZED'

const initialState = {
    isInitialized: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                isInitialized: true
            }
        default:
            return state;
    }
}

export const setIsInitialized = () => ({type: SET_INITIALIZED});


export const getIsInitialized = () => async (dispatch) => {
  await dispatch(getAuth());
  dispatch(setIsInitialized())
}


export default appReducer;