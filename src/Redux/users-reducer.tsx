import {usersAPI} from "../api/DAL";
import {PhotosType} from "./profile-reducer";
import {ThunkAction} from "redux-thunk";

const UNFOLLOW = 'api/users/UNFOLLOW'
const FOLLOW = 'api/users/FOLLOW'
const SET_USERS = 'api/users/SET-USERS'
const SET_CURRENT_PAGE = 'api/users/SET-CURRENT-PAGE'
const SET_TOTAL_COUNT = 'api/users/SET-TOTAL-COUNT'

type UsersType = {
    name: string | null
    id: number
    photos: PhotosType
    status: string | null
    followed: boolean
}

const initialState = {
    users: [] as Array<UsersType>,
    pageSize: 15,
    totalUsersCount: 0,
    currentPage: 1
}

export type InitialStateType = typeof initialState

const followFunc = (data: Array<UsersType>, action: any, value: boolean): any => {
    data.map(u => {
        if (u.id === action.userID) {
            return {...u, followed: value}
        }
        return u
    })
}

const UsersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case UNFOLLOW:
            return {
                ...state,
                users: followFunc(state.users, action, false)
            }
        case FOLLOW: {
            return {
                ...state,
                users: followFunc(state.users, action, true)
            }
        }
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_COUNT: {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        default:
            return state;
    }
}

type ActionsType = UnfollowerType | FollowerType | SetUserType | SetCurrentPageType | SetTotalCountType

type UnfollowerType = {type: typeof UNFOLLOW, userID: number}
type FollowerType = {type: typeof FOLLOW, userID: number}
type SetUserType = {type: typeof SET_USERS, users: Array<UsersType>}
type SetCurrentPageType = {type: typeof SET_CURRENT_PAGE, currentPage: number}
type SetTotalCountType = {type: typeof SET_TOTAL_COUNT, totalUsersCount: number}

export const unfollower = (userID: number): UnfollowerType => ({type: UNFOLLOW, userID});
export const follower = (userID: number): FollowerType => ({type: FOLLOW, userID});
export const setUser = (users: Array<UsersType>): SetUserType => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalCount = (totalUsersCount: number): SetTotalCountType => ({type: SET_TOTAL_COUNT, totalUsersCount});

type ThunkType = ThunkAction<Promise<void>, any, any, ActionsType>

export const getUsers = (currentPage: number, pageSize: number): ThunkType => async (dispatch) => {
    const data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(setUser(data.items))
    dispatch(setTotalCount(data.totalCount))
}

export const unfollow = (id: number, setDisabled: (val: boolean) => void): ThunkType => async (dispatch) => {
    const response = await usersAPI.unfollow(id)
    if (response.data.resultCode === 0)
        dispatch(unfollower(id))
    setDisabled(false)
}

export const follow = (id: number, setDisabled: (val: boolean) => void): ThunkType => async (dispatch) => {
    const response = await usersAPI.follow(id)
    if (response.data.resultCode === 0)
        dispatch(follower(id))
    setDisabled(false)
}

export default UsersReducer;