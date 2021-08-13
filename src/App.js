import React, {useEffect} from 'react';
import './App.css';
import Navbar from './components/Navigation/Nav';
import {BrowserRouter, Route} from "react-router-dom";
import Music from "./components/Music/Music";
import Video from "./components/Video/Video";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/Dialogs.Container";
import UsersContainer from "./components/Users/Users.Container"
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {getAuth} from "./Redux/auth-reducer";

const App = (props) => {

    useEffect(() => {
        props.getAuth()
    }, [])

    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                    <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/video' component={Video}/>
                    <Route path='/news' component={News}/>
                    <Route path='/settings' component={Settings}/>
                    <Route path='/login' component={Login}/>
                </div>
            </div>
        </BrowserRouter>
    );

}


export default connect(null, {getAuth})(App);