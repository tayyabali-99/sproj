//import logo from './logo.svg';
import './styles/login.css';
import { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import {UserContext} from './App.js'
import { backend_addr } from './config.js';






function SigningIn(props) {
  const {userData, SetUserData} = useContext(UserContext);

  function handleClick(){
    //setUserData((prev) => ({username: props.username, loggedIn : true}));
    SetUserData((prevUserData) => (props.username));

  }

  return (
    <div className='ok_to_home'>
      <button onClick={handleClick}>
        <Link to="/home">continue</Link>
      </button>
    </div>
  )
}


function Input_box() {

  const serverURL = 'https://localhost:5001';

  const [username,SetUsername] = useState('');
  const [password,SetPassword] = useState('');
  const [successful, SetSuccessful] = useState('');
  const [approvedUser, SetApprovedUser] = useState('');



  function handleUserNameChange(event) {
    SetUsername(event.target.value);
  }
  function handlePasswordChange(event) {
    SetPassword(event.target.value);
  }

  // useEffect(() => {
  //   // Fetch data from the server when the component mounts
  //   fetch('')
  //     .then((response) => response.json())
  //     .then((data) => setData(data))
  //     .catch((error) => console.error('Error fetching data:', error));
  // }, []);

  function on_submit(event){
    event.preventDefault();

    // logic 

    const data = {username: username, password:password};

    fetch(backend_addr+'sign_in', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      })
      .then((response) => {
          if(response.ok){
              return response.text();
          }
          else {
              SetSuccessful((prevSuccessful) => ('false'));
          }
      })
      .then((result) => {
          if (result == 'successful'){
              SetSuccessful((prevSuccessful)=> ('true'));
              SetApprovedUser((prev) => username);
          }
          else {
              SetSuccessful((prevSuccessful)=> ('false'));
          }
      })
      .catch((error) => {
          SetSuccessful((prevSuccessful) => ('false'));
      })








    SetUsername('');
    SetPassword('');

  }
  
  
  return (
    
    <form onSubmit={on_submit}>
      
      <div className='sign_in_box'>
        <div className='header'>
          <h1> sign in</h1>
        </div>
        <div className='username_box'>
          <input type = 'text' value = {username} onChange = {handleUserNameChange} placeholder= 'enter username' /> 

        </div>
        <div className='password_box'>
        <input type = 'text' value = {password} onChange = {handlePasswordChange} placeholder= 'enter password' /> 
        </div>
        <div className='sign_in_output'> 
          {successful == 'false' && <p> sign in not successful</p>}
          {successful == 'true' && <p> sign in successful</p>}
          {successful == 'true' && <SigningIn username = {approvedUser}/>}




        </div>
        <button type = 'submit'>Sign in</button>
      </div>
      

     

      
    </form>

    


  );
}

function Login (){
  
  return (
    <div >
      <h1> uni bubble </h1>
      <Input_box />
     

    </div> 

  );
}

export function LogOut(){
  const {userData, SetUserData} = useContext(UserContext);

  function handleYes(){
    SetUserData((prev) => (''));

  }

  return (
    <div className='logout_box'>
      <div className='logout_confirmation'>
        are you sure you want to logout
      </div>
      <div>
        <button onClick={handleYes}>
          <Link to= '/home'>continue</Link>
        </button>
        <button >
          <Link to= '/home'>cancel</Link>
        </button>
      </div>
    </div>
  )
}


export default Login;
