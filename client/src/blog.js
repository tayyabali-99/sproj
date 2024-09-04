import './styles/blog.css'
import { useState } from 'react';
import React, { createContext, useContext } from 'react';
import Navbar from './navbar.js'  
// import { set } from 'mongoose';
import {UserContext} from './App.js'
import { backend_addr } from './config.js';

 

function IndividualPost(props){
    return (
        <div className='post_display'>
            <div className='post_header'>
                {props.username}
            </div> 
            <div className='post_content'>
                {props.content}
            </div>
        </div>
    )
}

function PostList(props) {
    return (
        <div className='post_list'>
            {
                props.posts.map((post,index) => (
                    <IndividualPost username = {post.username} content = {post.post}/>
                ))
            }
        </div>
    )
}

function Blog_feed (){

    const [rcvd, setRcvd] = useState(0);
    const [posts, setPosts] = useState([]);
    


    function get_posts(){

        const data = { university_name : '-', posts_rcvd : rcvd};
        fetch(backend_addr + 'get_posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
            })
            .then((response) => {
                if (response.ok) {
                console.log('post returned successfully');
                const result =  response.json();
                //console.log();
                return result;
                // Handle success if needed
                } else {
                console.error('Error response');
                // Handle error if needed
                }
            })
            .then ((result)=> {
                // for (let i = 0; i< result.length; i++){
                //     let the_post = result[i].post;
                // }
                let temp_posts = posts; 
                temp_posts.push(...result);
                setPosts(temp_posts);
                // setPosts(result);
                setRcvd((prevRcvd)=> (temp_posts.length));
            }) 
            .catch((error) => {
                console.error('Error occurred :', error);
                // Handle error if needed
            });

    }


    return (
        <div>
            <div className='feed'>
                <PostList posts = {posts}/>
                {/* <ul>
                    {posts.map((item, index) => (
                        <li key={index}>{item.post}</li>
                    ))}
                </ul>  */}


            </div>
            <div className='show_more_posts'>
                <div className='smp_button'>
                    <button onClick={get_posts}> show more </button>
                </div>

            </div>
        </div>
       
    )

    
    

}


function Blog_post(){

    const [post, setPost] = useState('');
    //const [writing, setWriting] = useState(false);
    const max_post_size = 200;
    const [cancelled, setCancelled] = useState(false);
    const [posted, setPosted] = useState(false);
    const [saved, setSaved] = useState(false);
    const {writing, setWriting} = useContext(writingContext);
    const {userData, SetUserData} = useContext(UserContext);


    function save_post(post_details){


        const username_rcvd = post_details.username;
        const post_rcvd = post_details.post

        let ans = false;

    
        const data = { username: username_rcvd, post: post_rcvd, date : new Date(), university_name : '--'}
    
        return new Promise((resolve, reject) => {
            fetch(backend_addr+'save_post', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            })
              .then((response) => {
                if (response.ok) {
                  console.log('Data saved successfully');
                  return response.text();
                } else {
                  console.error('Error response');
                  ans = false;
                  throw new Error('Failed to save data');
                }
              })
              .then((result) => {
                console.log('Received:', result);
                ans = true;
                // Use ans here or trigger another function with ans
                // For example, call anotherFunction(ans);
                resolve(ans); // Resolve the Promise with the value of ans
              })
              .catch((error) => {
                console.error('Error occurred:', error);
                ans = false;
                // Use ans here or trigger another function with ans
                // For example, call anotherFunction(ans);
                reject(ans); // Reject the Promise with the value of ans
              });
          });
        }
        
    
    



    // function handleSubmit(event) {
    //     event.preventDefault();

    //     if (event.target.name == 'post')
    //     {
    //         const post_details = {username: '', post : post};
    //         const saved = save_post(post_details);

    //         setPosted((prevPosted) => (true));
    //         setCancelled((prevCancelled)=> (false));
    //         setSaved((prevSaved)=>(saved));
    //     }
    //     else {

    //         setCancelled((prevCancelled)=> (true));
    //         setPosted((prevPosted) => (false));
    //     }


    //     //setPost('');
    //     //setWriting((prevWriting) => (false));
        


    // }
    function HandleClick(event) {
        event.preventDefault();
        //const [writing, setWriting] = useContext(writingContext);

        if (event.target.name == 'post')
        {
            const post_details = {username: userData, post : post};
            let saved = false; 
            save_post(post_details).then((ans) =>{
                setSaved((prevSaved)=>(ans));
                
            })
            .catch((ans)=> {
                setSaved((prevSaved)=>(ans));
            })

            setPosted((prevPosted) => (true));
            setCancelled((prevCancelled)=> (false));
            // setSaved((prevSaved)=>(saved));
        }
        else if (event.target.name == 'go_back'){
            setWriting(false);
        }
        else {

            setCancelled((prevCancelled)=> (true));
            setPosted((prevPosted) => (false));
        }
        //setWriting((prevWriting) => {false});


        //setPost('');
        //setWriting((prevWriting) => (false));
        


    }

    function handle_change(event) {
        const value = event.target.value; 

        if (value.length <= max_post_size){
            setPost(value);
        }
    }

    


    return (
        <div className='post_box'>
            <div >
                <div>
                    <textarea rows = '6' cols = '40' value = {post} onChange = {handle_change} placeholder='whats on your mind' />
                </div>
                {
                    !(posted || saved || cancelled) && 
                    <div className='post_buttons'>
                        <button onClick={HandleClick} name = 'post' disabled = {post.length == 0}> post</button>
                        <button onClick={HandleClick} name = 'cancel' disabled = {post.length == 0}> cancel</button>
                    </div>
                }
                      
            </div>
            <div className='post_after'>
                {(posted && saved) && <p>successfully posted</p>}
                {(posted && !saved) && <p>Error saving post </p>}
                {cancelled && <p>post was cancelled</p>}
                {/* {writing && <p>writing = true</p>} */}
                {
                    (posted || saved || cancelled)&& 
                    <div className='back_to_feed'>
                        <button onClick={HandleClick} name = 'go_back'>ok</button>
                    </div>
                }
                
            </div>
        </div>
       
    );
}


const writingContext = createContext();


function Blog (){

    const [writing, setWriting] = useState(false);

    function create_post() {
        setWriting((prevWriting) =>(true));
    }


    return (


        <div className= 'blog_page'>
            <div className= 'post_bar'>
                <div className='post_bar_left'>

                </div>
                <div className='post_bar_right'>
                    <button disabled = {writing} onClick={create_post}>create post</button> 
                </div>
            </div>
           
            <div className='blog_post'>
            <writingContext.Provider value={{writing,setWriting}}>
                {writing &&<Blog_post />}
            </writingContext.Provider>
            </div>

            <div className='blog_feed' >
            <writingContext.Provider value={{writing,setWriting}}>
                {!writing && <Blog_feed />}
            </writingContext.Provider>
            </div>
            
        </div>
    );
}


export default Blog;
 
