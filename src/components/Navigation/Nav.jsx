import React from 'react';
import st from './Nav.module.css'
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return <nav className={st.nav}>
        <div className={st.item}>
            <NavLink to='/profile'>Profile</NavLink>
        </div>
        <div className={st.item}>
            <NavLink to='/dialogs'>Messages</NavLink>
        </div>
        <div className={st.item}>
            <NavLink to='/music'>Music</NavLink>
        </div>
        <div className={st.item}>
            <NavLink to='/video'>Video</NavLink>
        </div>
        <div className={st.item}>
            <NavLink to='/news'>News</NavLink>
        </div>
        <div className={st.item}>
            <NavLink to='/settings'>Settings</NavLink>
        </div>
    </nav>
}

export default Navbar;