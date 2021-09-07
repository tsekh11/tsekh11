import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import React from "react";

const EditDataForm = ({profile, setEdit, updateInfo}) => {

    const ContactsEdit = ({name}) => {
        return <div>
            <label htmlFor={name}>{name}:</label>
            <Field name={name} type="text" placeholder="Enter text"/>
            <div>
                <ErrorMessage name={name} />
            </div>
        </div>
    }

    return (
        <Formik
            initialValues={{
                aboutMe: profile.aboutMe,
                lookingForAJob: profile.lookingForAJob,
                lookingForAJobDescription: profile.lookingForAJobDescription,
                facebook: profile.contacts.facebook,
                website: profile.contacts.website,
                vk: profile.contacts.vk,
                twitter: profile.contacts.twitter,
                instagram: profile.contacts.instagram,
                youtube: profile.contacts.youtube,
                github: profile.contacts.github,
                mainLink: profile.contacts.mainLink,
                fullName: profile.fullName
            }}
            validationSchema={Yup.object({
                aboutMe: Yup.string().nullable()
                    .required('Required'),
                lookingForAJob: Yup.string().nullable()
                    .required('Required'),
                lookingForAJobDescription: Yup.string().nullable()
                    .required('Required'),
                fullName: Yup.string().nullable()
                    .required('Required'),
                facebook: Yup.string().nullable().url()
                    .required('Required'),
                website: Yup.string().nullable().url()
                    .required('Required'),
                vk: Yup.string().nullable().url()
                    .required('Required'),
                instagram: Yup.string().nullable().url()
                    .required('Required'),
                youtube: Yup.string().nullable().url()
                    .required('Required'),
                github: Yup.string().nullable().url()
                    .required('Required'),
                mainLink: Yup.string().nullable().url()
                    .required('Required'),
                twitter: Yup.string().nullable().url()
                    .required('Required'),
            })}
            onSubmit={
                (values) => {
                    const data = {
                        aboutMe: values["aboutMe"],
                        lookingForAJob: values["lookingForAJob"],
                        lookingForAJobDescription: values["lookingForAJobDescription"],
                        fullName: values["fullName"],
                        contacts: {
                            facebook: values["facebook"],
                            website: values["website"],
                            vk: values["vk"],
                            twitter: values["twitter"],
                            instagram: values["instagram"],
                            youtube: values["youtube"],
                            github: values["github"],
                            mainLink: values["mainLink"],
                        }
                    }
                    updateInfo(data)
                    setEdit(false)
                }
            }
        >
            <Form>
                <div>
                    <label htmlFor="info"><b>Info:</b></label>
                </div>
                <div>
                    <label htmlFor="aboutMe">About me:</label>
                    <Field name="aboutMe" type="text" placeholder="Enter text"/>
                </div>
                <div>
                    <ErrorMessage name="aboutMe" />
                </div>
                <div>
                    <label htmlFor="lookingForAJob">Looking for a job:</label>
                    <Field name="lookingForAJob" as="select">
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </Field>
                </div>
                <div>
                    <ErrorMessage name="lookingForAJob" />
                </div>
                <div>
                    <label htmlFor="lookingForAJobDescription">My skills:</label>
                    <Field name="lookingForAJobDescription" type="text" placeholder="Enter text"/>
                </div>
                <div>
                    <ErrorMessage name="lookingForAJobDescription" />
                </div>
                <div>
                    Contacts: {Object.keys(profile.contacts).map(key => {
                        return <ContactsEdit key={key} name={key} description={profile.contacts[key]}/>
                    }
                )}
                </div>
                <div>
                    <label htmlFor="fullName">My name:</label>
                    <Field name="fullName" type="text" placeholder="Enter text"/>
                </div>
                <div>
                    <ErrorMessage name="fullName" />
                </div>
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    )
}

export default EditDataForm