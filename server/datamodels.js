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
    department_ID : {type: String, required:true}, 
    designation : {type: String, required:true}, 
    location_ID : {type: String, required:false}, 
    availability : {type: String, required:true}, 
    auto_check : {type: String, required:true},
    instructor_name : {type: String, required: true},

})

const departmentModel = mongoose.model('departmen', {
    department_ID : {type: String, required:true}, 
    department_name : {type: String, required:true}, 
    school : {type: String, required:true}, 
    department_size : {type: String, required:true}, 
    university_ID : {type: String, required:true}, 

})

const universityModel = mongoose.model('university', {
    university_ID : {type: String, required:true}, 
    university_name : {type: String, required:true}, 
    university_faculty_size : {type: String, required:true}, 
    university_enrollment : {type: String, required:true}, 
    location_ID : {type: String, required:true}, 
    address_ID : {type: String, required:true}, 
}) 

const addressModel= mongoose.model ('address', {
    address_ID : {type: String, required:true}, 
    country : {type: String, required:true}, 
    state: {type: String, required:false}, 
    city : {type: String, required:true}, 
    street1 : {type: String, required:true}, 
    street2 : {type: String, required:false},
})

const vendorModel = mongoose.model('vendor', {
    username : {type: String, required:true}, 
    vendor_name : {type: String, required:true}, 
    university_ID : {type: String, required:true}, 
    location_ID : {type: String, required:true}, 
    vendor_ID : {type: String, required:true},

})

const reviewModel = mongoose.model('review', {
    review_ID : {type: String, required:true}, 
    vendor_ID : {type: String, required:true}, 
    content : {type: String, required:true}, 
    user_rating : {type: Number, required:true}, 
    reviewing_user : {type: String, required:true},
    date : {type: Date, required:false}, 
})

const locationModel = mongoose.model('location', {
    location_ID: {type: String, required:true}, 
    coordinates : {type: String, required:true}, 
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
