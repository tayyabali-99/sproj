const { Int32 } = require("mongodb");
const { default: mongoose } = require("mongoose");

const userModel = mongoose.model('credentials',{
    username: {type:String , required : true},
    password: {type:String , required : true},
    email:  {type:String , required : true},
    first_name: {type:String , required : true},
    last_name: {type:String , required : true},
    user_type: {type:String , required : true},
    university_ID: {type: String, required: true},
})

const blogModel = mongoose.model('blog_post',{
    username: {type:String , required : true},
    post: {type:String , required : true},
    date: {type:Date , required : true},
    university_name : {type:String, required: true},
})

const searchBasic = mongoose.model('search_data', {
    searchString : {type: String, required: false}, 
    searchTime : {type: Date, required: true}, 
    username: {type:String, required: true},

})

const searchInstructor = mongoose.model('search_instructor', {
    department : {type: String, required: false}, 
    school : {type: String, required: false}, 
    availability : {type: Boolean, required: false}

})

const searchVendor = mongoose.model('search_vendor', {
    vendorType : {type: String, required: false}, 
    open : {type: Boolean, required: false}, 

})

const searchLocation = mongoose.model('search_location', {
    distance : {type: String, required: false}, 
    locationType : {type: String, required: true}, 

})
const instructorModel = mongoose.model('instructor', {
    username : {type: String, required:true}, 
    department_ID : {type: String, required:false, default : null}, 
    designation : {type: String, required:false, default : null}, 
    location_ID : {type: String, required:false, default : null}, 
    availability : {type: String, required:false, default : null}, 
    auto_check : {type: String, required:false, default : null},
    instructor_name : {type: String, required: true},
    verified : {type:Boolean, required: false, default: false},

})

const departmentModel = mongoose.model('department', {
    department_ID : {type: String, required:true}, 
    department_name : {type: String, required:true}, 
    school : {type: String, required:true}, 
    department_size : {type: String, required:true}, 
    university_ID : {type: String, required:true}, 

})

const universityModel = mongoose.model('university', {
    university_ID : {type: String, required:true}, 
    university_name : {type: String, required:true}, 
    university_faculty_size : {type: String, required:false}, 
    university_enrollment : {type: String, required:false}, 
    location_ID : {type: String, required:false},
    address_ID : {type: String, required:false}, 
    Admin_username : {type: String, required:true}
}) 

const addressModel= mongoose.model ('address', {
    address_ID : {type: String, required:true}, 
    country : {type: String, required:true}, 
    state: {type: String, required:false}, 
    city : {type: String, required:true}, 
    line1 : {type: String, required:true}, 
})

const vendorModel = mongoose.model('vendor', {
    username : {type: String, required:true}, 
    vendor_name : {type: String, required:false, default : null}, 
    university_ID : {type: String, required:false, default : null}, 
    location_ID : {type: String, required:false, default : null}, 
    vendor_ID : {type: String, defualt : function(){return this.username} },

})

const reviewModel = mongoose.model('review', {
    review_ID : {type: String, required:true}, 
    vendor_ID : {type: String, required:true}, 
    content : {type: String, required:false}, 
    user_rating : {type: Number, required:true}, 
    reviewing_user : {type: String, required:true},
    date : {type: Date, required:false}, 
})

const locationModel = mongoose.model('location', {
    location_ID: {type: String, required:true}, 
    longitude : {type: Number, required:true}, 
    latitude : {type: Number, required:true },
    location_name : {type:String, required: true},
})

const officeHoursModel = mongoose.model ('office_hours', {
    //office_hours_ID: {type: String, required:true}, 
    user_type : {type: String, required:true},
    user_ID : {type: String, required:true},
    start_time : {type: String, required:true}, 
    end_time : {type: String, required:true},  
    day : {type: String, required:true}, 
})



module.exports = {
    SearchLocation: searchLocation , 
    SearchVendor: searchVendor , 
    SearchInstructor: searchInstructor,  
    UserModel : userModel,
    BlogModel : blogModel,
    SearchBasic: searchBasic,  
    InstructorModel : instructorModel, 
    DepartmentModel: departmentModel, 
    UniversityModel : universityModel, 
    AddressModel : addressModel, 
    VendorModel : vendorModel, 
    ReviewModel : reviewModel, 
    LocationModel : locationModel, 
    OfficeHoursModel : officeHoursModel,
}
