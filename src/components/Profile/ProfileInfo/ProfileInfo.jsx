import React from 'react';
import s from './ProfileInfo.module.css'

const ProfileInfo = (props) => {
    return <div>
        <div className={s.background_img}>
            <div className={s.item}>
                <div>
                    <img src={props.profile != null ? props.profile.photos.large : []} />
                </div>
                <h3>{props.profile != null ? props.profile.fullName : []}</h3>
            </div>
        </div>

    </div>
}

export default ProfileInfo;