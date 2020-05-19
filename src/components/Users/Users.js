import React, {useEffect} from "react";
import s from "./Users.module.css"
import * as axios from "axios";

const Users = (props) => {
   useEffect( () => {
       axios
           .get(`https://social-network.samuraijs.com/api/1.0/users?page=${props.currentPage}&count=${props.pageSize}`)
           .then(response => {
               props.setUser(response.data.items)
               props.setTotalCount(response.data.totalCount)
           })
   }, [])

    let onPageChanged = (pageNumber) => {
        props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${props.pageSize}`)
            .then(response => {
                props.setUser(response.data.items)
            })
    }

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div>
        <div>
            {pages.map(p => {
               return <span onClick={() => onPageChanged(p)} className={props.currentPage === p && s.currentPage}>{p}</span>
            })
            }
        </div>
        {
            props.user.map(u => {return <div className={s.usersField} key={u.id}>
                <span>
                    <div><img className={s.img} src={u.photos.small}/></div>
                    <div>
                        {u.followed ? <button onClick={() => props.unfollower(u.id)}>Unfollow</button>
                        : <button onClick={() => props.follower(u.id)}>Follow</button>}
                    </div>
                </span>
                <span>
                    <span>{u.name}</span>
                    <div><span>{u.status}</span></div>
                </span>
                <span><div>{u.location}</div></span>
               </div>})
        }
    </div>
}

export default Users;