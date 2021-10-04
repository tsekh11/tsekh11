import React, {FC, useState} from 'react';
import s from './ProfileInfo.module.css'
import userLogo from "../../Pics/userlogo.png"
import ProfileStatus from "./ProfileStatus";
import EditDataForm from "./EditDataForm";
import Loader from "../../Loader/Loader";
import { ProfileContainerType } from '../ProfileContainer';
import { ProfileType } from '../../../Redux/profile-reducer';

const ProfileInfo: FC<ProfileContainerType> = (props) => {
    const [edit, setEdit] = useState(false)
    const [showInfo, setShowInfo] = useState(false)

    const onPhotoChange = (e: any) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    if (props.profile) {

        return <div>
            <div className={s.background_img}>
                <div className={s.item}>
                    <div>
                        <img
                            src={props.profile.photos.large || userLogo}/>
                    </div>
                    <h3>{props.profile.fullName}</h3>
                    <ProfileStatus userId={props.userId} updateStatus={props.updateStatus} status={props.status}/>
                    <div>
                        {!showInfo ?
                            <h4 onClick={() => setShowInfo(true)}>Show info</h4> :
                            <h4 onClick={() => setShowInfo(false)}>Hide info</h4>
                        }
                        {showInfo ?
                            <div>
                                {edit ? <EditDataForm profile={props.profile} setEdit={setEdit}
                                                      updateInfo={props.updateInfo}/> :
                                    <InfoData {...props}/>
                                }
                            </div> : null
                        }
                    </div>
                </div>
                <div>
                    {props.userId === 8268 ?
                        <div>
                            <div>
                                <input type="file" onChange={onPhotoChange}/>
                            </div>
                            {!edit ?
                                <div>
                                    <button onClick={() => setEdit(true)}>Edit info</button>
                                </div> : null
                            }
                        </div> :
                        null
                    }
                </div>
            </div>
        </div>
    } else {
        return <Loader/>
    }
}

type ContactsType = {
    name: string
    description: string
    profile: ProfileType
}

const InfoData: FC<ProfileContainerType> = (props) => {

    const Contacts: FC<ContactsType> = (props) => {
        return <div>{props.name}: {props.description}</div>
    }

    return <>{props.profile && <div>
        {/*<div>*/}
        {/*    About me: {props.profile.aboutMe}*/}
        {/*</div>*/}
        <div>
            Looking for a job: {props.profile.lookingForAJob ? "Yes" : "No"}
        </div>
        <div>
            My skills: {props.profile.lookingForAJobDescription}
        </div>
        <div>
            Contacts: {Object.keys(props.profile.contacts).map((key) => {
                // @ts-ignore
            return <Contacts key={key} name={key} description={props.profile.contacts[key]}/>
            }
        )}
        </div>
    </div>
    }
    </>
}


export default ProfileInfo;