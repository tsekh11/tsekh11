import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import s from './Login.module.css'
import {connect} from "react-redux";
import {login, logout} from "../../Redux/auth-reducer";
import {Redirect} from "react-router-dom";

const LoginForm = (props) => {
    return (
        <Formik
            initialValues={{ login: '', password: '', checked: [] }}
            validationSchema={Yup.object({
                email: Yup.string().email('Invalid email address').required('Required'),
                password: Yup.string()
                    .min(4, 'Must be 4 characters or more')
                    .max(20, 'Must be 20 characters or less')
                    .required('Required'),
            })}
            onSubmit={
                (values) => {
                    const {email, password, rememberMe} = {...values}
                    props.login(email, password, rememberMe)
                }
            }
        >
            <Form className={s.form_wrapper} >
                <label htmlFor="email" className={s.label} >Login:</label>
                <Field name="email" type="text" placeholder="Enter email" className={s.inputStyle} />
                <span className={s.errorStyle}>
                    <ErrorMessage name="email" />
                </span>

                <label htmlFor="password" className={s.label} >Password:</label>
                <Field name="password" type="password" placeholder="Enter password" className={s.inputStyle} />
                <span className={s.errorStyle}>
                     <ErrorMessage name="password" />
                </span>

                <label className={s.label} >
                <Field type="checkbox" name="rememberMe" />
                remember me
                </label>

                <button type="submit" className={s.button}>Submit</button>
            </Form>
        </Formik>
    );
};

const Login = (props) => {
    if (props.isAuth !== null && props.isAuth) {
        return <Redirect to={"/profile/8268"}/>
    }
    return <div className={s.wrapper}>
        <h3>Login please</h3>
        <LoginForm login={props.login} logout={props.logout}/>
    </div>
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {login, logout} )(Login)