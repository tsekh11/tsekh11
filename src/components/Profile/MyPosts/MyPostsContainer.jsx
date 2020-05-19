import React from 'react';
import {newPostActionCreator, updatePostActionCreator} from "../../../Redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        post: state.profileData
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        updatePostText: (text) => {dispatch(updatePostActionCreator(text))},
        createNewPost: () => {dispatch(newPostActionCreator())}
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;