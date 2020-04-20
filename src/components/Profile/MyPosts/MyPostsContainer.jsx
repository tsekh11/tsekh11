import React from 'react';
import {newPostActionCreator, updatePostActionCreator} from "../../../Redux/profile-reducer";
import MyPosts from "./MyPosts";


const MyPostsContainer = (props) => {
    let newPost = () => {
       props.dispatch(newPostActionCreator());
    }

    let textChanges = (text) =>{
        props.dispatch(updatePostActionCreator(text));
    }

    return <MyPosts createNewPost={newPost} updatePostText={textChanges} post={props.state.profileData}/>
}

export default MyPostsContainer;