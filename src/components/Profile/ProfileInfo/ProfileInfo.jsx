import React, {useEffect} from 'react';
import s from './ProfileInfo.module.css'
import * as axios from "axios";

const ProfileInfo = (props) => {
    return <div>
        <div className={s.img}>
            <img src='https://bgfons.com/upload/rainbow_texture679.jpg'/>
        </div>
        <div className={s.item}>
           <div><img src={props.profile != null ? props.profile.photos.large : []} /></div>
            ava
        </div>
    </div>
}

export default ProfileInfo;