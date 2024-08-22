import './styles/profile.css' 
import React, { createContext, useContext, useEffect } from 'react'
import { useState } from 'react'
import {UserContext} from './App.js'
import { upload } from '@testing-library/user-event/dist/upload';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function contact_db(api_string, return_type, data){

    const ans =  new Promise((resolve, reject) => {
        const connection_string = 'http://localhost:5001/api/' + api_string;
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

function RegisterCollege(){
    const [collegeName,setCollegeName] = useState('')
    const [address,setAddress] = useState(null)
    const [city,setCity] = useState(null)
    const [country,setCountry] = useState(null)
    const [univId,setUnivId] = useState('')
    const [idAvailable,setIdAvailable] = useState(null)
    const [success,setSuccess]  = useState(null);
    const {userData,setUserData} = useContext(UserContext)
    const {collegeRegistered,setCollegeRegistered} = useContext(RegisterContext)



    function handle_change(event){
        const val = event.target.value; 
        const name = event.target.name;
        if(name == 'name'){
            setCollegeName((prev)=>(val));
        }
        else if (name == 'address'){
            setAddress((prev)=>(val));
        }
        else if (name == 'city'){
            setCity((prev)=>(val));
        }
        else if (name == 'country'){
            setCountry((prev)=>(val));
        }
        else if (name == 'id'){
            setUnivId((prev)=> (val))
            const data = {university_ID:val}
            const ans = contact_db('university_id_available','text',data)
            ans.then((result)=> {
                if (result == 'not available'){
                    setIdAvailable((prev)=>(false))
                }
                else if (result == 'available'){
                    setIdAvailable((prev)=>(true))
                }
            })
            .catch((error)=>(
                console.error(error)
            ))
        }
    }

    function handle_submit(){


        const univ_data = {university_ID : univId, university_name : collegeName, Admin_username : userData} 
        const address_data = {city: city, country: country, line1: address, address_ID: univId}

        const data1 = {entry:univ_data, record_type : 'university'}
        const data2 = {entry: address_data,record_type: 'address'}

        const ans = contact_db('create_entry','text',data1)
        ans.then((result)=> {
            const ans2 = contact_db('create_entry','text',data2)
            ans2.then((result)=> {
                const data3 = {username : userData, university_ID : univId};
                const ans3 = contact_db('edit_user_data','text',data3)
                ans3.then((result)=> {
                    setSuccess((prev)=> (true))
                    setCollegeRegistered((prev)=> (true))
                })
                .catch((error)=> {setSuccess((prev)=>(false))
                    console.error((error))
                })
                
            })
            .catch((error)=> {
                setSuccess((prev)=>(false))
                console.error(error)})
        })
        .catch((error)=>{
            setSuccess((prev)=>(false))
            console.error(error)})
    }


    return (
        <div>
            <h3>register your college</h3>
            <div className='register_college_box'>
                <div>id : <input type = 'text' value = {univId} name = 'id' onChange= {handle_change} /> </div>
                <div>name : <input type = 'text' value = {collegeName} name = 'name'  onChange= {handle_change} /></div>
                <div>city : <input type = 'text' value = {city} name = 'city'  onChange= {handle_change} /></div>
                <div>country : <input type = 'text' value = {country} name = 'country'  onChange= {handle_change} /></div>
                <div> address : <textarea rows = '6' cols = '40' value = {address} name = {'address'}  onChange= {handle_change}> </textarea></div>
                <div>
                    <button onClick={handle_submit} disabled = {(univId== '' || idAvailable == false || collegeName == '')}>submit</button>
                </div>
                {idAvailable == false && <div>id not available</div>}
                {(success!= null && success == false) && <div> register unsucccessful</div>}
                {(success) && <div> register succcessful</div>}


            </div>
        </div>
    )
}

function ShowCollege(){
    const [uniData,setUniData] = useState(null)
    const [addressData,setAddressData] = useState(null)
    const {userData,setUserData} = useContext(UserContext)

    useEffect(()=> {
        const data = {username : userData}
        const ans = contact_db('get_university_data','json',data)
        ans.then((result)=> {
            setUniData((prev)=> (result));
            const data2 = {address_ID : result.university_ID}
            const ans2 = contact_db('get_address_data','json',data2)
            ans2.then((result)=> {
                setAddressData((prev)=>(result))
            })
            .catch((error)=> {console.error(error)})
        })
        .catch((error)=> {console.error(error)})
    },[])

    return (
        <div>
            {uniData != null && <div className='uni_data'>
            <ul>
                {Object.keys(uniData).map((key, index) => (
                    (key != '_id' && key != '__v') && <li key={index}>{key}: {uniData[key]}</li>
                ))}
            </ul>
            </div>}
            {addressData && <div className='address_data'>
            <ul>
                {Object.keys(addressData).map((key, index) => (
                     (key != '_id' && key != '__v') && <li key={index}>{key}: {addressData[key]}</li>
                ))}
            </ul>
            </div>}

        </div>
    )
}

const RegisterContext = createContext()
function AdminCollege(){

    const [collegeRegistered,setCollegeRegistered] = useState(false)
    const {userData,setUserData} = useContext(UserContext)


    useEffect(()=>{
        const data = {username : userData}
        const ans = contact_db('get_university_data','json',data)
        ans.then((result)=> {
            if (result != null){
                setCollegeRegistered((prev)=> (true))
            }
        })
        .catch((error)=> {console.error(error)})
    },[userData])

    return(
        <div>
            <h2>Admin college page</h2>
            {collegeRegistered && <ShowCollege />}
            <RegisterContext.Provider value = {{collegeRegistered,setCollegeRegistered}}>
                {!collegeRegistered && <RegisterCollege/>}
            </RegisterContext.Provider>
        </div>
    )
}


export default AdminCollege;