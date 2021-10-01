import {profileAPI} from "../api/DAL";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const ADD_POST = 'app/profile/ADD-POST';
const UPDATE_POST = 'app/profile/UPDATE-POST'
const SET_USERS_PROFILE = 'app/profile/SET-USERS-PROFILE'
const SET_STATUS = 'app/profile/SET-STATUS'
const SET_PHOTO = 'app/profile/SET-PHOTO'
const SET_USER_ID = 'app/profile/SET-USER-ID'

type PostType = {
    message: string
    likenum: string
}
type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type PhotosType = {
    small: string
    large: string
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType,
    photos: PhotosType
}

const initialState = {
    postData: [
        {message: 'Hi', likenum: '33'},
        {message: 'bye', likenum: '13'}
    ] as Array<PostType>,
    newPostText: '',
    profile: null as null | ProfileType,
    status: '-------',
    userId: null as null | string
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
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
            return {...state, profile: {...state.profile, photos: action.photo} as ProfileType}
        }
        case SET_USER_ID: {
            return {...state, userId: action.userId}
        }
        default:
            return state;
    }
}

type NewPostActionCreator = {type: typeof ADD_POST}
type UpdatePostActionCreator = {type: typeof UPDATE_POST, newText: string}
type SetUsersProfile = {type: typeof SET_USERS_PROFILE, profile: ProfileType}
type SetStatus = {type: typeof SET_STATUS, status: string}
type SetPhoto = {type: typeof SET_PHOTO, photo: PhotosType}
type SetUserId = {type: typeof SET_USER_ID, userId: string}

type ActionsType = NewPostActionCreator | UpdatePostActionCreator | SetUserId | SetPhoto | SetStatus | SetUsersProfile
type ThunkType = ThunkAction<Promise<void>, AppStateType, any, ActionsType>

export const newPostActionCreator = (): NewPostActionCreator => ({type: ADD_POST});
export const updatePostActionCreator = (text: string): UpdatePostActionCreator => ({type: UPDATE_POST, newText: text});
export const setUsersProfile = (profile: ProfileType): SetUsersProfile => ({type: SET_USERS_PROFILE, profile});
export const setStatus = (status: string): SetStatus => ({type: SET_STATUS, status});
export const setPhoto = (photo: PhotosType): SetPhoto => ({type: SET_PHOTO, photo});
export const setUserId = (userId: string): SetUserId => ({type: SET_USER_ID, userId});

export const getInfo = (userId: string | null): ThunkType => async (dispatch) => {
    const response = await profileAPI.getProfileInfo(userId)
    dispatch(setUsersProfile(response.data))
}

export const getStatus = (userId: string | null): ThunkType => async (dispatch) => {
    const response = await profileAPI.getUserStatus(userId)
    dispatch(setStatus(response.data))
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    const response = await profileAPI.updateUserStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}
export const updateInfo = (data: ProfileType): ThunkType => async (dispatch, getState) => {
    const userID = getState().profileData.userId
    const response = await profileAPI.updateUserInfo(data)
    if (response.data.resultCode === 0) {
        dispatch(getInfo(userID))
        dispatch(getStatus(userID))
    }
}
export const savePhoto = (photo: any): ThunkType => async (dispatch, getState) => {
    const userID = getState().profileData.userId
    const response = await profileAPI.updatePhoto(photo);
    if (response.data.resultCode === 0) {
        dispatch(setPhoto(response.data.data.photos))
        dispatch(getInfo(userID))
        dispatch(getStatus(userID))
    }
}

export default profileReducer;