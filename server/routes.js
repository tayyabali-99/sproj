const express = require('express');
const router = express.Router();
const {
    UserModel,BlogModel, 
    SearchBasic, SearchInstructor, 
    SearchVendor, SearchLocation, 
    InstructorModel, DepartmentModel, 
    UniversityModel,AddressModel, 
    VendorModel, ReviewModel, 
    LocationModel, OfficeHoursModel 
} = require('./datamodels.js');





router.post('/register', (req, res) => {
    // Handle POST request to create a new user
    console.log('we made it here');
    const newUser = req.body;
    console.log(newUser);

    const type_dict = {
        "instructor" : InstructorModel,
        "vendor" : VendorModel//,
        //'admin' : AdminModel,
        //'validator' : ValidatorModel
      };
    
      const data_dic = {
        "instructor" : {username : newUser.username, instructor_name : newUser.first_name + " " + newUser.last_name},
        "vendor" : {username : newUser.username, vendor_name : newUser.first_name + " " + newUser.last_name},//,
        //'admin' : AdminModel,
        //'validator' : ValidatorModel
      }

    
    
   
    
    UserModel.create(newUser)
    .then(result => {
        // Handle result
        if (newUser.user_type in data_dic){
            TheModel = type_dict[newUser.user_type];
            TheModel.create(data_dic[newUser.user_type])
            .then(result => {
                res.status(201).send('we did good');
                console.log('user registered successfully');
            }) 
            .catch(error => {
                console.log(error)
                console.log('secondary record could not be created (error)')
                res.status(500).send( 'Error registering');
    
            })
        }
        else {
            res.status(201).send('we did good');
            console.log('user registered successfully');
        }
       

    })
    .catch(err => {
        // Handle error
        console.log('Error registering:');
        res.status(500).send( 'Error registering');
    });
    
  });

router.post('/username_available', async  (req, res) => {
    // Handle POST request to create a new user
    console.log('checking username');
    const username_recieved = req.body.data;
    console.log(username_recieved);

    try {
        const userExists = await UserModel.findOne({username: username_recieved});

        if (userExists){
            res.status(201).send('not available');
        }
        else {
            res.status(201).send('available'); 
        }

    }
    catch(error){
        res.status(500);
        console.log('error while checking if username exists');
    } 


    
    
  });  

router.post('/get_university_data', async  (req, res) => {
    // Handle POST request to create a new user
    console.log('getting university data');
    const username_recieved = req.body.username;
    console.log(username_recieved);

    try {
        const university = await UniversityModel.findOne({Admin_username: username_recieved});
        res.status(201).send(university);
        console.log(university)


    }
    catch(error){
        res.status(500);
        console.log('error while getting uni data');
        console.log(error);

    } 


    
    
  });  
  router.post('/get_address_data', async  (req, res) => {
    // Handle POST request to create a new user
    console.log('getting address data');
    const address_ID = req.body.address_ID;
    console.log(address_ID);

    try {
        const address = await AddressModel.findOne({address_ID: address_ID});
        res.status(201).send(address);
        console.log(address)


    }
    catch(error){
        res.status(500);
        console.log('error while getting address data');
        console.log(error);

    } 


    
    
  });  
