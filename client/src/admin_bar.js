import { useContext, useEffect, useState } from 'react'
import './styles/styles.css'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import {UserContext} from './App.js'

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

function AdminBar(){
    const [isAdmin,SetIsAdmin] = useState(false);
    const {userData,setUserData} = useContext(UserContext);

    useEffect(()=> {
        const data = {username : userData};
        const ans = contact_db('get_user_type','text',data)
        ans.then((result)=> {
            if(result == 'admin'){
                SetIsAdmin((prev)=> (true))
            }
        })
        .catch((error)=> {
            SetIsAdmin((prev)=> (false))
            console.error(error);
        })
    },[userData])

    return(
        <div>
            {isAdmin && <div className='admin_bar'>
                <Link to = '/admin_college'>college</Link>
                <Link to = '/admin_instructor'>instructors</Link>
                <Link to = '/admin_location'>locations</Link>
            </div>}
        </div>
    )
}

export default AdminBar;