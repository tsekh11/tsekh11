import {profileAPI} from "../api/DAL";

const ADD_POST = 'app/profile/ADD-POST';
const UPDATE_POST = 'app/profile/UPDATE-POST'
const SET_USERS_PROFILE = 'app/profile/SET-USERS-PROFILE'
const SET_STATUS = 'app/profile/SET-STATUS'
const SET_PHOTO = 'app/profile/SET-PHOTO'
const SET_USER_ID = 'app/profile/SET-USER-ID'

const initialState = {
    postData: [
        {message: 'Hi', likenum: '33'},
        {message: 'bye', likenum: '13'}
    ],
    newPostText: '',
    profile: null,
    status: '-------',
    userId: null
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let stateCopy = {...state};
            stateCopy.postData.push({message: stateCopy.newPostText, likenum: '22'});
            stateCopy.newPostText = '';
            return stateCopy;
        }
        case UPDATE_POST: {
            return {...state, newPostText: action.newText}
        }
        case SET_USERS_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        case SET_PHOTO: {
            return {...state, profile: {...state.profile, photos: action.photo}}
        }
        case SET_USER_ID: {
            return {...state, userId: action.userId}
        }
        default:
            return state;
    }
}

export const newPostActionCreator = () => ({type: ADD_POST});
export const updatePostActionCreator = (text) => ({type: UPDATE_POST, newText: text});
export const setUsersProfile = (profile) => ({type: SET_USERS_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});
export const setPhoto = (photo) => ({type: SET_STATUS, photo});
export const setUserId = (userId) => ({type: SET_USER_ID, userId});

export const getInfo = (userId) => async (dispatch) => {
    const response = await profileAPI.getProfileInfo(userId)
    dispatch(setUsersProfile(response.data))
}

export const getStatus = (userId) => async (dispatch) => {
    const response = await profileAPI.getUserStatus(userId)
    dispatch(setStatus(response.data))
}
export const updateStatus = (status) => async (dispatch) => {
    const response = await profileAPI.updateUserStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}
export const savePhoto = (photo) => async (dispatch, getState) => {
    const userID = getState().profileData.userId
    const response = await profileAPI.updatePhoto(photo);
    if (response.data.resultCode === 0) {
        dispatch(setPhoto(response.data.data.photos))
        dispatch(getInfo(userID))
        dispatch(getStatus(userID))
    }
}

export default profileReducer;