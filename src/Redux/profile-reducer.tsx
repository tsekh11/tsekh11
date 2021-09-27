import {profileAPI} from "../api/DAL";

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

const profileReducer = (state = initialState, action: any): InitialStateType => {
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

export const newPostActionCreator: () => ({type: typeof ADD_POST}) = () => ({type: ADD_POST});
export const updatePostActionCreator: (text: string) => ({type: typeof UPDATE_POST, newText: string})
                                    = (text) => ({type: UPDATE_POST, newText: text});
export const setUsersProfile: (profile: ProfileType) => ({type: typeof SET_USERS_PROFILE, profile: ProfileType})
                            = (profile) => ({type: SET_USERS_PROFILE, profile});
export const setStatus: (status: string) => ({type: typeof SET_STATUS, status: string}) = (status) => ({type: SET_STATUS, status});
export const setPhoto: (photo: PhotosType) => ({type: typeof SET_STATUS, photo: PhotosType}) = (photo) => ({type: SET_STATUS, photo});
export const setUserId: (userId: string) => ({type: typeof SET_USER_ID, userId: string}) = (userId) => ({type: SET_USER_ID, userId});

export const getInfo = (userId: string) => async (dispatch: any) => {
    const response = await profileAPI.getProfileInfo(userId)
    dispatch(setUsersProfile(response.data))
}

export const getStatus = (userId: string) => async (dispatch: any) => {
    const response = await profileAPI.getUserStatus(userId)
    dispatch(setStatus(response.data))
}
export const updateStatus = (status: string) => async (dispatch: any) => {
    const response = await profileAPI.updateUserStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}
export const updateInfo = (data: ProfileType) => async (dispatch: any, getState: any) => {
    const userID = getState().profileData.userId
    const response = await profileAPI.updateUserInfo(data)
    if (response.data.resultCode === 0) {
        dispatch(getInfo(userID))
        dispatch(getStatus(userID))
    }
}
export const savePhoto = (photo: any) => async (dispatch: any, getState: any) => {
    const userID = getState().profileData.userId
    const response = await profileAPI.updatePhoto(photo);
    if (response.data.resultCode === 0) {
        dispatch(setPhoto(response.data.data.photos))
        dispatch(getInfo(userID))
        dispatch(getStatus(userID))
    }
}

export default profileReducer;