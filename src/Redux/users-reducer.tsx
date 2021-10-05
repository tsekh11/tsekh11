import {usersAPI} from "../api/DAL";
import {PhotosType} from "./profile-reducer";
import {ThunkAction} from "redux-thunk";
import {ActionsTypes} from "./redux-store";

const UNFOLLOW = 'api/users/UNFOLLOW'
const FOLLOW = 'api/users/FOLLOW'
const SET_USERS = 'api/users/SET-USERS'
const SET_CURRENT_PAGE = 'api/users/SET-CURRENT-PAGE'
const SET_TOTAL_COUNT = 'api/users/SET-TOTAL-COUNT'

export type UsersType = {
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

type ActionsType = ActionsTypes<typeof actions>

export const actions = {
    unfollower: (userID: number) => ({type: UNFOLLOW, userID} as const),
    follower: (userID: number) => ({type: FOLLOW, userID} as const),
    setUser: (users: Array<UsersType>) => ({type: SET_USERS, users} as const),
    setCurrentPage: (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const),
    setTotalCount: (totalUsersCount: number) => ({type: SET_TOTAL_COUNT, totalUsersCount} as const),
}

type ThunkType = ThunkAction<Promise<void>, any, any, ActionsType>

export const getUsers = (currentPage: number, pageSize: number): ThunkType => async (dispatch) => {
    const data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(actions.setUser(data.items))
    dispatch(actions.setTotalCount(data.totalCount))
}

export const unfollow = (id: number, setDisabled: (val: boolean) => void): ThunkType => async (dispatch) => {
    const response = await usersAPI.unfollow(id)
    if (response.resultCode === 0)
        dispatch(actions.unfollower(id))
    setDisabled(false)
}

export const follow = (id: number, setDisabled: (val: boolean) => void): ThunkType => async (dispatch) => {
    const response = await usersAPI.follow(id)
    if (response.resultCode === 0)
        dispatch(actions.follower(id))
    setDisabled(false)
}

export default UsersReducer;