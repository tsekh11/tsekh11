import React from 'react';
import dialogReducer, {newMessageActionCreator} from "./dialog-reducer";

test(`answer should be 'test message'`, () => {
    const state = {
        dialogData: [
            {name: 'Misha', id: '1'},
            {name: 'Armen', id: '2'},
            {name: 'Stiven', id: '3'},
            {name: 'Jamal', id: '4'},
            {name: 'Ben', id: '5'}
        ],
        messageData: [
            {message: 'Hi'},
            {message: 'Hi'},
            {message: 'Hi'},
            {message: 'Hi'},
            {message: 'Hello'}
        ],
        updateTextArea:'test message'
    }

    let action = newMessageActionCreator();

    let newState = dialogReducer(state, action);

    expect(newState.messageData[5].message).toBe('test message')
});


test(`array length should be incremented`, () => {
    const state = {
        dialogData: [
            {name: 'Misha', id: '1'},
            {name: 'Armen', id: '2'},
            {name: 'Stiven', id: '3'},
            {name: 'Jamal', id: '4'},
            {name: 'Ben', id: '5'}
        ],
        messageData: [
            {message: 'Hi'},
            {message: 'Hi'},
            {message: 'Hi'},
            {message: 'Hi'},
            {message: 'Hello'}
        ],
        updateTextArea:'test message'
    }

    let action = newMessageActionCreator();

    let newState = dialogReducer(state, action);

    expect(newState.messageData.length).toBe(6)
});