import { useContext, useState } from 'react'
import './styles/styles.css'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import {UserContext} from './App.js'

function LoggedNavbar(props){
    const {userData, SetUserData} = useContext(UserContext);

    return (
        <div className='navbar'>
            <div className='navbar_left'></div>
                <Link to='/home'>home</Link>
                <Link to='/blog'>blog</Link>
                <Link to='/search'>search</Link>
                <Link to='/map'>Map</Link>
            <div className='navbar_right'>
                <Link to='/logout'>log out</Link>
                <div className='profile_link'>
                    <Link to ={`/profile/${userData}`}>profile</Link>
                </div>

            </div>

        </div>
    )
}

function UnLoggedNavbar(){

    return (
        <div className='navbar'>
            <div className='navbar_left'></div>
               
            <div className='navbar_right'>
                <Link to='/login'>login </Link>
                <Link to='/register'> register</Link>
            </div>

        </div>
    )
}


function Navbar(){
    const {userData, setUserData} = useContext(UserContext); 
    const loggedIn = userData;


    return (
        <div>
        <div> user : {loggedIn}</div>
        <div>
            {loggedIn != '' && <LoggedNavbar username = {userData}/>}
            {loggedIn == '' && <UnLoggedNavbar/>}
            
        </div>
        </div>
        
       

    )
}

export default Navbar;