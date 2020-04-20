import React from 'react';
import s from './MyPosts.module.css'
import Post from "./Posts/Post";


const MyPosts = (props) => {
    let newPostText = React.forwardRef();
    let posts = props.post.postData.map(p => <Post message={p.message} likenum={p.likenum}/>)

    let newPost = () => {
        props.createNewPost();
    }

    let textChanges = () =>{
        let text = newPostText.current.value;
        props.updatePostText(text);
    }

    return <div className={s.item}>
        <h3>My Posts</h3>
        <div>
            <textarea onChange={textChanges} ref={newPostText} value={props.post.newPostText}/>
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