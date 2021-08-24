import s from "./Users.module.css";
import {NavLink} from "react-router-dom";
import userlogo from "../Pics/userlogo.png";
import React from "react";


const User = ({user, follow, unfollow, disabled, setDisabled}) => {
    let u = user;

    return <div className={s.usersField} key={u.id}>
                <span>
                    <NavLink to={'/profile/' + u.id}>
                    <div>
                        <img className={s.img} src={u.photos.small ? u.photos.small : userlogo}/>
                    </div>
                    </NavLink>
                    <div>
                        {u.followed ? <button disabled={disabled} onClick={() => {
                                setDisabled(true)
                                unfollow(u.id, setDisabled)
                            }}>
                                Unfollow
                            </button>
                            : <button disabled={disabled} onClick={() => {
                                setDisabled(true)
                                follow(u.id, setDisabled)
                            }
                            }>
                                Follow
                            </button>}
                    </div>
                </span>
        <span>
                        <span>{u.name}</span>
                        <div>
                            <span>{u.status}</span>
                        </div>
                    </span>
        <span>
                        <div>{u.location}</div>
                    </span>
    </div>
}
export default User