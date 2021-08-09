import React from 'react';
import st from './Nav.module.css'
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return <nav className={st.nav}>
        <div className={st.item}>
            <NavLink to='/profile/8268'>
                <div className={st.name}>Profile</div>
            </NavLink>
        </div>
        <div className={st.item}>
            <NavLink to='/dialogs'>
                <div className={st.name}>Messages</div>
            </NavLink>
        </div>
        <div className={st.item}>
            <NavLink to='/music'>
                <div className={st.name}>Music</div>
            </NavLink>
        </div>
        <div className={st.item}>
            <NavLink to='/video'>
                <div className={st.name}>Video</div>
            </NavLink>
        </div>
        <div className={st.item}>
            <NavLink to='/news'>
                <div className={st.name}>News</div>
            </NavLink>
        </div>
        <div className={st.item}>
            <NavLink to='/users'>
                <div className={st.name}>Users page</div>
            </NavLink>
        </div>
        <div className={st.item}>
            <NavLink to='/settings'>
                <div className={st.name}>Settings</div>
            </NavLink>
        </div>
    </nav>
}

export default Navbar;