import React, {useEffect} from "react";
import s from "./Users.module.css"
import * as axios from "axios";
import userlogo from "../Pics/userlogo.png"
import {NavLink} from "react-router-dom";
import {followAPI, getUsers, usersAPI} from "../../api/DAL";

const Users = (props) => {
    useEffect(() => {
        usersAPI.getUsers(props.currentPage, props.pageSize).then(data => {
                props.setUser(data.items)
                props.setTotalCount(data.totalCount)
            })
    }, [])

    let onPageChanged = (pageNumber) => {
        props.setCurrentPage(pageNumber);
        usersAPI.getUsers(pageNumber, props.pageSize).then(data => {
                props.setUser(data.items)
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
                return <span onClick={() => onPageChanged(p)}
                             className={props.currentPage === p && s.currentPage}>{p}</span>
            })
            }
        </div>
        {
            props.user.map(u => {
                return <div className={s.usersField} key={u.id}>
                <span>
                    <NavLink to={'/profile/' + u.id}>
                    <div>
                        <img className={s.img} src={u.photos.small != null ? u.photos.small : userlogo}/>
                    </div>
                    </NavLink>
                    <div>
                        {u.followed
                            ? <button onClick={() =>
                                axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                                    {
                                        withCredentials: true,
                                        headers: {
                                            'API-KEY': '86903fc2-0705-47d7-9513-c2f9a3e41faa'
                                        }
                                    }
                                )
                                    .then(response => {
                                        if (response.data.resultCode == 0)
                                            props.unfollower(u.id)
                                    })}>
                                Unfollow
                            </button>
                            : <button onClick={() =>
                                followAPI.follow(u.id).then(response => {
                                        if (response.data.resultCode == 0)
                                            props.follower(u.id)
                                    })}>
                                Follow
                            </button>}
                    </div>
                </span>
                    <span>
                    <span>{u.name}</span>
                    <div><span>{u.status}</span></div>
                </span>
                    <span><div>{u.location}</div></span>
                </div>
            })
        }
    </div>
}

export default Users;