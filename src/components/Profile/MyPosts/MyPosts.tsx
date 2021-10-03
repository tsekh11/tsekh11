import React, {FC} from 'react';
import s from './MyPosts.module.css'
import { PostsType } from './MyPostsContainer';
import Post from "./Posts/Post";


const MyPosts: FC<PostsType> = (props) => {
    let posts = props.postData.map(p => <Post message={p.message} likenum={p.likenum}/>)

    let newPost = () => {
        props.newPostActionCreator();
    }

    let textChanges = (e: any) =>{
        props.updatePostActionCreator(e.target.value);
    }

    return <div className={s.item}>
        <h3>My Posts</h3>
        <div>
            <textarea onChange={textChanges} value={props.newPostText}/>
        </div>
        <div>
            <button onClick={newPost}>Send</button>
        </div>
        <div className={s.item}>
            New posts
        </div>
        <div>
            {
                posts
            }
        </div>
    </div>
}

export default MyPosts;