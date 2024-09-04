// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import './styles/styles.css' 
import React, { createContext, useContext, useEffect, useRef } from 'react'
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




function Map2(){

    const {source, setSource} = useContext(submittingContext)[0];
    const {destination, setDestination} = useContext(submittingContext)[1];
    const {userData, setUserData} = useContext(UserContext)
    const saveSrcRef = useRef(true);
    

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
                if (saveSrcRef.current) {
                    setSource({
                      lat: event.latLng.lat(),
                      lng: event.latLng.lng()
                    });
                    saveSrcRef.current = false;
                  } else {
                    setDestination({
                      lat: event.latLng.lat(),
                      lng: event.latLng.lng()
                    });
                  }
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

function Directions(props){

    const [directions,setDirections] = useState(null)
    const {source,setSource} = useContext(submittingContext)[0]
    const {destination,setDestination} = useContext(submittingContext)[1]
    const [directionsRenderer, setDirectionsRenderer] = useState(null);

    


    useEffect(() => {
        console.log('setting directions')
        const { google } = window;
        const directionsService = new google.maps.DirectionsService();

        directionsService.route(
            {
            origin: source,
            destination: destination,
            travelMode: 'DRIVING'
            },
            (response, status) => {
            if (status === 'OK') {
                console.log('status ok')
                setDirections(response);
            } else {
                console.error('Directions request failed due to ' + status);
            }
            }
        );
    },[])

    useEffect(() => {
        console.log('setting directions on map')

        const { google } = window;
        const mapInstance = new google.maps.Map(document.getElementById("map"), {
            center: {
              lat: source.lat,
              lng: source.long
            },
            zoom: 17
          });

        
        if (directions) {
            console.log('directions are there')

          //const { google } = window;
          const renderer = new google.maps.DirectionsRenderer();
          renderer.setMap(mapInstance);
          renderer.setDirections(directions);
          setDirectionsRenderer(renderer);
        }
      }, [directions]);

    return (
        <div>
            {/* {directions && <div>
                <h3>Directions:</h3>
                <p>{directions.routes[0].legs[0].start_address} to {directions.routes[0].legs[0].end_address}</p>
                <ul>
                    {directions.routes[0].legs[0].steps.map((step, index) => (
                    <li key={index}>{step.instructions}</li>
                    ))}
                </ul>
            </div>} */}
            <div id="map" style={{ height: "600px", width: "100%" }}></div>
        </div>

    ) 

}

const submittingContext = createContext()
function Map3 (props){
    const [source, setSource] = useState(null);
    const [destination,setDestination] = useState(null);

    const [submit,setSubmit] = useState(false)

    function handle_submit(){
        setSubmit((prev)=>(true))
    }

    useEffect(()=>{
        if(props.destination){
            const ans = {lat : props.destination.latitude, lng : props.destination.longitude}
            setDestination((prev)=> (ans))
        }
    },[])
    



    return (
        <div>
            <submittingContext.Provider value = {[{source,setSource}, {destination,setDestination}]}>
                {submit == false &&<Map2 />}
                {submit && <Directions />}
            </submittingContext.Provider>
            {source != null && <div>source : {source.lat} , {source.lng}</div>}
            {destination != null && <div>destination : {destination.lat} , {destination.lng}</div>}
            <div> 
                <button onClick={handle_submit} disabled = {source== null || destination == null}>submit</button>
            </div>
        </div>
    )
}

export default Map3;