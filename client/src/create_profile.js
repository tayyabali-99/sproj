// import './styles/create_profile.css' 
// import React from 'react'
// import { useState } from 'react'


// function Create_student_profile (){

//     return (
//         <form>
//             <div className='student_form'>
//                 <h5>student profile</h5> 
//                 <div className='input_fields'>
//                     <input type = 'text' name = '' value = {} onChange = {} placeholder= 'enter first name' ></input> 
//                 </div>
//             </div>

//         </form>
//     ); 
// }

// function Create_instr_profile() {

//     return(
//         <form>
//             <div className='instr_form'>
//                 <h5>instructor profile</h5>
//             </div>
//         </form>
//     );
// }
// function Create_vendor_profile() {


//     return(
//         <form>
//             <div className='vendor_form'>
//                 <h5>vendor profile</h5>
//             </div>
//         </form>
//     );

// }

// function Create_profile() {

//     const [user_type, Set_user_type] = useState('none');
//     const [type_selected, Set_type_selected] = useState(false);

//     function handleSelectChange(event){
//         const val = event.target.value;
//         Set_user_type((prevUser_type)=>(val));
//         if (val != ""){
//             Set_type_selected((prevType_selected) => (true));
//         }
//     }

//     return(
//         <div className='profile_prompt'>
            
//             <div classname = 'profile_prompt_header'>
//                 <h3>Create Profile</h3>
//             </div>
           
//             <form>
//                 <div className='profile form'>
//                     {user_type == 'student' && <Create_student_profile/>}
//                     {user_type == 'instructor' && <Create_instr_profile/>}
//                     {user_type == 'vendor' && <Create_vendor_profile/>}

//                     {/* {user_type == 'admin' && </>}
//                     {user_type == 'validator' && </>} */} 

//                 </div>
//             </form>
//         </div >



//     );
// }

// export default Create_profile;