router.post('/university_id_available', async  (req, res) => {
    console.log('checking university id');
    const username_recieved = req.body.university_ID;
    console.log(username_recieved);

    try {
        const userExists = await UniversityModel.findOne({university_ID: username_recieved});

        if (userExists){
            res.status(201).send('not available');
            console.log('id not available')
        }
        else {
            res.status(201).send('available'); 
            console.log('id  available')

        }

    }
    catch(error){
        res.status(500);
        console.log('error while checking if university id exists');
    } 


    
    
  });
  // Add other API routes for User data...

  router.post('/get_user_type', async  (req, res) => {
    // Handle POST request to get a  user type
    console.log('checking usertype of  username');
    const username_recieved = req.body.username;
    console.log(username_recieved);

    try {
        const user = await UserModel.findOne({username: username_recieved});

        if (user){
            console.log('user type : ', user.user_type);
            res.status(201).send(user.user_type);
        }
        else {
            console.log('username did not exist in database')
            res.status(500).send('does not exist'); 
        }

    }
    catch(error){
        res.status(500);
        console.log('error while checking user type of the username ');
    } 
});
  router.post('/sign_in', async  (req, res) => {
    // Handle POST request to create a new user
    console.log('checking login');
    const username_recieved = req.body.username;
    const password_recieved = req.body.password;
    console.log(username_recieved,password_recieved);




    try {
        const userExists = await UserModel.findOne({username: username_recieved, password: password_recieved});

        if (userExists){
            console.log('successfully logging in');
            res.status(201).send('successful');
        }
        else {
            console.log('login not successful');
            res.status(201).send('not successful'); 
        }

    }
    catch(error){
        res.status(500);
        console.log('error while checking login credentials');
    } 


    
    
  });  

  router.post('/save_post', async  (req, res) => {
    // Handle POST request to create a new user
    console.log('saving post');
    const new_post = req.body;
    // const username_recieved = req.body.username;
    // const post_rcvd = req.body.post;
    // const date_rcvd = req.body.date;


    try {
       BlogModel.create(new_post)
       .then((result) => {
            res.status(201).send('saved');
            console.log('successfully saved');
       })
    }
    catch(error){
        res.status(500);
        console.log('error while saving posts');
    } 


    
    
  });  

  router.post('/get_posts', async  (req, res) => {
    // Handle POST request to create a new user
    console.log('getting posts');
    const university_name = req.body.university_name;
    // const page_number = req.body.page_number;
    const posts_rcvd = req.body.posts_rcvd;

    const skip_length = posts_rcvd;

    const posts_per_page = 10; 
    // const username_recieved = req.body.username;
    // const post_rcvd = req.body.post;
    // const date_rcvd = req.body.date;


    try {
        
        // const posts = await BlogModel.find({university_name: university_name})
        const posts = await BlogModel.find()
       .sort({date: -1})
       .skip(posts_rcvd)
       .limit(posts_per_page) 

       console.log(posts);

       res.status(201).send(posts);
    }
    catch(error){
        res.status(500);
        console.log('error while getting posts');
    } 


    
    
  });  

  router.post('/get_prev_searches', async  (req, res) => {
    // Handle POST request to create a new user
    console.log('getting prev searches');
    const data = req.body;
    const username_recieved = data.username;

    const searches_per_page = 10; 
   


    try {
        
        const searches = await SearchBasic.find()
       .sort({searchTime: -1})
       .limit(searches_per_page) 

       console.log(searches);

       res.status(201).send(searches);
    }
    catch(error){
        res.status(500);
        console.log('error while getting searches');
    } 


    
    
  });    

  // deal with advanced searches incomplete
  router.post('/search', async  (req, res) => {
    // Handle POST request to create a new user
    console.log('getting  search results');
    const data = req.body;
    const username = data.username;
    const search_type = data.search_type; 
    const is_advanced = data.is_advanced;
    const search_string = data.search_string; 

    const searches_per_page = 10; 
   
    const basic_data = {searchString: search_string, searchTime: new Date(), username: username};
    const str_to_model = {
        "instructor" : InstructorModel,
        "vendor" : VendorModel,
        "location" : LocationModel,
    };
    const str_to_property = {
        "instructor" : "instructor_name",
        "vendor" : "vendor_name",
        "location" : "location_name",
    };

    const selected_model = str_to_model[search_type];
    const selected_property = str_to_property[search_type];

    try {

        const done = await SearchBasic.create(basic_data)
        // .then((result) => {
        //     console.log('search saved to db');
        //     // res.status(201).send(['okay', 'for', 'now']);
        // })
        console.log('search info saved');

    }catch(error){
        res.status(500).send('failure');
        console.log('error while saving search');
    }

    
    try {
        // const posts = await BlogModel.find({university_name: university_name}) 
        selected_model.collection.createIndex({ [selected_property]: 'text' });

        const search_results = await selected_model.find({ $text: { $search: search_string } });
        console.log(search_results);
        
        res.status(201).send(search_results);
        console.log('search results gotten');
    }
    catch(error){
        res.status(500).send('failure');
        console.log('error while getting searches');
    } 


    
    
  });   
  
  router.post('/create_entry', async (req, res) => {
    const record_type = req.body.record_type;
    const req_data = req.body.entry;
    console.log('creating ', record_type); 


    const str_to_model = {
        "department" : DepartmentModel,
        "university" : UniversityModel,
        "address" : AddressModel,
        "office_hours" : OfficeHoursModel,
        "review" : ReviewModel,
        "location": LocationModel,
    };
    const selected_model = str_to_model[record_type];
    console.log(req_data);


    try {
        selected_model.create(req_data)
        .then((result) => {
            console.log(record_type, ' created');
            res.status(201).send('success');
        })
        .catch((error) => {
            console.log('error creating ',record_type );
            res.status(500).send('failure');
        }) 
    }
    catch(error){
        res.status(500).send('falure');
        console.log('error while creating ', record_type);
    }

  });
  router.post('/delete_entry', async(req,res) => {

    //delete an entry from specified collection and 
    //.......
    //.....

    const record_type = req.body.record_type;
    const req_data = req.body.entry;
    console.log('deleting ', record_type); 


    const str_to_model = {
        "department" : DepartmentModel,
        "university" : UniversityModel,
        "address" : AddressModel,
        "office_hours" : OfficeHoursModel,
        "review" : ReviewModel,
        "location": LocationModel,
    };
    const selected_model = str_to_model[record_type];
    console.log(req_data);


    try {
        selected_model.deleteOne(req_data)
        .then((result) => {
            console.log(record_type, ' deleted');
            res.status(201).send('success');
        })
        .catch((error) => {
            console.log('error deleting ',record_type );
            res.status(500).send('failure');
        }) 
    }
    catch(error){
        res.status(500).send('falure');
        console.log('error while creating ', record_type);
    }

  });

  router.post('/get_instructor_data', async (req, res) => {

    console.log('getting instructor profile data'); 
    const req_data = req.body;
    const username_recieved = req_data.username;

    
    
    try {
        let dept_data_t = '';
        let university_data_t = '';
        let address_data_t = '';
        const inst_data = await InstructorModel.findOne({username: username_recieved});
        if (inst_data == null){throw error;}
        if (inst_data.department_ID != null) {
            dept_data_t = await DepartmentModel.findOne({department_ID: inst_data.department_ID});
            if (dept_data_t.university_ID != null){
                university_data_t = await UniversityModel.find({university_ID: dept_data_t.university_ID}); 
                if (university_data_t.address_data != null){
                    address_data_t = await AddressModel.find({address_ID: university_data_t.address_ID});
                }
            }
        }
        const dept_data = dept_data_t;
        const university_data = university_data_t;
        const address_data = address_data_t;
        // const {_id , __v , ...inst_data} = inst_data1; 
        // const {_id , __v , ...dept_data} = dept_data1; 
        // const {_id , __v , ...university_data} = university_data1; 
        // const {_id , __v , ...address_data} = address_data1; 

        const final_data = {instructor: inst_data, department: dept_data, university : university_data, address : address_data};
        res.status(201).send(final_data); 
        console.log('instructor profile sent');

    }
    catch (error) {
        res.status(500);
        console.log(error, 'error while getting instructor profile data');
    }

  }); 
  router.post('/edit_instructor_data', async (req,res) => {
    console.log('editing instructor profile data'); 
    const req_data = req.body;
    const username_recieved = req_data.username; 
    console.log(req_data);

    try {
        const profileExists = await InstructorModel.findOne({username: username_recieved});
        if (profileExists){
            InstructorModel.updateOne(
                {username: username_recieved}, 
                req_data
            )
            .then ((result) => {
                console.log('profile updated'); 
                res.status(201).send('success');
            })
            .catch((error) => {
                console.log('error in profile updation'); 
                res.status(500).send('failure');
            })

        }
        else {
            InstructorModel.create(req_data)
            .then((result) => {
                console.log('profile created');
                res.status(201).send('success');
            })
            .catch((error) => {
                console.log('error creating instructor profile');
                res.status(500).send('failure');
            }) 
        }

    }
    catch(error) {
        res.status(500);
        console.log('error while editing instructor profile data');
    }
  });


  router.post('/get_vendor_data', async (req, res) => {
    console.log('getting vendor profile data'); 
    const req_data = req.body;
    const id_recieved = req_data.username;

    
    
    try {
        const vendor_data = await VendorModel.findOne({username: id_recieved});
        const university_data = await UniversityModel.find({university_ID: vendor_data.university_ID}); 
        const address_data = await AddressModel.find({address_ID: university_data.address_ID});

        // const {_id , __v , ...inst_data} = inst_data1; 
        // const {_id , __v , ...dept_data} = dept_data1; 
        // const {_id , __v , ...university_data} = university_data1; 
        // const {_id , __v , ...address_data} = address_data1; 

        const final_data = {vendor: vendor_data, university : university_data, address : address_data};
        res.status(201).send(final_data); 
        console.log('venodr profile sent');

    }
    catch (error) {
        res.status(500).send('failure');
        console.log('error while getting vendor profile data');
    }
  });
  router.post('/edit_vendor_data', async (req,res) => {
    console.log('editing vendor profile data'); 
    const req_data = req.body;
    const id_recieved = req_data.vendor_ID;

    try {
        const profileExists = await VendorModel.findOne({vendor_ID: id_recieved});
        if (profileExists){
            VendorModel.updateOne(
                {vendor_ID: id_recieved}, 
                req_data
            )
            .then ((result) => {
                console.log('vendor profile updated'); 
                res.status(201).send('success');
            })
            .catch((error) => {
                console.log('error in vendor profile updation'); 
                res.status(500).send('failure');
            })

        }
        else {
            VendorModel.create(req_data)
            .then((result) => {
                console.log('vendor profile created')
                res.status(201).send('success');
            })
            .catch((error) => {
                console.log('error creating vendor profile')
                res.status(500).send('failure');
            }) 
        }
    }
    catch(error) {
        res.status(500);
        console.log('error while editing vendor profile data');
    }
  });

  router.post('/get_departmentlist', async (req, res) => {
    console.log('getting department data in '); 
    const req_data = req.body;
    const id_recieved = req_data.university_ID;
    console.log(id_recieved)


    
    
    try {
        const dept_data = await DepartmentModel.find({university_ID: id_recieved});
        console.log(dept_data);
        res.status(201).send(dept_data); 
        console.log('departmenat  list sent');

    }
    catch (error) {
        res.status(500).send('failure');
        console.log('error while getting department data');
    }
  });

  router.post('/edit_vendor_data', async (req,res) => {
    console.log('editing vendor profile data'); 
    const req_data = req.body;
    const id_recieved = req_data.vendor_ID;

    try {
        const profileExists = await VendorModel.findOne({vendor_ID: id_recieved});
        if (profileExists){
            VendorModel.updateOne(
                {vendor_ID: id_recieved}, 
                req_data
            )
            .then ((result) => {
                console.log('vendor profile updated'); 
                res.status(201).send('success');
            })
            .catch((error) => {
                console.log('error in vendor profile updation'); 
                res.status(500).send('failure');
            })

        }
        else {
            VendorModel.create(req_data)
            .then((result) => {
                console.log('vendor profile created')
                res.status(201).send('success');
            })
            .catch((error) => {
                console.log('error creating vendor profile')
                res.status(500).send('failure');
            }) 
        }

    }
    catch(error) {
        res.status(500);
        console.log('error while editing instructor profile data');
    }
  });

  router.post('/get_instructor_list', async (req, res) => {
    console.log('getting instructor list in '); 
    const req_data = req.body;
    const id_recieved = req_data.university_ID;
    const verified_status = req_data.verified_status;
    console.log(id_recieved)
    console.log('status : ', verified_status)


    
    
    try {
        const ans = InstructorModel.aggregate([
            {
              $lookup: {
                from: "departments",
                localField: "department_ID",
                foreignField: "department_ID",
                as: "instructor_dps"
              }
            },
            {
              $unwind: "$instructor_dps"
            },
            {
              $match: {
                "verified": verified_status,
                "instructor_dps.university_ID" : id_recieved
              }
            },
            {
                $project: {
                  // Specify the fields you want to include from the InstructorModel
                  username: 1,
                  instructor_name: 1,
                  // Add other fields from InstructorModel you want to include
                  // _id: 1, // include this if you want the MongoDB _id field
                }
              }
            
           ])
        ans.then((result)=> {
            console.log(result)
            console.log(result.length)
            res.status(201).send(result);
        })
        .catch((error)=>{
            console.log(error)
        })
        //.toArray((err, result) => {
        //     if (err) {
        //       console.error(err);
        //       return;
        //     }
        //     console.log(result);
        //     res.status(201).send(result); 
        //     console.log('instructor  list sent');
        //   });
        //const dept_data = await InstructorModel.find({verified: false});
       

    }
    catch (error) {
        res.status(500).send('failure');
        console.log('error while getting instructor list ');
    }
  });

  router.post('/upload_location', async (req,res) => {
    console.log('uploading location');
    const req_data = req.body;
    const id_recieved = req_data.location_ID;

    try {
        const profileExists = await LocationModel.findOne({location_ID: id_recieved});
        const user = await UserModel.findOne({username: id_recieved});
        const user_type = user.user_type;
        console.log(user_type)
        if (profileExists && user_type != 'admin'){
            LocationModel.updateOne(
                {location_ID: id_recieved}, 
                req_data
            )
            .then ((result) => {
                console.log('location updated'); 
                res.status(201).send('success');
            })
            .catch((error) => {
                console.log('error in location updation'); 
                res.status(500).send('failure');
            })

        }
        else {
            LocationModel.create(req_data)
            .then((result) => {
                console.log('location  created')
                res.status(201).send('success');
            })
            .catch((error) => {
                console.log('error creating location ')
                res.status(500).send('failure');
            }) 
        }

    }
    catch(error) {
        res.status(500);
        console.log('error while editing instructor profile data');
    }
  });

  router.post('/edit_user_data', async (req,res) => {
    console.log('editing user profile data'); 
    const req_data = req.body;
    const id_recieved = req_data.username;

    try {
        const profileExists = await UserModel.findOne({username: id_recieved});
        if (profileExists){
            UserModel.updateOne(
                {username: id_recieved}, 
                req_data
            )
            .then ((result) => {
                console.log('user profile updated'); 
                res.status(201).send('success');
            })
            .catch((error) => {
                console.log('error in user profile updation'); 
                res.status(500).send('failure');
            })

        }
        else {
            UserModel.create(req_data)
            .then((result) => {
                console.log('user profile created')
                res.status(201).send('success');
            })
            .catch((error) => {
                console.log('error creating user profile')
                res.status(500).send('failure');
            }) 
        }
    }
    catch(error) {
        res.status(500);
        console.log('error while editing user profile data');
    }
  });


