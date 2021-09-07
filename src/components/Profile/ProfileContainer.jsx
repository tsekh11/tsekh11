import React, {useEffect} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getInfo, getStatus, savePhoto, setUserId, updateInfo, updateStatus} from "../../Redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {WithAuthRedirect} from "../../HOC/WithAuthRedirect";
import {compose} from "redux";

const ProfileContainer = (props) => {
    let userId;

    if (props.match.params.userId) {
        userId = props.match.params.userId
        props.setUserId(userId)
    } else {
        userId = '8268'
        props.setUserId(userId)
    }

    useEffect(() => {
        props.getInfo(userId);
        props.getStatus(userId)
    }, [userId])

    return <div>
        <Profile {...props} profile={props.profile} updateStatus={props.updateStatus} status={props.status}/>
    </div>
}
let MapStateToProps = (state) => ({
    userId: state.profileData.userId,
    profile: state.profileData.profile,
    status: state.profileData.status,
    isAuth: state.auth.isAuth
})

export default compose(
    connect(MapStateToProps, {getInfo, getStatus, updateStatus, savePhoto, setUserId, updateInfo}),
    withRouter,
    WithAuthRedirect
)(ProfileContainer)
