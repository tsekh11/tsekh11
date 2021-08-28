import React from 'react';
import s from './ProfileInfo.module.css'
import userLogo from "../../Pics/userlogo.png"
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props) => {

    const onPhotoChange = (e) => {
        if(e.target.files.length){
            props.savePhoto(e.target.files[0])
        }
    }

    return <div>
        <div className={s.background_img}>
            <div className={s.item}>
                <div>
                    <img src={props.profile && props.profile.photos.large != null ? props.profile.photos.large : userLogo} />
                </div>
                <h3>{props.profile != null ? props.profile.fullName : []}</h3>
                <ProfileStatus userId={props.userId} updateStatus={props.updateStatus} status={props.status} />
            </div>
            <div>
                { props.userId === '8268' ?
                    <input type="file" onChange={onPhotoChange}/> :
                    null
                }
            </div>
        </div>
    </div>
}

export default ProfileInfo;