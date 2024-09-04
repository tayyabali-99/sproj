import './styles/home.css' 
import React from 'react'
import { useState , useContext} from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import {UserContext} from './App.js'
import { backend_addr } from './config.js';



function LoggedOutHome(){

    return (
        <div className='Home_page'>
            <h1>welcome to uni bubble</h1>
            <div className='options'>
                <div className='login_option'>
                    <Link to='/login'>login</Link>
                </div>
                <div className='register_option'>
                    <Link to='/register'>register</Link>
                </div>
            </div>
            
        </div>
    )
}

function LoggedInHome()
{
    return (
        <div> 
            <h1> this is the bubble</h1>
        </div>
    )
}

function Home(){
    const {userData, SetUserData} = useContext(UserContext);

    return (
        <div>
            {userData != '' && <LoggedInHome/>}
            {userData == '' && <LoggedOutHome />}
        </div>



    )
}

export default Home;