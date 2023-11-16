import './styles/register.css';
import { useState } from 'react';
import { set } from 'mongoose';
import { dblClick } from '@testing-library/user-event/dist/click';


function Register_box() {
    const [register_data,set_register_data] = useState({
        first_name: '',
        last_name: '',
        email: '',
        user_name: '',
        password1: '',
        password2: '',
        user_type: '',
        university_ID : '0'

    });

    const [pwd_valid, set_pwd_valid] = useState({
        match: false, 
        len : false,
        something_entered : false
    });

    const [submitted, setSubmitted] = useState(false);
    const [user_name_valid, setUsernamevalid] = useState(true);
    const [type_selected, Set_type_selected] = useState(false);
    const [succeeded,setSucceeded] = useState(true);
    const [errors, SetErrors] = useState('')


    //const [all_filled, setAllfilled] = useState[false];

  
  
  
    function handle_change(event) {
        // const [name, value] = event.target;

        const value = event.target.value;
        const name = event.target.name;
        

        set_register_data({
            ...register_data,
            [name]:value,
        });

        if (name == 'user_name' && value.length >=1){
            //send username to db , check availability , set false if not available
            const username_recieved = {data : value};

            fetch('http://localhost:5001/api/username_available', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(username_recieved),
                })
                .then((response) => {
                    if(response.ok){
                        return response.text();
                    }
                    else {
                        setUsernamevalid((prevUsernameValid) => (false));
                    }
                })
                .then((result) => {
                    if (result == 'available'){
                        setUsernamevalid((prevUsernameValid)=> (true));
                    }
                    else {
                        setUsernamevalid((prevUsernameValid)=> (false));
                    }
                })
                .catch((error) => {
                    setUsernamevalid((prevUsernameValid) => (false));
                })

            






        }

        if (name == 'password1' || name == 'password2'){
            if (value.length < 8){
                set_pwd_valid((prevPwd_valid) => ({...prevPwd_valid,['len']:false}));
            }
            else {
                set_pwd_valid((prevPwd_valid) => ({...prevPwd_valid,['len']:true}));
            }
            if (value.length >=1){
                set_pwd_valid((prevPwd_valid) => ({...prevPwd_valid,['something_entered']:true}));
            }
            else {
                set_pwd_valid((prevPwd_valid) => ({...prevPwd_valid,['something_entered']:false}));
            }
        }

    }

    function handleSelectChange(event){
        const val = event.target.value;
        set_register_data({
            ...register_data,
            ['user_type']:val,
        });
        if (val != ""){
            Set_type_selected((prevType_selected) => (true));
        }
        else {
            Set_type_selected((prevType_selected) => (false));
        }
    }
    
  
  
    function on_submit(event){
      event.preventDefault();

      if (register_data.password1 == register_data.password2){
        set_pwd_valid((prevPwd_valid) => ({...prevPwd_valid,['match']:true}));   

        const data = {
            username: register_data.user_name, 
            password: register_data.password1,
            email: register_data.email,
            first_name: register_data.first_name,
            last_name: register_data.last_name,
            user_type: register_data.user_type,
            university_ID : register_data.university_ID
        } 

        // where you send the form data to the database 
        fetch('http://localhost:5001/api/register', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then((response) => {
            if (response.ok) {
                console.log('Data saved successfully');
                const result =  response.text();
                //console.log();
                return result;
                // Handle success if needed
            } else {
                console.error('Error response');
                setSucceeded((prevSucceeded)=>(false))

                throw new Error('error response');

                // Handle error if needed
            }
            })
        .then ((result)=> {
            console.log('recieved:', result);
            setSucceeded((prevSucceeded)=>(true));
        }) 
        .catch((error) => {
            console.error('Error occurred :', error);
            setSucceeded((prevSucceeded)=>(false));
            //SetErrors(error);
            // Handle error if needed
        });
        


        // 
      }
      else {
        set_pwd_valid((prevPwd_valid) => ({...prevPwd_valid,['match']:false}));
    }
      set_register_data({
        first_name: '',
        last_name: '',
        email: '',
        user_name: '',
        password1: '',
        password2: '',
        user_type: '',
        university_ID: '01'
    });
    setSubmitted((prevSubmitted) => (true));

    
  
    }
    return (
      
    <form onSubmit={on_submit}>
        
        <div className='register_box'>
            <div className='header'>
                <h1> register</h1>
            </div>
            <div className='user_selection'> 
                <select value = {register_data.user_type} onChange = {handleSelectChange}>
                    <option value = "">select user type </option>
                    <option value = "student">student </option>
                    <option value = "instructor">instructor </option>
                    <option value = "vendor">vendor</option>
                    <option value = "admin">admin</option>
                    <option value = "validator">validator</option>
                </select>
            </div>
            
            <div className='input_fields'>
            <input type = 'text' disabled= {!type_selected} name = 'first_name' value = {register_data.first_name} onChange = {handle_change} placeholder= 'enter first name' /> 
            <input type = 'text' disabled= {!type_selected} name = 'last_name' value = {register_data.last_name} onChange = {handle_change} placeholder= 'enter last name' /> 
            <input type = 'text' disabled= {!type_selected} name = 'email'value = {register_data.email} onChange = {handle_change} placeholder= 'enter email' /> 
            <input type = 'text' disabled= {!type_selected} name = 'user_name' value = {register_data.user_name} onChange = {handle_change} placeholder= 'enter username' /> 
            <input type = 'text' disabled= {!type_selected} name = 'password1' value = {register_data.password1} onChange = {handle_change} placeholder= 'enter password1' /> 
            <input type = 'text' disabled= {!type_selected} name = 'password2'value = {register_data.password2} onChange = {handle_change} placeholder= 'enter password2' /> 
            </div>
            <button type = 'submit' disabled = {pwd_valid.len == false || user_name_valid == false}> register</button> 
            <div className='pwd_len_error'>
                {(pwd_valid.len == false && pwd_valid.something_entered == true )&&<p> password must be at least 8 character</p>}
            </div>
            <div className='pwd_match_error'>
                {(pwd_valid.match == false && submitted)&&<p> passwords do not match</p>}
            </div>
            <div className='username_invalid'>
                {(user_name_valid == false) && <p>username not available</p>}
            </div>
            <div className='output_msg'>
            {(succeeded == false) && <p>register not successful</p>}
            {(succeeded == true) && <p>register successful  </p>}


            </div>
        </div>

        
  
       
  
        
    </form>
  
      
  
  
    );
  }
  
  function Register (){
    
    
    return (
      <div >
        <h1> uni bubble </h1>
        <Register_box />
       
  
      </div> 
  
    );
  }


// const App = () => {
//   const [count, setCount] = useState(0);

//   const incrementCount = () => {
//     //setCount((prevCount) => prevCount + 1);
//     //setCount((prevCount) => prevCount + 1);
//     setCount(count+1);
//     setCount(count+1);
//     console.log(count); // This will show the previous value of count, not the updated one
//   };

//   return (
//     <div>
//       <p>Count: {count}</p>
//       <button onClick={incrementCount}>Increment</button>
//     </div>
//   );
// };

// export default App;

  
  
  
export default Register;
  