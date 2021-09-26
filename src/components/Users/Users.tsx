import React, {FC, useEffect, useState} from "react";
import s from "./Users.module.css"
import Paginator from "../Paginator/Paginator";
import User from "./User";
import {UsersContainerType} from "./Users.Container";


const Users: FC<UsersContainerType> = (props) => {
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        props.getUsers(props.currentPage, props.pageSize)
    }, [props.currentPage, props.pageSize, disabled])

    let onPageChanged = (pageNumber: number) => {
        props.setCurrentPage(pageNumber);
    }

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div className={s.usersField}>
        <Paginator onPageChanged={onPageChanged} currentPage={props.currentPage} pages={pages}/>
        {
            props.user.map(u => {
                return <User user={u} follow={props.follow} unfollow={props.unfollow} setDisabled={setDisabled} disabled={disabled} />
            })
        }
    </div>
}

export default Users;