import React, {useState} from 'react';
import s from './ProfileInfo.module.css'
import userLogo from "../../Pics/userlogo.png"
import ProfileStatus from "./ProfileStatus";
import EditDataForm from "./EditDataForm";

const ProfileInfo = (props) => {
    const [edit, setEdit] = useState(false)

    const onPhotoChange = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    return <div>
        <div className={s.background_img}>
            <div className={s.item}>
                <div>
                    <img
                        src={props.profile && props.profile.photos.large != null ? props.profile.photos.large : userLogo}/>
                </div>
                <h3>{props.profile != null ? props.profile.fullName : null}</h3>
                <ProfileStatus userId={props.userId} updateStatus={props.updateStatus} status={props.status}/>
                <div>
                {edit ? <EditDataForm profile={props.profile} setEdit={setEdit} updateInfo={props.updateInfo}/> :
                    <InfoData profile={props.profile}/>
                }
                </div>
            </div>
            <div>
                {props.userId === '8268' ?
                    <div>
                        <div>
                            <input type="file" onChange={onPhotoChange}/>
                        </div>
                        {!edit ?
                            <div>
                                <button onClick={() => setEdit(true)}>Edit profile</button>
                            </div> : null
                        }
                    </div> :
                    null
                }
            </div>
        </div>
    </div>
}


const InfoData = ({profile}) => {

    const Contacts = ({name, description}) => {
        return <div>{name}: {description}</div>
    }

    return <>{profile && <div>
        <div>
            <b>Info:</b>
        </div>
        <div>
            About me: {profile.aboutMe}
        </div>
        <div>
            Looking for a job: {profile.lookingForAJob ? "Yes" : "No"}
        </div>
        <div>
            My skills: {profile.lookingForAJobDescription}
        </div>
        <div>
            Contacts: {Object.keys(profile.contacts).map(key => {
                return <Contacts key={key} name={key} description={profile.contacts[key]}/>
            }
        )}
        </div>
    </div>
    }
    </>
}

export default ProfileInfo;