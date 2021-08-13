import {createSelector} from "reselect";

const getUsers = (state) => {
    return state.userData.users.filter(u => true)
}

export const getUsersSelector = createSelector(
    getUsers, (users) => {
        return users.filter(u => true)
    }
)



export const getPageSizeSelector = (state) => {
    return state.userData.pageSize
}

export const getTotalUsersCountSelector = (state) => {
    return state.userData.totalUsersCount
}

export const getCurrentPageSelector = (state) => {
    return state.userData.currentPage
}

