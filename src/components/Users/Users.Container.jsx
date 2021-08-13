import {connect} from "react-redux";
import Users from "./Users";
import {unfollow, follow, setCurrentPage, getUsers} from "../../Redux/users-reducer";
import {
    getCurrentPageSelector,
    getPageSizeSelector,
    getTotalUsersCountSelector,
    getUsersSelector
} from "../../Redux/users-selectors";


let mapStateToProps = (state) => {
    return {
        user: getUsersSelector(state),
        pageSize: getPageSizeSelector(state),
        totalUsersCount: getTotalUsersCountSelector(state),
        currentPage: getCurrentPageSelector(state)
    }
}

const UsersContainer = connect(mapStateToProps, {unfollow, follow, setCurrentPage, getUsers})(Users);

export default UsersContainer;