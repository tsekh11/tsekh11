import React, {useEffect, useState} from "react";
import s from "./Users.module.css"
import userlogo from "../Pics/userlogo.png"
import {NavLink} from "react-router-dom";
import {followAPI, usersAPI} from "../../api/DAL";

const Users = (props) => {
    const [disabled, setDisabled] = useState(false);
    let [portionNumber, setPortionNumber] = useState(1);

    useEffect(() => {
        usersAPI.getUsers(props.currentPage, props.pageSize).then(data => {
            props.setUser(data.items)
            props.setTotalCount(data.totalCount)
        })
    }, [props.currentPage, props.pageSize, disabled])

    let onPageChanged = (pageNumber) => {
        props.setCurrentPage(pageNumber);
        usersAPI.getUsers(pageNumber, props.pageSize).then(data => {
            props.setUser(data.items)
        })
    }
    let portionSize = 10;
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let leftPortionBorder = (portionNumber - 1) * portionSize + 1;
    let rightPortionBorder = portionNumber * portionSize;

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div className={s.usersField}>
        <div>
            { portionNumber > 1 &&
            <button onClick={() => setPortionNumber(portionNumber - 1)} className={s.button} >Back</button>
            }
            {
                pages.filter(p => p >= leftPortionBorder && p <= rightPortionBorder)
                .map(p => {
                return <span onClick={() => onPageChanged(p)}
                             className={props.currentPage === p ? s.currentPage : s.span}>{p}</span>
            })
            }
            { portionNumber !== portionSize &&
            <button onClick={() => setPortionNumber(portionNumber + 1)} className={s.button} >Next</button>
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
                        {u.followed ? <button disabled={disabled} onClick={() => {
                                setDisabled(true)
                                followAPI.unfollow(u.id).then(response => {
                                        if (response.data.resultCode === 0)
                                            props.unfollower(u.id)
                                        setDisabled(false)
                                    })
                            }}>
                                Unfollow
                            </button>
                            : <button disabled={disabled} onClick={() => {
                                setDisabled(true)
                                followAPI.follow(u.id).then(response => {
                                    if (response.data.resultCode === 0)
                                        props.follower(u.id)
                                        setDisabled(false)
                                })
                            }
                            }>
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