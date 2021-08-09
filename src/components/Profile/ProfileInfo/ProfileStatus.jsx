import React, {useEffect, useState} from 'react';
import s from './ProfileInfo.module.css'

const ProfileStatus = (props) => {
    const [isEdit, setIsEdit] = useState(false)
    const [status, setStatus] = useState('')

    useEffect( () => {
        props.status && setStatus(props.status)
        }, [props.status]
    )

    const onBlurAction = () => {
        setIsEdit(false);
        props.updateStatus(status)
    }

    return <div>
            <div className={s.status}>
                <div>
                    {!isEdit ? <span onClick={() => props.userId === "8268" && setIsEdit(true)}>{props.status || "-----"}</span> :
                        <input onBlur={onBlurAction} onChange={(event) => setStatus(event.currentTarget.value)} autoFocus={true} value={status}/>}
                </div>
            </div>
        </div>
}

export default ProfileStatus;