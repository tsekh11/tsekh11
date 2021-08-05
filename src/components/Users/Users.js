import React, {useEffect, useState} from "react";
import s from "./Users.module.css"
import userlogo from "../Pics/userlogo.png"
import {NavLink} from "react-router-dom";

const Users = (props) => {
    const [disabled, setDisabled] = useState(false);
    let [portionNumber, setPortionNumber] = useState(1);

    useEffect(() => {
        props.getUsers(props.currentPage, props.pageSize)
    }, [props.currentPage, props.pageSize, disabled])

    let onPageChanged = (pageNumber) => {
        props.setCurrentPage(pageNumber);
        props.getUsers(props.currentPage, props.pageSize)
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
                                props.unfollow(u.id, setDisabled)
                            }}>
                                Unfollow
                            </button>
                            : <button disabled={disabled} onClick={() => {
                                setDisabled(true)
                                props.follow(u.id, setDisabled)
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