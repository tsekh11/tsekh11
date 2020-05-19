import React, {useEffect} from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import * as axios from "axios";

const Profile = (props) => {
    return <div>
        <ProfileInfo profile={props.profile}/>
        <MyPostsContainer/>
    </div>
}

export default Profile;