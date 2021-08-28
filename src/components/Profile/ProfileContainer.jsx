import React, {useEffect} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getInfo, getStatus, savePhoto, updateStatus} from "../../Redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {WithAuthRedirect} from "../../HOC/WithAuthRedirect";
import {compose} from "redux";

const ProfileContainer = (props) => {
    let userId = null

    if (props.match.params.userId) {
        userId = props.match.params.userId
    }else {
        userId = '8268'
    }

    useEffect( () => {
        props.getInfo(userId);
        props.getStatus(userId)
    }, [userId, props.photos])

        return <div>
        <Profile {...props} profile={props.profile} updateStatus={props.updateStatus} status={props.status} userId={userId}/>
    </div>
}
let MapStateToProps = (state) => ({
    photos: state.profileData.profile && state.profileData.profile.photos.large,
    profile: state.profileData.profile,
    status: state.profileData.status,
    isAuth: state.auth.isAuth
})

export default compose(
    connect(MapStateToProps, {getInfo, getStatus, updateStatus, savePhoto}),
    withRouter,
    WithAuthRedirect
)(ProfileContainer)