//   router.post('/get_average_rating', async (req, res) => {
//     console.log('getting average rating');
//     const vendor_id = req.body.vendor_ID;
//     try {
//         const reviews = await ReviewModel.find({vendor_ID: vendor_id});
//         let total = 0;
//         reviews.forEach((review) => {
//             total += review.user_rating;
//         })
//         const avg_rating = total/ reviews.length;
//         const ans = {avg_rating: avg_rating};
//         res.status(201).send(ans);
//     }
//     catch(error) {
//         res.status(500).send('failure'); 
//         console.log('error while gwtting avg rating');
//     }
//   });
//   router.post('/get_reviews', async (req, res) => {
//     console.log('getting reviews');
//     const vendor_id = req.body.vendor_ID;
//     const reviews_recieved = req.body.reviews_recieved;
//     const reviews_per_page = 10;
//     try {
//         const reviews = await ReviewModel.find({vendor_ID: vendor_id})
//         .limit(reviews_per_page);
       
//         res.status(201).send(reviews);
//     }
//     catch(error) {
//         res.status(500).send('failure'); 
//         console.log('error while getting reviews');
//     }
//   }); 

  router.post('/get_office_hours', async (req,res) => {
    console.log('getting office hours');
    const username = req.body.username;

    try {
        const office_hours = await OfficeHoursModel.find({user_ID: username})
       
        res.status(201).send(office_hours);
        console.log('office hours gotten ')
    }
    catch(error) {
        res.status(500).send('failure'); 
        console.log('error while getting office hours');
    }
  });

  router.post('/delete_office_hours', async (req,res) => {
    console.log('deleting office hours');
    const username = req.body.username;

    try {
        const ans = await OfficeHoursModel.deleteMany({user_ID: username});
       
        res.status(201).send('success');
        console.log('office hours deleted ')
    }
    catch(error) {
        res.status(500).send('failure'); 
        console.log('error while deleting office hours');
    }
  });

  router.post('/get_location', async (req,res) => {
    console.log('getting location ');
    const location_ID = req.body.location_ID;

    try {
        const location = await LocationModel.findOne({location_ID: location_ID})
        console.log(location)
        res.status(201).send(location);
        console.log('location gotten ')
    }
    catch(error) {
        res.status(500).send('failure'); 
        console.log('error while getting location data');
    }
  });
  
  router.post('/update_instructor', async (req,res) => {
    console.log('updating instructor');
    const username = req.body.username;
    const data = req.body.data; 


    console.log(data);

    try {
        //InstructorModel.updateOne({username:'ehsan_manzoor'} , {$set: {instructor_name:'alien'}});
        const result = await InstructorModel.updateOne({ username: username }, { $set: data});         
       
        res.status(201).send('success');
        console.log('instructor updated ')
    }
    catch(error) {
        res.status(500).send('failure'); 
        console.log('instructor update error ')
    }
  });
  router.post('/update_vendor', async (req,res) => {
    console.log('updating vendor');
    const username = req.body.username;
    const data = req.body.data; 


    console.log(data);

    try {
        //InstructorModel.updateOne({username:'ehsan_manzoor'} , {$set: {instructor_name:'alien'}});
        const result = await VendorModel.updateOne({ username: username }, { $set: data});         
       
        res.status(201).send('success');
        console.log('vednor updated ')
    }
    catch(error) {
        res.status(500).send('failure'); 
        console.log('vendor update error ')
    }
  });
  router.post('/get_reviews', async (req,res) => {
    console.log('getting reviews for : ');
    const username = req.body.username;
    console.log(username)
    const posts_per_page = 10;



    try {
        //InstructorModel.updateOne({username:'ehsan_manzoor'} , {$set: {instructor_name:'alien'}});
        const reviews = await ReviewModel.find({vendor_ID: username})
        .sort({date: -1})
        //.limit(posts_per_page)    
        console.log(reviews)
        var avg_rating = 0;

       

        
        reviews.forEach((review)=> {
            avg_rating = avg_rating + review.user_rating; 
        })
        avg_rating = avg_rating/(reviews.length) 
        console.log(avg_rating)

        const data = {avg_rating: avg_rating, review_list: reviews}
        
        
        res.status(201).send(data);
        console.log('reviews retrieved ')
    }
    catch(error) {
        res.status(500).send('failure'); 
        console.log('review retrieval error error ')
    }
  });

//router.post('/save_review ', async  (req, res) => {
//     // Handle POST request to create a new user
//     console.log('saving review');
//     const new_post = req.body;
//     // const username_recieved = req.body.username;
//     // const post_rcvd = req.body.post;
//     // const date_rcvd = req.body.date;


//     try {
//        ReviewModel.create(new_post)
//        .then((result) => {
//             res.status(201).send('saved');
//             console.log('successfully saved');
//        })
//     }
//     catch(error){
//         res.status(500);
//         console.log('error while saving review');
//     } 


    
    
//   });  
//   router.post('/set_open_closed', async (req, res) => {

//   });
//   router.post('/', async (req, res) => {

//   });
//   router.post('/set_office_hours', async (req, res) => {

//   });
//   router.post('/set_availability', async (req,res) => {

//   });
//   router.post('/post_review', async (req, res) => {
//     // will be used by create entry
//   });





  module.exports = router; 

