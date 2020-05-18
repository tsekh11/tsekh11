import React from 'react';
import {newPostActionCreator, updatePostActionCreator} from "../../../Redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";



// const MyPostsContainer = (props) => {
//     let newPost = () => {
//        props.dispatch(newPostActionCreator());
//     }
//
//     let textChanges = (text) =>{
//         props.dispatch(updatePostActionCreator(text));
//     }
//
//     return <MyPosts createNewPost={newPost} updatePostText={textChanges} post={props.state.profileData}/>
// }

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