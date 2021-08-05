import React, {useEffect} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getInfo} from "../../Redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {WithAuthRedirect} from "../../HOC/WithAuthRedirect";
import {compose} from "redux";

const ProfileContainer = (props) => {
    let userId = props.match.params.userId;
    useEffect( () => {
        props.getInfo(userId)
    }, [userId])

        return <div>
        <Profile {...props} profile={props.profile} />
    </div>
}
let MapStateToProps = (state) => ({
    profile: state.profileData.profile,
    isAuth: state.auth.isAuth
})

export default compose(
    connect(MapStateToProps, {getInfo}),
    withRouter,
    WithAuthRedirect
)(ProfileContainer)
