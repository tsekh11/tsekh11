const initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 20,
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

export default UsersReducer;