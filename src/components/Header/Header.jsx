import React from 'react';
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import logo from "../Pics/logo.png"
import logoutPic from "../Pics/logout.png"

const Header = (props) => {

    return <header className={s.header}>
        <img className={s.logo}
            src={logo} alt={''}/>
        <div className={s.login}>
            {
                props.isAuth !== null && props.isAuth ? props.login
                    : <NavLink to={'/login'} >
                        LOGIN
                </NavLink>
            }
            { props.isAuth ? <img src={logoutPic} className={s.logout} onClick={() => {props.logout()}} alt={''}/> : null }
        </div>
    </header>
}

export default Header;