import {profileAPI} from "../api/DAL";

const initialState = {
    postData: [
        {message: 'Hi', likenum: '33'},
        {message: 'bye', likenum: '13'}
    ],
    newPostText: '',
    profile: null,
    status: '-------'
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD-POST': {
            let stateCopy = {...state};
            let message = {
                message: stateCopy.newPostText,
                likenum: '22'
            }
            stateCopy.postData = [...state.postData]
            stateCopy.postData.push(message);
            stateCopy.newPostText = '';
            return stateCopy;
        }
        case 'UPDATE-POST': {
            return {...state, newPostText: action.newText}
        }
        case 'SET-USERS-PROFILE': {
            return {...state, profile: action.profile}
        }
        case 'SET-STATUS': {
            return {...state, status: action.status}
        }
        default:
            return state;
    }
}

export const newPostActionCreator = () => ({type: 'ADD-POST'});
export const updatePostActionCreator = (text) => ({type: 'UPDATE-POST', newText: text});
export const setUsersProfile = (profile) => ({type: 'SET-USERS-PROFILE', profile});
export const setStatus = (status) => ({type: 'SET-STATUS', status});

export const getInfo = (userId) => (dispatch) => {
    profileAPI.getProfileInfo(userId).then(response => {
        dispatch(setUsersProfile(response.data))
    })
}

export const getStatus = (userId) => (dispatch) => {
    profileAPI.getUserStatus(userId).then(response => {
        dispatch(setStatus(response.data))
    })
}
export const updateStatus = (status) => (dispatch) => {
    profileAPI.updateUserStatus(status).then(response => {
        if(response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    })
}

export default profileReducer;