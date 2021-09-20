import {usersAPI} from "../api/DAL";
import {PhotosType} from "./profile-reducer";

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

const UsersReducer = (state = initialState, action: any): InitialStateType => {
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

export const unfollower: (userID: number) => ({type: typeof UNFOLLOW, userID: number}) = (userID) => ({type: UNFOLLOW, userID});
export const follower: (userID: number) => ({type: typeof FOLLOW, userID: number}) = (userID) => ({type: FOLLOW, userID});
export const setUser: (users: UsersType) => ({type: typeof SET_USERS, users: UsersType}) = (users) => ({type: SET_USERS, users});
export const setCurrentPage: (currentPage: number) => ({type: typeof SET_CURRENT_PAGE, currentPage: number})
    = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalCount: (totalUsersCount: number) => ({type: typeof SET_TOTAL_COUNT, totalUsersCount: number})
    = (totalUsersCount) => ({type: SET_TOTAL_COUNT, totalUsersCount});

export const getUsers = (currentPage: number, pageSize: number) => async (dispatch: any) => {
    const data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(setUser(data.items))
    dispatch(setTotalCount(data.totalCount))
}

export const unfollow = (id: number, setDisabled: any) => async (dispatch: any) => {
    const response = await usersAPI.unfollow(id)
    if (response.data.resultCode === 0)
        dispatch(unfollower(id))
    setDisabled(false)
}

export const follow = (id: number, setDisabled: any) => async (dispatch: any) => {
    const response = await usersAPI.follow(id)
    if (response.data.resultCode === 0)
        dispatch(follower(id))
    setDisabled(false)
}

export default UsersReducer;