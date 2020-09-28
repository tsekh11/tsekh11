import React from 'react';
import s from './Post.module.css'

const Post = (props) => {
    return <div className={s.item}>
        <img src='https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/v1555921450/shape/mentalfloss/theterminator.jpg?itok=y0C2LP_j'/>
        {props.message}
        <div>
            <button>Like {props.likenum}</button>
        </div>
    </div>

}

export default Post;