import React from 'react';
import loader from '../Pics/loading.gif'
import s from '../Loader/Loader.module.css'

const Loader = (props) => {
    return <div className={s.img}>
        <img src={loader}/>
    </div>
}

export default Loader