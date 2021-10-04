import React, {FC, useEffect} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getInfo,
    getStatus,
    ProfileType,
    savePhoto,
    setUserId,
    updateInfo,
    updateStatus
} from "../../Redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {WithAuthRedirect} from "../../HOC/WithAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../Redux/redux-store";


type MapStateToPropsType = {
    userId: number | null
    profile: ProfileType | null
    status: string
    isAuth: boolean | null
}

type MapDispatchToPropsType = {
    getInfo: (userId: number | null) => void
    getStatus: (userId: number | null) => void
    updateStatus: (status: string) => void
    savePhoto: (photo: any) => void
    setUserId: (userId: number | null) => void
    updateInfo: (data: ProfileType) => void
}

export type ProfileContainerType = MapDispatchToPropsType & MapStateToPropsType

const ProfileContainer: FC<ProfileContainerType & RouteComponentProps<any>> = (props) => {
    let userId: number | null;

    if (props.match.params.userId) {
        userId = +props.match.params.userId
        props.setUserId(userId)
    } else {
        userId = 8268
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
let MapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    userId: state.profileData.userId,
    profile: state.profileData.profile,
    status: state.profileData.status,
    isAuth: state.auth.isAuth
})

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStateType>(MapStateToProps, {getInfo, getStatus, updateStatus, savePhoto, setUserId, updateInfo}),
    withRouter,
    WithAuthRedirect
)(ProfileContainer)
