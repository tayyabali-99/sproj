import './styles/search.css' 
import React, { useEffect } from 'react'
import { useState } from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { backend_addr } from './config.js';



function Prev_searches(){

    const [searches, SetSearches] = useState([])

    function get_searches(){
        // get past 10 -15 searches and display them 
        //....
        //...
        const data = {username: '--'};
    
        fetch(backend_addr+'get_prev_searches', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
                })
                .then((response) => {
                    if (response.ok) {
                    const result =  response.json();
                    return result;
    
                    } else {
                    console.error('Error response');
                    }
                })
                .then ((result)=> {
                    SetSearches(result);
                }) 
                .catch((error) => {
                    console.error('Error occurred :', error);
                });
    
    }


    return (
        <div className='search_list'>
            <button onClick={get_searches}>history</button>
            {
                searches.map((item) => (
                    <div className='indiv_search'>
                        {item.searchString}
                    </div>
                ))
            }
        </div>
    )
}


// function 



function Search(){

    const [searchInput, SetSearchInput] = useState('');
    const [searchCategory,SetSearchCategory] = useState('');
    const [adv, SetAdv] = useState(false);
    const [open, setOpen] = useState(false);
    const [available, SetAvailable] = useState(false);
    const [school, SetSchool] = useState('');
    const [dept, SetDept] = useState('');
    const [vendorType, SetVendorType] = useState('');
    const [searchResults, SetSearchResults] = useState([]);
    const [showSearchResults, SetShowSearchResults] = useState(false);
    const [id, SetId] = useState('');
    //const [searchOutput,SetSearchOutput] = useState('')

    useEffect(()=> {
        if (searchCategory == 'location'){
            SetId((prev)=> ('location_ID'))
        }
        else if (searchCategory == 'instructor' || searchCategory == 'vendor') {
            SetId((prev)=> ('username'))
        }
    },[searchCategory])



 




    function handleSearchChange(event){
        const val = event.target.value; 

        SetSearchInput(val); 
    }

    function handleSearch(){
        const search_type = searchCategory;
        const search_input = searchInput;

        const data = {username: '--', search_type: search_type, is_advanced : adv, search_string : search_input}

        fetch(backend_addr+'search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
                })
                .then((response) => {
                    if (response.ok) {
                    const result =  response.json();
                    return result;
    
                    } else {
                    console.error('Error response');
                    }
                })
                .then ((result)=> {
                    SetSearchResults(result);
                }) 
                .catch((error) => {
                    console.error('Error occurred :', error);
                });



        SetSearchInput('');
        SetShowSearchResults((prev) => (true));
        
        // get matches from backend
        //....
        //....
        //
    }

    function handle_adv(){
        SetAdv((prevAdv) => (true))
    }

    function handleSchoolChange(event){
        const val = event.target.value; 

        SetSchool(val); 
    }
    function handleDeptChange(event){
        const val = event.target.value; 

        SetDept(val); 
    }
    function handleVendorTypeChange(event){
        const val = event.target.value; 

        SetVendorType(val); 
    }
    function handleOpenChange(event){
        const val = event.target.value; 

        setOpen(val); 
    }
    function handleAvailabilityChange(event){
        const val = event.target.value; 

        SetAvailable(val); 
    }

    // function handle_advanced_search(){

    // }



    function handleInstructorSearch(){
        SetSearchCategory((prevSearchCategory) => ('instructor'))
    }
    function handleVendorSearch(){
        SetSearchCategory((prevSearchCategory) => ('vendor'))
    }
    function handleLocationSearch(){
        SetSearchCategory((prevSearchCategory) => ('location'))

        //sprint 3
        //.....
        //.....
    }

    function handledeptChange(event){
        const dept = event.target.value; 

    }
    function handleSearchCancel(){
        SetShowSearchResults((prevShowSearchResults) => (false))
    }

    function search_output(item,s_type){
        if (s_type == 'vendor'){
            return item.vendor_name;
        }
        else if (s_type == 'instructor'){
            return item.instructor_name;
        }
        else if (s_type == 'location'){
            return item.location_name; 
        }
    }
    

    return (

        <div className='Search_page'>
            <div className='search_catgs_bar'>
                <button onClick = {handleInstructorSearch}>instructor</button>
                <button onClick = {handleVendorSearch}>vendor</button>
                <button onClick = {handleLocationSearch}>location</button>

            </div>
            <div className='search_box'> 
                <input type = 'text' name = 'search_string' onChange={handleSearchChange} value = {searchInput} disabled= {searchCategory.length == 0}/>
                <button disabled = {searchInput.length ==0} onClick = {handleSearch} >search</button>
            </div>
            <div className='advanced_search'>
                {!adv &&
                <div className='adv_bar'>
                    <button onClick = {handle_adv} disabled = {searchCategory.length == 0}>advanced</button>
                </div>
                }
                {adv && 
                <div className='adv_fields'>
                    {searchCategory == 'instructor' && 
                    <div>
                    
                        <select value = {school} onChange={handleSchoolChange}>

                            {/*/ must get departments from the db later */}
                            <option value = 'engineering'> engineering</option>
                            <option value = 'humanities'> humanities</option>
                            <option value = 'business'>business </option>
                            <option value = 'law'>law </option>
                            <option value = 'education'>education </option>
                        </select>

                        <select value = {dept} onChange={handleDeptChange}>
                            {/*/ must get departments from the db later */}
                            <option value = 'cs'> cs</option>
                            <option value = 'mgmt'> mgmt</option>
                            <option value = 'econ'>econ </option>
                            <option value = 'bio'>bio </option>
                            <option value = 'chem'>chem </option>
                        </select>
                        <select value = {available} onChange = {handleAvailabilityChange}>
                            <option value = {true} >available</option>
                            <option value = {false} >unavailable</option>
                        </select>
                    </div>
                    }

                    {searchCategory == 'vendor' && 

                    <div>
                        <select value = {vendorType} onChange={handleVendorTypeChange}>
                            {/*/ must get departments from the db later */}
                            <option value = 'restaurant'> restaurant</option>
                            <option value = 'cafe'> cafe</option>
                            <option value = 'grocery'>grocery </option>
                            <option value = 'stationary'>stationary </option>
                        </select>
                        <select value = {open} onChange = {handleOpenChange}>
                            <option value = {true}>open</option>
                            <option value = {false}>closed</option>
                        </select>
                    </div>
                    }

                </div>
                }

            </div>
            <div className='prev_search_box'>
                {showSearchResults == false && <Prev_searches />}
            </div>
            <div className='search_results'>
                {showSearchResults && 
                <div>
                    <div >
                        {searchResults.map((item) => (
                            <div className='individual_search_result'>
                                {searchCategory != 'location' && <Link to ={`/profile/${item[id]}`}>{search_output(item,searchCategory)}</Link>}
                                {searchCategory == 'location' && <Link to ={`/show_location/${item[id]}`}>{search_output(item,searchCategory)}</Link>}

                            </div>
                        ))}

                    </div>

                    <div className='cancel_button'>
                        <button onClick={handleSearchCancel}>cancel</button>
                    </div>
                </div>
                }
            </div>
        </div>

    );
}


export default Search;
