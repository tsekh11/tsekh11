import React, {useEffect} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getInfo} from "../../Redux/profile-reducer";
import {Redirect, withRouter} from "react-router-dom";
import {WithAuthRedirect} from "../../HOC/WithAuthRedirect";

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

let AuthRedirectComponent = WithAuthRedirect(ProfileContainer)

export default connect(MapStateToProps, {getInfo}) (withRouter(AuthRedirectComponent));