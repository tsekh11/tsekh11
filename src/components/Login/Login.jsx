import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import s from './Login.module.css'

const LoginForm = () => {
    return (
        <Formik
            initialValues={{ login: '', password: '', checked: [] }}
            validationSchema={Yup.object({
                login: Yup.string()
                    .min(4, 'Must be 4 characters or more')
                    .max(15, 'Must be 15 characters or less')
                    .required('Required'),
                password: Yup.string()
                    .min(4, 'Must be 4 characters or more')
                    .max(20, 'Must be 20 characters or less')
                    .required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            <Form className={s.form_wrapper} >
                <label htmlFor="login" className={s.label} >Login</label>
                <Field name="login" type="text" className={s.inputStyle} />
                <span className={s.errorStyle}>
                    <ErrorMessage name="login" />
                </span>

                <label htmlFor="password" className={s.label} >Password</label>
                <Field name="password" type="text" className={s.inputStyle} />
                <span className={s.errorStyle}>
                     <ErrorMessage name="password" />
                </span>

                <label className={s.label} >
                <Field type="checkbox" name="checked" value="Yes" />
                remember me
                </label>

                <button type="submit" className={s.button}>Submit</button>
            </Form>
        </Formik>
    );
};

const Login = () => <div className={s.wrapper}>
    <h3>Login please</h3>
    <LoginForm />
</div>

export default Login