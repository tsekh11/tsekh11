import {getAuth} from "./auth-reducer";

const initialState = {
    isInitialized: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET-INITIALIZED':
            return {
                ...state,
                isInitialized: true
            }
        default:
            return state;
    }
}

export const setIsInitialized = () => ({type: 'SET-INITIALIZED'});


export const getIsInitialized = () => async (dispatch) => {
  await dispatch(getAuth());

  dispatch(setIsInitialized())
}


export default appReducer;