import './styles/profile.css' 
import React, { createContext, useContext, useEffect } from 'react'
import { useState } from 'react'
import {UserContext} from './App.js'
import { upload } from '@testing-library/user-event/dist/upload';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';



// returns a promise 
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

async function get_profile_data(username){
    return new Promise(async (resolve, reject) => {

        try {
            const api_str =  {'instructor' : 'get_instructor_data', 'vendor': 'get_vendor_data'};
            const data = {username:username};
            const user_type = await contact_db('get_user_type', 'text',data);
            const profile_data = await contact_db(api_str[user_type],'json',data);
            const office_hours_data = await contact_db('get_office_hours','json',data);

            profile_data.office_hours = office_hours_data;
            
            //return {user_type : user_type , profile_data : contact_db(api_str[user_type],'json',data)};
            resolve ( {user_type: user_type, profile_data : profile_data})
        }
        catch(error){
            reject(error);
        }
       
    })
}
    

//review functions 
// function PostReview(){

//     return (
//         <div>

//         </div>
//     );
// }
// function Reviews(){

// }

// //editing functions 
// function SetOfficeHours(){

// }

// function SetLocation(){

// }



//viewing functions 
function IndividualInfo(props){
    const item_data = props.item_data;
    const key = props.key_data;
    return(
        <div className='individual_info'>
            {key}  :   {item_data}
        </div>
    )
}
function ShowVendorProfile(props){
    const profile_data = props.profile_data; 
    const [open , SetOpen] = useState('')

    // useEffect(() => {

    // }, [])

    // function is_open()

    function handle_see_reviews(){

    }

    return (
        <div className= 'instructor_profile'>
            <div>review : <Link to='/review'> see reviews</Link></div>
            <div>location : </div>
            <div>open : {open}</div>
            <div>timings : </div>
            <div className='office_hours'>
                {profile_data.office_hours.map((obj)=> (
                    <ShowOfficeHours data = {obj}/>
                ))}
            </div>
        </div>
    )
    
}

