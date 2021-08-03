import React from 'react';
import s from './Header.module.css'
import {NavLink} from "react-router-dom";


const Header = (props) => {
    return <header className={s.header}>
        <img
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ43hxtf1M24Ye1TDjcA6oQ_R8fzPb4jOCwb-HnvezqGx70pbTG&usqp=CAU'/>
        <div className={s.login}>
            {
                props.isAuth ? props.login
                    : <NavLink to={'/login'}>LOGIN</NavLink>
            }
        </div>
    </header>
}

export default Header;