import React, {useEffect} from 'react';
import './App.css';
import Navbar from './components/Navigation/Nav';
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import Music from "./components/Music/Music";
import Video from "./components/Video/Video";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
//import DialogsContainer from "./components/Dialogs/Dialogs.Container";
//import UsersContainer from "./components/Users/Users.Container"
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {WithSuspense} from "./HOC/WithSuspense";
import {getIsInitialized} from "./Redux/app-reducer";
import Loader from "./components/Loader/Loader";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/Dialogs.Container'));
const UsersContainer = React.lazy(() => import('./components/Users/Users.Container'));

const App = (props) => {

    useEffect(() => {
        props.getIsInitialized()
    }, [])

    if (props.isInitialized) {
        return (
            <HashRouter>
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        <Switch>
                        <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                        <Route path='/dialogs' render={WithSuspense(DialogsContainer)}/>
                        <Route path='/users' render={WithSuspense(UsersContainer)}/>
                        <Route path='/music' component={Music}/>
                        <Route path='/video' component={Video}/>
                        <Route path='/news' component={News}/>
                        <Route path='/settings' component={Settings}/>
                        <Route path='/login' component={Login}/>
                        <Redirect from="/" to="/profile/8268" />
                        <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
                        </Switch>
                    </div>
                </div>
            </HashRouter>
        )
    } else {
        return <Loader/>
    }
}

const mapStateToProps = (state) => ({
    isInitialized: state.app.isInitialized
})

export default connect(mapStateToProps, {getIsInitialized})(App);