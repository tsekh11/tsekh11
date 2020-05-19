import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import {unfollower, follower, setUser, setCurrentPage, setTotalCount} from "../../Redux/users-reducer";
import * as axios from "axios";


let mapStateToProps = (state) => {
    return {
        user: state.userData.users,
        pageSize: state.userData.pageSize,
        totalUsersCount: state.userData.totalUsersCount,
        currentPage: state.userData.currentPage
    }
}


const UsersContainer = connect(mapStateToProps, {unfollower, follower, setUser, setCurrentPage, setTotalCount})(Users);

export default UsersContainer;