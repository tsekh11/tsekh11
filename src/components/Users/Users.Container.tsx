import {connect} from "react-redux";
import Users from "./Users";
import {unfollow, follow, getUsers, actions} from "../../Redux/users-reducer";
import {
    getCurrentPageSelector,
    getPageSizeSelector,
    getTotalUsersCountSelector,
    getUsersSelector
} from "../../Redux/users-selectors";
import {AppStateType} from "../../Redux/redux-store";

type PhotosType = {
    "small": null | string
    "large": null | string
}

export type UserType = {
    "name": string
    "id": number
    "photos": PhotosType
    "status": null | string
    "followed": boolean
}

type MapStateToPropsType = {
    user: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
}

type MapDispatchToPropsType = {
    unfollow: (id: number, setDisabled: any) => void
    follow: (id: number, setDisabled: any) => void
    setCurrentPage: (currentPage: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}


export type UsersContainerType = MapStateToPropsType & MapDispatchToPropsType

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        user: getUsersSelector(state),
        pageSize: getPageSizeSelector(state),
        totalUsersCount: getTotalUsersCountSelector(state),
        currentPage: getCurrentPageSelector(state)
    }
}

const UsersContainer = connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStateType>(mapStateToProps, {unfollow, follow, setCurrentPage: actions.setCurrentPage, getUsers})(Users);

export default UsersContainer;