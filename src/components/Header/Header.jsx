import React from 'react';
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import logo from "../Pics/logo.png"


const Header = (props) => {
    return <header className={s.header}>
        <img
            src={logo}/>
        <div className={s.login}>
            {
                props.isAuth ? props.login
                    : <NavLink to={'/login'}>LOGIN</NavLink>
            }
        </div>
    </header>
}

export default Header;