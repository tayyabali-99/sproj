import './styles/styles.css' 
import './styles/reviews.css'
import React, { createContext, useContext, useEffect } from 'react'
import { useState } from 'react'
import {UserContext} from './App.js'
import { upload } from '@testing-library/user-event/dist/upload';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { backend_addr } from './config.js';




// returns a promise 
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

function IndividualReview(props){

    const review_info = props.review_info; 

    return(
        <div className='individual_review'>
            <div className='rating'> rating : {review_info.user_rating}</div>
            <div className='reviewing_user'> user : {review_info.reviewing_user}</div>
            <div className='commnets_box'> {review_info.content}</div>
        </div>
    )
}

function ReviewList(props){

    const vendor_ID = props.vendor_ID;

    const [reviewList,setReviewList] = useState(''); 
    const [avgRating,setAvgRating] = useState('');
    const [successful,setSuccessful] = useState(false);

    useEffect(() => {
        const data = {username:vendor_ID}
        const ans = contact_db('get_reviews', 'json',data)
        ans.then((result) => {
            setReviewList((prev)=> (result.review_list))
            setAvgRating((prev) => (result.avg_rating))
            setSuccessful((prev)=> (true))

        })
        .catch((error) => {
            setSuccessful((prev)=> (false))
        })
    }, [vendor_ID])

    return (
        <div>
        {(!successful || reviewList.length == 0) &&<div> no reviews to show </div>}
        {(successful && reviewList.length > 0) && <div >
            <div className='average_rating'>
                average : {avgRating}
            </div>
            <div className='review_list'>
                {
                    reviewList.map((review,index) => 
                        (<IndividualReview review_info = {review}/>)
                    )
                }
            </div>
        </div>}
        </div>
    )

}



function PostReview(props){

    const [rating,setRating] = useState(1)
    const [comments, setComments] = useState('')
    const [submit, setSubmitting] = useState(false) 
    const [cancel, setCancelling] = useState(false) 
    const [successful, setSuccessful] = useState(false);
    const {posting,setPosting} = useContext(reviewingContext) ;
    //const {userData, SetUserData} = useContext(UserContext);
    const {userData,SetUserData} = useContext(UserContext);

    const max_comments_size = 200;
    const vendor_ID = props.vendor_ID;

    function handle_cancel(){
        setCancelling((prevCancelling)=> (true));
    }
    function handle_submit(){
        // send the review data to the backend 

        setSubmitting((prevSubmitting)=> (true));

       

        const date_time = new Date();

        const req_data = {review_ID: "1" , vendor_ID : vendor_ID, content: comments , user_rating : rating, reviewing_user : userData, date : date_time};
        const data = {entry : req_data, record_type : 'review'};
        
        
        const ans = contact_db('create_entry', 'text', data);
        ans.then((result) => {
            setSuccessful((prev)=> (true));
        }) 
        .catch((error) => {
            setSuccessful((prev)=> (false));
        })
        


    }
    function handle_finish(){
        //setFinished((prevFinished)=> (true));
        setPosting((prevPosting) => (false));
        //setPosting(false);


    }
    function handle_change(event){
        const value = event.target.value;

        if (value.length <= max_comments_size){
            setComments((prevComments)=> (value));
        }

    }
    function handle_rating_change(event){
        const value = event.target.value; 

        setRating((prevRating) => (value));
    }

    return (
        <div className='post_review'>
            <div className='rating_select'> 
                <select value = {rating} onChange = {handle_rating_change}>
                    <option value = {1}>1 : unsatisfying </option>
                    <option value = {2}>2 </option>
                    <option value = {3}>3 </option>
                    <option value = {4}>4</option>
                    <option value = {5}>5 : excellent</option>
                </select>
            </div>
            <div className='review_text_box'>
                <textarea rows = '6' cols = '40' value = {comments} onChange = {handle_change} placeholder='any comments' />
            </div>
            <div className='submit_buttons'>
                <div className='default_buttons'>
                    <button onClick={handle_submit} disabled = {rating == ''}> submit</button>
                    <button onClick={handle_cancel}>cancel</button>
                </div>

                <div className='confirmation_button'>
                    {submit && 
                        <div>
                            { successful && <div> review posted</div>}
                            { !successful && <div> error posting review </div>}
                            <button onClick={handle_finish}> ok </button>
                        </div>}
                    {cancel && 
                        <div>
                            <div> review cancelled</div>
                            <button onClick={handle_finish}> ok </button>
                        </div>}
                </div>

            </div>
        </div>
    )
}

const reviewingContext = createContext();

function Review(props){

    //const vendor_ID = props.vendor_ID; 
    const { username } = useParams();

    const vendor_ID = username;
    const [posting, setPosting] = useState(false);

    function handle_post(){
        setPosting((prevPosting) => (true))
    }

   

    return (
        <div className='review_page'>
            <h1>review page</h1>
            <h3>{vendor_ID}</h3>
            <div className='review_region'>
               {!posting &&  <div className='review_header'>
                    <button onClick={handle_post}> post review</button>
                </div>
                }
                <reviewingContext.Provider value={{posting,setPosting}}>
                    {posting && <PostReview vendor_ID = {vendor_ID} />}
                </reviewingContext.Provider>

                {!posting && <ReviewList vendor_ID = {vendor_ID} />}

            </div>
        </div>
    )
}

export default Review