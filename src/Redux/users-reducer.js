import {usersAPI} from "../api/DAL";

const UNFOLLOW = 'api/users/UNFOLLOW'
const FOLLOW = 'api/users/FOLLOW'
const SET_USERS = 'api/users/SET-USERS'
const SET_CURRENT_PAGE = 'api/users/SET-CURRENT-PAGE'
const SET_TOTAL_COUNT = 'api/users/SET-TOTAL-COUNT'

const initialState = {
    users: [],
    pageSize: 15,
    totalUsersCount: 0,
    currentPage: 1
}

const followFunc = (data, action, value) => {
    data.map(u => {
        if (u.id === action.userID) {
            return {...u, followed: value}
        }
        return u
    })
}

const UsersReducer = (state = initialState, action) => {
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

export const unfollower = (userID) => ({type: UNFOLLOW, userID});
export const follower = (userID) => ({type: FOLLOW, userID});
export const setUser = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalCount = (totalUsersCount) => ({type: SET_TOTAL_COUNT, totalUsersCount});

export const getUsers = (currentPage, pageSize) => async (dispatch) => {
    const data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(setUser(data.items))
    dispatch(setTotalCount(data.totalCount))
}

export const unfollow = (id, setDisabled) => async (dispatch) => {
    const response = await usersAPI.unfollow(id)
    if (response.data.resultCode === 0)
        dispatch(unfollower(id))
    setDisabled(false)
}

export const follow = (id, setDisabled) => async (dispatch) => {
    const response = await usersAPI.follow(id)
    if (response.data.resultCode === 0)
        dispatch(follower(id))
    setDisabled(false)
}

export default UsersReducer;