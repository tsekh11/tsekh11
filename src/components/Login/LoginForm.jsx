import React from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import s from './Login.module.css'

const LoginForm = (props) => {
    return (
        <Formik
            initialValues={{login: '', password: '', checked: [], captcha: ''}}
            validationSchema={Yup.object({
                email: Yup.string().email('Invalid email address').required('Required'),
                password: Yup.string()
                    .min(4, 'Must be 4 characters or more')
                    .max(20, 'Must be 20 characters or less')
                    .required('Required'),
            })}
            onSubmit={
                (values) => {
                    const {email, password, rememberMe, captcha} = {...values}
                    props.login(email, password, rememberMe, captcha)
                }
            }
        >
            <Form className={s.form_wrapper}>
                <label htmlFor="email" className={s.label}>Login:</label>
                <Field name="email" type="text" placeholder="Enter email" className={s.inputStyle}/>
                <span className={s.errorStyle}>
                    <ErrorMessage name="email"/>
                </span>

                <label htmlFor="password" className={s.label}>Password:</label>
                <Field name="password" type="password" placeholder="Enter password" className={s.inputStyle}/>
                <span className={s.errorStyle}>
                     <ErrorMessage name="password"/>
                </span>

                <label className={s.label}>
                    <Field type="checkbox" name="rememberMe"/>
                    remember me
                </label>

                {props.captchaUrl && <img src={props.captchaUrl} width='150px'/>}
                {props.captchaUrl && <span>
                    <Field name="captcha" placeholder="Enter captcha" className={s.inputStyle}/>
                </span>
                }

                {
                    props.isErrorLogin ? <label className={s.errorStyle}>
                        {props.errorMessage}
                    </label> : null
                }

                <button type="submit" className={s.button}>Submit</button>
            </Form>
        </Formik>
    );
};

export default LoginForm
