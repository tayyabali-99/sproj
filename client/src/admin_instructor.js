import './styles/styles.css' 
import React, { createContext, useContext, useEffect } from 'react'
import { useState } from 'react'
import {UserContext} from './App.js'
import { upload } from '@testing-library/user-event/dist/upload';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useParams } from 'react-router-dom';
//import { set } from 'mongoose';
import { backend_addr } from './config.js';




function contact_db(api_string, return_type, data){

    const ans =  new Promise((resolve, reject) => {
        const connection_string = backend_addr + api_string;
        fetch(connection_string, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
            })
            .then((response) => {
                if (response.ok) {
                    if (return_type == 'json'){
                        const result =  response.json();
                        return result;
                    }
                    else if (return_type == 'text'){
                        const result =  response.text();
                        return result;
                    }
                    else {throw new Error('invalid return type') }

                } else {
                    throw new Error('error encountered') 
                }
            })
            .then ((result)=> {
                resolve(result);
            }) 
            .catch((error) => {
                reject(error);
        })
    });

    return ans;
}

function AddInstructor(){
    const [instructorList,setInstructorList] = useState(null)
    const [universityId, setUniversityId] = useState(null)
    const {userData,setUserData} = useContext(UserContext)

    useEffect(()=>{

        
        const data = {username: userData}
        const ans = contact_db('get_university_data','json',data)
        ans.then((result)=>{
            setUniversityId((prev)=>(result.university_ID))
        })
        .catch((error)=>{
            console.error(error);
        })
    },[])

    useEffect(()=>{
        const data = {verified_status:false, university_ID : universityId}
        const ans = contact_db('get_instructor_list','json',data)
        ans.then((result)=>{
            setInstructorList((prev)=>(result));
        })
        .catch((error)=>{
            console.error(error);
        })
    },[universityId])

    function handle_verify(event){
        if (universityId != null){
            const username = event.target.value; 
            const data1 = {username : username, verified: true}
            const ans = contact_db('edit_instructor_data','text',data1)

            ans.then((result)=> {
                console.log('instructor verified')
            })
            .catch((error)=> {
                console.error(error);
            })
        }
        
    }

    return (
        <div>
            <h4>unverified instructors</h4>
            <div className='instructor_list'>
                {instructorList && <ul>
                    {instructorList.map((element)=> (
                        <li>{element.instructor_name} <button value = {element.username}  onClick={handle_verify}>verify</button></li>
                    ))}
                </ul>}

            </div>
        </div>
    )
}
function RemoveInstructor(){
    const [instructorList,setInstructorList] = useState(null)
    const [universityId, setUniversityId] = useState(null)
    const {userData,setUserData} = useContext(UserContext)

    useEffect(()=>{

        
        const data = {username: userData}
        const ans = contact_db('get_university_data','json',data)
        ans.then((result)=>{
            setUniversityId((prev)=>(result.university_ID))
        })
        .catch((error)=>{
            console.error(error);
        })
    },[])
    


    useEffect(()=>{
        if (universityId != null){
            const data = {verified_status:true, university_ID : universityId}
            const ans = contact_db('get_instructor_list','json',data)
            ans.then((result)=>{
                setInstructorList((prev)=>(result));
            })
            .catch((error)=>{
                console.error(error);
            })
        }
        
    },[universityId])

    function handle_delete(event){
        const username = event.target.value; 
        const data1 = {username : username, verified: false}
        const ans = contact_db('edit_instructor_data','text',data1)

        ans.then((result)=> {
            console.log('instructor deleted')
        })
        .catch((error)=> {
            console.error(error);
        })
    }

    return(
        <div>
            <h4>verified instructors</h4>
            <div className='instructor_list'>
                {instructorList && <ul>
                    {instructorList.map((element)=> (
                        <li>{element.instructor_name} <button value = {element.username} onClick={handle_delete}>delete</button></li>
                    ))}
                </ul>}

            </div>
        </div>
    )
}

function AdminInstructor(){

    const [adding,setAdding] = useState(false)
    const [removing,setRemoving] = useState(false)

    function handle_add(){
        setAdding((prev)=> (true))
        setRemoving((prev)=>(false))

    }
    function handle_remove(){
        setAdding((prev)=> (false))
        setRemoving((prev)=>(true))

    }

    

    return(
        <div>
            <h2>Admin instructors page</h2>
            <button onClick = {handle_add}>add instructors</button>
            <button onClick = {handle_remove}>remove instructors</button>

            {adding && <AddInstructor/>}
            {removing && <RemoveInstructor/>}
        </div>
    )
}

export default AdminInstructor;