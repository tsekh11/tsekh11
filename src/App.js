import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navigation/Nav';
import {BrowserRouter, Route} from "react-router-dom";
import Music from "./components/Music/Music";
import Video from "./components/Video/Video";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/Dialogs.Container";
import UsersContainer from "./components/Users/Users.Container"
import ProfileContainer from "./components/Profile/ProfileContainer";


const App = (props) => {
    return (
        <BrowserRouter>
        <div className='app-wrapper'>
            <Header/>
            <Navbar/>
            <div className='app-wrapper-content'>
                <Route path='/profile' render={() => <ProfileContainer />}/>
                <Route path='/dialogs' render={() => <DialogsContainer />}/>
                <Route path='/users' render={() => <UsersContainer />}/>
                <Route path='/music' component={Music}/>
                <Route path='/video' component={Video}/>
                <Route path='/news' component={News}/>
                <Route path='/settings' component={Settings}/>
            </div>
        </div>
        </BrowserRouter>
    );
}

export default App;