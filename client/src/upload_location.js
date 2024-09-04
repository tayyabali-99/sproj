import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import './styles/styles.css' 
import React, { createContext, useContext, useEffect } from 'react'
import { useState } from 'react'
import {UserContext} from './App.js'
// import { upload } from '@testing-library/user-event/dist/upload';
// import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import { Loader } from "@googlemaps/js-api-loader"
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


function Upload(){
    const {coordinates, setCoordinates} = useContext(submittingContext);
    const {userData, setUserData} = useContext(UserContext)

    const long = coordinates.long;
    const lat = coordinates.lat;
    const location_ID = userData;    // figure something else out later
    const [locationName,setLocationName] = useState('');
    const [done,setDone] = useState(false)

    function submit(){

        const req_data = {location_ID:location_ID, longitude: long , latitude:lat, location_name : locationName}
        const record_type = 'location' 
        const data = {entry: req_data, record_type:record_type}
        const ans = contact_db('upload_location','text',req_data)

        ans.then((result) => {
            setCoordinates((prev)=>(null))
        })
        .catch((error)=> {
            console.error(error);
        })



    }

    function input_change(event){
        const val = event.target.value;
        setLocationName((prev)=> (val));
    }

    return (
        <div className='upload_box'>
            <div> uploading location</div>
            <div>
                <input type = 'text'  value={locationName} onChange = {input_change}/>            
            </div>
            <div>
                <button onClick={submit}>upload</button>
            </div>
        </div>
    )
}


function Map3(){

    const {coordinates, setCoordinates} = useContext(submittingContext);
    const {userData, setUserData} = useContext(UserContext)
    

    useEffect(() => {
        const loader = new Loader({
        apiKey: "AIzaSyBGhWOLU3yzh2zpKx5o1nrqS5VZMZwpEQw",
        version: "weekly",
        });
    
        loader.load().then(async () => {
        const { google } = window;
        const { Map } = await google.maps.importLibrary("maps");
    
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
            position => {
                const map = new Map(document.getElementById("map"), {
                center: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                },
                zoom: 17
            });

            map.addListener("click", event => {
                setCoordinates({
                  lat: event.latLng.lat(),
                  long: event.latLng.lng()
                });
              });
            
            },
            error => {
                console.error(error);
            }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
        });
    }, []); 
    
    return <div id="map" style={{ height: "600px", width: "100%" }}></div>;
}

const submittingContext = createContext()
function Map2 (){
    const [coordinates, setCoordinates] = useState(null);


    return (
        <div>
            <submittingContext.Provider value = {{coordinates,setCoordinates}}>
                {coordinates == null &&<Map3 />}
                {coordinates != null && <Upload />}
            </submittingContext.Provider>
        </div>
    )
}

export default Map2