import './styles/profile.css' 
import React, { createContext, useContext, useEffect } from 'react'
import { useState } from 'react'
import {UserContext} from './App.js'
import { upload } from '@testing-library/user-event/dist/upload';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Map2 from './upload_location.js'
import { backend_addr } from './config.js';


function contact_db(api_string, return_type, data){

    const ans =  new Promise((resolve, reject) => {
        const connection_string = backend_addr+ api_string;
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

function AddLocation(){

    return (
        <div>
            <h2>add locations</h2>
            <Map2 />
        </div>
    )
}

function RemoveLocation(){

    return (
        <div>
            <h2>remove locations</h2>
        </div>
    )
}



function AdminLocation(){

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
            <h2>Admin locations page</h2>
            <button onClick = {handle_add}>add location</button>
            <button onClick = {handle_remove}>remove location</button>

            {adding && <AddLocation/>}
            {removing && <RemoveLocation/>}
        </div>
    )
}
export default AdminLocation;