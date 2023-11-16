


// where you send the form data to the database 

//const data = {record_type : 'instructor',  entry : {username : 'ehsan_manzoor', department_ID: '1', designation : '1', location_ID : '1', availability : '1', auto_check : '1', instructor_name : 'ehsan manzoor' }};
//const data = {username : 'user_9', department_ID: '1', designation : '1', location_ID : '1', availability : '1', auto_check : '1', instructor_name : 'tayyab saqib' };
//const data = {vendor_ID : '01'}
//const  data = { username : 'tabby99', search_type: 'instructor', search_string : 'saqib', is_advanced : false, };
//const data = {username : 'vendor_10', vendor_name: 'bubulgak ramen', university_ID : '1',location_ID : '1',vendor_ID : '1'  };
//const  data = { username : 'tabby99', search_type: 'vendor', search_string : 'ramen', is_advanced : false, };




// api_string = 'register';
const data = {username: 'tabby99'}


// const ans =  new Promise((resolve, reject) => {
//     const connection_string = 'http://localhost:5001/api/' + api_string;
//     fetch(connection_string, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data)
//         })
//         .then((response) => {
//             if (response.ok) {
//             const result =  response.text();
//             return result;

//             } else {
//                 throw new Error('error encountered') 
//             }
//         })
//         .then ((result)=> {
//             resolve(result);
//         }) 
//         .catch((error) => {
//             reject('error encountered');
//     })
// });

// ans.then((result) => {
//     console.log(result)
// })
// .catch((error) => {
//     console.log('error occurred');
// });

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

function get_profile_data(username){

    const api_str =  {'instructor' : 'get_instructor_data', 'vendor': 'get_vendor_data'};
    const data = {username:username}
    let  user_type = 'pre'; 
    const ans = contact_db('get_user_type', 'text',data);
    ans.then((result) => {
        user_type = result;

    })
    .catch((error) => {
        console.log('error');
        return 'error occurred';
    })
    //return {user_type : user_type , profile_data : contact_db(api_str[user_type],'json',data)};
    return {user_type: user_type, profileData : {}}
}

    //return {user_type : user_type , profile_data : contact_db(api_str[user_type],'json',data)};
    //return {user_type: user_type, profileData : {}}


    const pr_data =  get_profile_data('ehsan1');
    pr_data.then((result) => {
        //SetUserType((prevUserType) => (result));
        console.log(result);
    })
    .catch((error) => {
        console.log('error');
    })
