import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import './styles/styles.css' 
import React, { createContext, useContext, useEffect } from 'react'
import { useState } from 'react'
import {UserContext} from './App.js'
import { upload } from '@testing-library/user-event/dist/upload';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Loader } from "@googlemaps/js-api-loader"
import Map3 from './get_directions.js';

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
function ShowLocation(){

    const [location1,setLocation1] = useState(null);
    const [getDirections,setGetDirections] = useState(false)
    const {location_to_show} = useParams();

    const mapStyles = {
        height: "80%",
        width: "100%"
    };
    useEffect(()=>{
        const data = {location_ID : location_to_show}
        const ans = contact_db('get_location','json',data);
        ans.then((result)=>{
            setLocation1((prev)=>(result));
        })
        .catch((error)=>{console.log(error)})

    },[location_to_show])


    useEffect(() => {
        if (location1 != null)
        {console.log(location1)}
        const loader = new Loader({
        apiKey: "AIzaSyBGhWOLU3yzh2zpKx5o1nrqS5VZMZwpEQw",
        version: "weekly",
        });
    
        loader.load().then(async () => {
        const { google } = window;
        const { Map } = await google.maps.importLibrary("maps");
        if (location1 != null){
            const map = new Map(document.getElementById("map"), {
                center: {
                    lat: location1.latitude,
                    lng: location1.longitude
                },
                zoom: 17
                });
        }
        
        
        });
    }, [location1,getDirections]); 

    function handle_get_directions(){
        setGetDirections((prev)=> (true))
    }
    function handle_done(){
        setGetDirections((prev)=> (false))
    }
    
    return (
        <div>
            <h3>showing location</h3>
            {!getDirections && <div id="map" style={{ height: "600px", width: "100%" }}></div>}
            {!getDirections &&<div><button onClick={handle_get_directions}>get directions to this location</button></div>}
            {getDirections && <Map3 destination = {location1}/>}
            {getDirections &&<div><button onClick={handle_done}>go back</button></div>}


        </div>
    )
}

export default ShowLocation;