import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import './styles/styles.css' 
import React, { createContext, useContext, useEffect } from 'react'
import { useState } from 'react'
import {UserContext} from './App.js'
import { upload } from '@testing-library/user-event/dist/upload';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Loader } from "@googlemaps/js-api-loader"


function Map1(){

    const [currentLocation,setCurrentLocation] = useState(null);
    const mapStyles = {
        height: "80%",
        width: "100%"
    };

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

export default Map1;