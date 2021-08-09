import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
    return <div>
        <ProfileInfo profile={props.profile} updateStatus={props.updateStatus} status={props.status} userId={props.userId}/>
        <MyPostsContainer/>
    </div>
}

export default Profile;