function ShowOfficeHours(props){
    const data = props.data 
    return (
        <div>
            {data.day} : {data.start_time} --- {data.end_time}
        </div>
    )
}
function AddOfficeHours(props){
    const days = ['Monday', 'Tuesday', 'wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const [startTime ,SetStartTime] = useState('');
    const [endTime, SetEndTime] = useState('');
    const [day, SetDay] = useState(days[0]);
    const {officeHoursAdd,SetOfficeHoursAdd} = props.oha_state;
    

    function start_change(event){
        SetStartTime((prevStartTime) => (event.target.value));
    }
    function end_change(event){
        SetEndTime((prevEndTime) => (event.target.value));
    }
    function handleSelectChange(event){
        SetDay((prev)=> (event.target.value));
    }
    function add(){

        const req_data = {user_type: props.userType, user_ID : props.username, start_time: startTime, end_time:  endTime, day : day };
        const data = {entry : req_data, record_type : 'office_hours'};

        const ans = contact_db('create_entry', 'text', data);
        ans.then((result) => {
            SetOfficeHoursAdd((prev)=> (false));
        }) 
        .catch((error) => {
            SetOfficeHoursAdd((prev)=> (false));
        })
    }

    return (
        <div className='popup'>
            <div className='popup_content'>
                <div className='start_time'> start :  <input type = 'text'  value = {startTime}  onChange = {start_change}/></div>
                <div className='end_time'>end :  <input type = 'text'  value = {endTime}  onChange = {end_change}/></div>

                <div className='day'>
                    <label> day :  </label>
                    <select value={day} onChange={handleSelectChange}>
                        {days.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <button onClick={add}>done</button>

            </div>
        </div>
    )
}
function ShowInstructorProfile(props){

    const profile_data = props.profile_data; 


    return (
        <div className= 'vendor_profile'>
            <div>school : {profile_data.department.school}</div>
            <div>department : {profile_data.department.department_name}</div>
            <div>designation : {profile_data.instructor.designation}</div>
            <div>location : </div>
            <div>availability : {profile_data.instructor.availability}</div>
            office hours : 
            <div className='office_hours'>
                {profile_data.office_hours.map((obj)=> (
                    <ShowOfficeHours data = {obj}/>
                ))}
            </div>
        </div>
    )

}


function GeneralInfo(props){

    const profile_data = props.profile_data;
    const user_type = props.user_type;

    // return (
    //     <div className='general_info'>
    //         {
    //             Object.keys(profile_data).map((key) => (
    //                 Object.keys(profile_data[key]).map((key1) => (
    //                     <IndividualInfo item_data = {profile_data[key][key1]}  key_data = {key1}/>
    //                 ))

    //             ))
    //         }
    //     </div>
    // )

    return (
        <div className='general_profile_data'>
            {user_type == 'instructor' && <ShowInstructorProfile profile_data = {profile_data}/>}
            {user_type == 'vendor' && <ShowVendorProfile profile_data = {profile_data}/>}
            {/* {user_type == 'location' && <ShowLocationProfile profile_data = {profile_data}/>} */}

        </div>
    )
}

function ProfileHeader(props){

    const {editing, SetEditing} = useContext(editingContext);

    function HandleEdit(){
        SetEditing((prevEditing) => (true));
    }

    const ph_data = props.profile_header_data; 
    const name_str = props.user_type + "_name";

    return (
        <div className='profile_header'>
            <div className='pf_container'>
                <div className='profile_pic'>

                </div>
                {name_str != "_name" && 
                    <div className='ph_info'>
                        {/* {ph_data.instructor_name} */}
                        <div>{ph_data[props.user_type][name_str]}</div>
                        <div>@{ph_data[props.user_type].username}</div>
                    </div>
                }
                
                <button onClick = {HandleEdit}>edit</button>
            </div>
        </div>
    )
}

function EditVendorProfile(props){

    const text_fields = ['name', 'type'] 
    // const set_fields = ['office_hours', 'location'] 

    const [inputValues, SetInputValues] = useState({name:'',department:'',designation:''});
    const [popUp, setPopUP] = useState(false);
    const [popUpContent, setPopUpContent] = useState('');
    const [officeHoursAdd,SetOfficeHoursAdd] = useState(false)
    const username = props.username;


    function reset_timings(){
        const ans = contact_db('delete_office_hours','text',{username: username});
        ans.then((result)=> {
            setPopUP((prevPopUP) => (true));
            if (result == 'success') {
                setPopUpContent((prevPopUpContent) => ('timings have been reset'));
            }
            else {
                setPopUpContent((prevPopUpContent) => ('error while resetting timings'));
            }
        })
    }
    function upload_location(){

    }
    function add_timings(){
        SetOfficeHoursAdd((prev)=> (true));
    } 
    function handle_cancel(){
        props.stop_editing();
    }
    function handle_done(){
        const data = {vendor_name: inputValues.name};
        const final_data = {};
        if(data.vendor_name != ''){final_data.vendor_name = data.vendor_name;}
        //if(data.department_ID != ''){final_data.department_ID = data.department_ID;}

        const ans =  contact_db('update_vendor','text',{data: final_data, username: username});
        ans.then((result) => {
            props.stop_editing();
        })
        .catch((error) => {
            props.stop_editing();
        })
    }
    function input_change(event){
        const val = event.target.value;
        const field = event.target.name; 

        SetInputValues({
            ...inputValues,
            [field]:val,
        });
    }
    function close_popup(){
        setPopUP((prevPopUP)=> (false));
    }


    return (
        <div className='edit_instructor'>
            {text_fields.map((field)=> (
                <div>
                     {field} : <input type = 'text'  name = {field} value = {inputValues[field]} onChange = {input_change}/>
                </div>

            ))}
            <div>add timings : <button onClick = {add_timings} >add</button></div>
            <div>reset timings : <button onClick = {reset_timings} >reset</button></div>
            <div>upload location : <button onClick={upload_location}>upload</button></div>  

            <div className='end_buttons'>
                <button onClick= {handle_cancel} >cancel</button>
                <button onClick={handle_done}>done</button>
            </div>

            {popUp && <div className='popup'>
                <div className='popup_content'>
                    <div className='content'>
                        {popUpContent}
                    </div>
                    <button onClick={close_popup}>ok</button>
                </div>

            </div>}
            {officeHoursAdd && <AddOfficeHours username= {username} userType = 'vendor' oha_state = {{officeHoursAdd,SetOfficeHoursAdd}}/>}


        </div>
    )
}

function EditInstructorProfile(props){

    const text_fields = ['name', 'department', 'designation'] 
    const username = props.username;
    // const bool_fields =  ['availability', 'auto check']
    // const set_fields = ['office_hours', 'location'] 
    const [popUp, setPopUP] = useState(false);
    const [popUpContent, setPopUpContent] = useState('');
    const [officeHoursAdd,SetOfficeHoursAdd] = useState(false)
    const [available, SetAvailable] = useState('');
    const [auto,SetAuto] = useState('');

    const [inputValues, SetInputValues] = useState({name:'',department:'',designation:''});


    function reset_office_hours(){
        const ans = contact_db('delete_office_hours','text',{username: username});
        ans.then((result)=> {
            setPopUP((prevPopUP) => (true));
            if (result == 'success') {
                setPopUpContent((prevPopUpContent) => ('office hours have been reset'));
            }
            else {
                setPopUpContent((prevPopUpContent) => ('error while resetting office hours'));
            }
        })
       
        

    }
    async function add_office_hours(){

        SetOfficeHoursAdd((prev)=> (true));
    }
    function upload_location(){


    }
    function set_available(){
        SetAvailable((prev) => (true));
        const ans = contact_db('update_instructor','text',{data :{availability:'available'}, username:username});
        ans.then((result)=> {
        })
        .catch((error)=>{
        })


    }
    function set_busy(){
        SetAvailable((prev)=> (false));
        const ans =  contact_db('update_instructor','text',{data :{availability:'busy'}, username:username});
        ans.then((result)=> {
        })
        .catch((error)=>{
        })
    }
    function set_auto(){
        SetAuto((prev)=>(true));
        const ans =  contact_db('update_instructor','text',{data :{auto_check:true}, username:username});
        ans.then((result)=> {
        })
        .catch((error)=>{
        })

    }
    function set_manual(){
        SetAuto((prev)=>(false));
        const ans =  contact_db('update_instructor','text',{data :{auto_check:false}, username:username});
        ans.then((result)=> {
        })
        .catch((error)=>{
        })
    }
    function handle_cancel(){
        props.stop_editing();
    }
    function handle_done(){
        const data = {instructor_name: inputValues.name,department_ID : inputValues.department, designation:inputValues.designation};
        const final_data = {};
        if(data.instructor_name != ''){final_data.instructor_name = data.instructor_name;}
        if(data.department_ID != ''){final_data.department_ID = data.department_ID;}
        if(data.designation != ''){final_data.designation = data.designation;}

        const ans =  contact_db('update_instructor','text',{data: final_data, username: username});
        ans.then((result) => {
            props.stop_editing();
        })
        .catch((error) => {
            props.stop_editing();
        })
    }
    function input_change(event){
        const val = event.target.value;
        const field = event.target.name; 

        SetInputValues({
            ...inputValues,
            [field]:val,
        });
    }
    function close_popup(){
        setPopUP((prevPopUP)=> (false));
    }


    return (
        <div className='edit_instructor'>
            {text_fields.map((field)=> (
                <div>
                     {field} : <input type = 'text'  name = {field} value = {inputValues[field]} onChange = {input_change}/>
                </div>

            ))}
            <div>add office hours : <button onClick = {add_office_hours} >add</button></div>
            <div>reset office hours : <button onClick = {reset_office_hours} >reset</button></div>
            <div>upload location : <button onClick={upload_location}>upload</button></div>
            <div>
                set availability : 
                <button onClick={set_available}>available</button>
                <button onClick={set_busy}>busy</button>
            </div>

            <div>
                set auto check : 
                <button onClick={set_auto}>yes</button>
                <button onClick={set_manual}>no</button>
            </div>

            <div className='end_buttons'>
                <button onClick= {handle_cancel} >cancel</button>
                <button onClick={handle_done}>done</button>
            </div>

            {popUp && <div className='popup'>
                <div className='popup_content'>
                    <div className='content'>
                        {popUpContent}
                    </div>
                    <button onClick={close_popup}>ok</button>
                </div>

            </div>}
            {officeHoursAdd && <AddOfficeHours username= {username} userType = 'instructor' oha_state = {{officeHoursAdd,SetOfficeHoursAdd}}/>}



        </div>
    )
}

function EditBox(props){

    const user_type = props.user_type;
    const username = props.username;
    const {editing, SetEditing} = useContext(editingContext);

    function stop_editing(){
        SetEditing((prevEditing) => (false));
    }


    return (

        <div className='edit_box'>
            {user_type == 'instructor' && <EditInstructorProfile stop_editing = {stop_editing} username = {username}/>}
            {user_type == 'vendor' && <EditVendorProfile  stop_editing = {stop_editing} username = {username}/>}
        </div>
    )
}

const editingContext = createContext();
function Profile (){

    //const {userData,SetUserData} = useContext(UserContext);
    //const username = props.username;
    //const username = 'ehsan_manzoor';

    const [username,SetUsername] = useState('vendor_9');
    const [editAccess, SetEditAccess] = useState(false); 
    const [editing,SetEditing] = useState(false); 
    const [profileData, SetProfileData] = useState('');     
    const [userType, SetUserType] = useState('');
    const [errorDisplay, SetErrorDisplay] = useState('');

    // function get_profile(){
    //     if (userType == ''){
    //         const pr_data =  get_profile_data(username);
    //         pr_data.then((result) => {
    //             SetUserType((prevUserType) => (result.user_type));
    //             SetProfileData((prevProfileData) => (result.profile_data));
    //         })
    //         .catch((error)=> {
    //             SetErrorDisplay((prevErrorDisplay) => ('error getting data'));
    //         })
    //     }
       

    // }

    

    useEffect(() => {
        const pr_data =  get_profile_data(username);
        pr_data.then((result) => {
            SetUserType((prevUserType) => (result.user_type));
            SetProfileData((prevProfileData) => (result.profile_data));
        })
        .catch((error)=> {
            SetErrorDisplay((prevErrorDisplay) => ('error getting data'));
        })
    }, [username]);
    
    



   



    return (
        <div className='profile'>
           <h1>profile page</h1>
            <editingContext.Provider value = {{editing,SetEditing}}>
                <ProfileHeader profile_header_data = {profileData} user_type = {userType}/>
                {editing == false && <GeneralInfo profile_data = {profileData} user_type = {userType}/>}
                {editing == true && <EditBox user_type = {userType} username = {username}/>}
            </editingContext.Provider>

            

        </div>
    )
}




















export default Profile ;