import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import store from "./Redux/redux-store";
import ReactDOM from "react-dom";
import App from "./App";


let rerenderTree = (state) => {
    ReactDOM.render(
        <React.StrictMode>
            <App state={state} dispatch={store.dispatch.bind(store)} store={store}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

rerenderTree(store.getState());

store.subscribe(() => {
        let state = store.getState();
        rerenderTree(state);
    }
);

serviceWorker.unregister();
