import {getAuth} from "./auth-reducer";

const SET_INITIALIZED = 'app/app/SET-INITIALIZED'

const initialState = {
    isInitialized: false
}

export type InitialStateType = typeof initialState


const appReducer = (state = initialState, action: any): InitialStateType => {
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

export const setIsInitialized: () => ({type: typeof SET_INITIALIZED}) = () => ({type: SET_INITIALIZED});


export const getIsInitialized = () => async (dispatch: any) => {
  await dispatch(getAuth());
  dispatch(setIsInitialized())
}


export default appReducer;