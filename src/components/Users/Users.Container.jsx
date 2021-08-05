import {connect} from "react-redux";
import Users from "./Users";
import {unfollow, follow, setCurrentPage, getUsers} from "../../Redux/users-reducer";


let mapStateToProps = (state) => {
    return {
        user: state.userData.users,
        pageSize: state.userData.pageSize,
        totalUsersCount: state.userData.totalUsersCount,
        currentPage: state.userData.currentPage
    }
}

const UsersContainer = connect(mapStateToProps, {unfollow, follow, setCurrentPage, getUsers})(Users);

export default UsersContainer;