import {getAuth} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";

const SET_INITIALIZED = 'app/app/SET-INITIALIZED'

const initialState = {
    isInitialized: false
}

export type InitialStateType = typeof initialState


const appReducer = (state = initialState, action: SetIsInitialized): InitialStateType => {
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

type SetIsInitialized = {type: typeof SET_INITIALIZED}
type ThunkType = ThunkAction<Promise<void>, any, any, SetIsInitialized>

export const setIsInitialized = (): SetIsInitialized =>  ({type: SET_INITIALIZED});


export const getIsInitialized = (): ThunkType => async (dispatch) => {
  await dispatch(getAuth());
  dispatch(setIsInitialized())
}


export default appReducer;