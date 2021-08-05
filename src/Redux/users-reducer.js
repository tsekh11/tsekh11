import {usersAPI} from "../api/DAL";

const initialState = {
    users: [],
    pageSize: 15,
    totalUsersCount: 0,
    currentPage: 1
}

const UsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                        if (u.id === action.userID) {
                            return {...u, followed: false}
                        }
                        return u;
                    }
                )
            }
        case 'FOLLOW': {
            return {
                ...state,
                users: state.users.map(u => {
                        if (u.id === action.userID) {
                            return {...u, followed: true}
                        }
                        return u;
                    }
                )
            }
        }
        case 'SET-USERS': {
            return {...state, users: action.users }
        }
        case 'SET-CURRENT-PAGE': {
            return {...state, currentPage: action.currentPage }
        }
        case 'SET-TOTAL-COUNT': {
            return {...state, totalUsersCount: action.totalUsersCount }
        }
        default:
            return state;
    }
}

export const unfollower = (userID) => ({type: 'UNFOLLOW', userID});
export const follower = (userID) => ({type: 'FOLLOW', userID});
export const setUser = (users) => ({type: 'SET-USERS', users});
export const setCurrentPage = (currentPage) => ({type: 'SET-CURRENT-PAGE', currentPage});
export const setTotalCount = (totalUsersCount) => ({type: 'SET-TOTAL-COUNT', totalUsersCount});

export const getUsers = (currentPage, pageSize) => (dispatch) => {
    usersAPI.getUsers(currentPage, pageSize).then(data => {
        dispatch(setUser(data.items))
        dispatch(setTotalCount(data.totalCount))
    })
}

export const unfollow = (id, setDisabled) => (dispatch) => {
    usersAPI.unfollow(id).then(response => {
        if (response.data.resultCode === 0)
            dispatch(unfollower(id))
        setDisabled(false)
    })
}

export const follow = (id, setDisabled) => (dispatch) => {
    usersAPI.follow(id).then(response => {
        if (response.data.resultCode === 0)
            dispatch(follower(id))
        setDisabled(false)
    })
}

export default UsersReducer;