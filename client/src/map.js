import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import './styles/styles.css' 
import React, { createContext, useContext, useEffect } from 'react'
import { useState } from 'react'
import {UserContext} from './App.js'
// import { upload } from '@testing-library/user-event/dist/upload';
// import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
// import { Loader } from "@googlemaps/js-api-loader"
import Map1 from './current_location.js'
import Map2 from './upload_location.js'
import Map3 from './get_directions.js'
// import { get } from 'mongoose';
import { backend_addr } from './config.js';





function Map(){

    const {userData,setUserData} = useContext(UserContext);
    const [uploading,setUploading] = useState(false);
    const [getDirections,setGetDirections] = useState(false);

    function handle_upload(){
        setUploading((prev) => (true));
    }
    function handle_done(){
        setUploading((prev) => (false));
        setGetDirections((prev) => (false));

    }
    function handle_direction_request(){
        setGetDirections((prev)=> (true))
    }

    return (
        <div>
            <h2>Map</h2>
            <div className='upload_location_button'>
                <button onClick={handle_upload}>upload location</button>
            </div>
            <div className='get_directions_button'>
                <button onClick={handle_direction_request}>get directions</button>
            </div>
            {!uploading && !getDirections&&<Map1 />}
            {uploading && <Map2 />}
            {getDirections && <Map3 />}
            {(uploading || getDirections) && <button onClick={handle_done}>cancel</button>}

        </div>
    )
}
export default Map 