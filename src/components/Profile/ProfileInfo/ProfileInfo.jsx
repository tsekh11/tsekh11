import React from 'react';
import s from './ProfileInfo.module.css'
import userLogo from "../../Pics/userlogo.png"
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props) => {
    return <div>
        <div className={s.background_img}>
            <div className={s.item}>
                <div>
                    <img src={props.profile && props.profile.photos.large != null ? props.profile.photos.large : userLogo} />
                </div>
                <h3>{props.profile != null ? props.profile.fullName : []}</h3>
                <ProfileStatus />
            </div>
        </div>
    </div>
}

export default ProfileInfo;