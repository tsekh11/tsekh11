import {newPostActionCreator, PostType, updatePostActionCreator} from "../../../Redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../Redux/redux-store";

type MapStateToPropsType = {
    postData: Array<PostType>
    newPostText: string
}

type MapDispatchToPropsType = {
    updatePostActionCreator: (test: string) => void
    newPostActionCreator: () => void
}

export type PostsType = MapDispatchToPropsType & MapStateToPropsType

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        postData: state.profileData.postData,
        newPostText: state.profileData.newPostText
    }
}

const MyPostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStateType>(mapStateToProps, {updatePostActionCreator, newPostActionCreator})(MyPosts);

export default MyPostsContainer;