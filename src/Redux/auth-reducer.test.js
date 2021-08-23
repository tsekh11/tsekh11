import React from 'react';
import authReducer, {setLoginError} from "./auth-reducer";

test(`answer should be 'Login is invalid'`, () => {
    let state = {
        id: null,
        login: null,
        email: null,
        isAuth: null,
        errorMessage: '',
        isErrorLogin: false,
        isInitialized: false
    };

    let action = setLoginError('Login is invalid');

    let newState = authReducer(state, action);

    expect(newState.errorMessage).toBe('Login is invalid')
});