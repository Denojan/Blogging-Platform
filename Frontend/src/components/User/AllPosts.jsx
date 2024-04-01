import axios from '../../api/axios';
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import filterImg from "../../assert/filter.png";
import useAuth from "../../hooks/useAuth";
const GET_Post_URL = '/post/getPosts';


function AllPosts() {

 const { auth } = useAuth();

  const { user } = auth;
  const [post,setPosts] = useState([])
  const [roleFilterOption, setRoleFilterOption] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredPosts = post.filter((post) => {
    if (filterStatus === "All") {
      return true;
    }
    return post.category === filterStatus; 
  });

  useEffect(() => {
    const getPosts = async () => {
      try {
        
        const { accessToken } = auth;
       
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        };
        const res = await axios.get(GET_Post_URL, config);
      
        setPosts(res.data);
      } catch (err) {
       
        toast.error('Error occurred while fetching employees.');
      }
    };
  
    getPosts();
  }, [auth]);

  

  function filterContent(report, searchTerm) {
    const result = report.filter(
      (r) =>
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setPosts(result);
  }

  const handleTextSearch = (e) => {
    const searchTerm = e.currentTarget.value;
    const { accessToken } = auth;
       
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    };
    axios.get(GET_Post_URL,config).then((res) => {
      console.log(res.data);
      if (res.data) {
        filterContent(res.data, searchTerm);
      }
    });
  };

 

  const handleRoleFilterChange = (event) => {
    setRoleFilterOption(event.target.value);
  };




  return (
   

     <>
      
      <div className="bg-white rounded-lg shadow-2xl p-8 m-4 mt-32">
  <div className="flex justify-between items-center">
    <div class="pb-4 bg-white flex items-center">
      <label for="table-search" class="sr-only">
        Search
      </label>
      <div class="relative mt-1 flex-shrink-0">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          id="table-search"
          onChange={handleTextSearch}
          class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          style={{ marginRight: "5px" }}
          placeholder="Search for Title or User"
        />
      </div>
    </div>
    <div>
      <button
        style={{ backgroundColor: "#1FE23F" }}
        className="block bg-teal-400 hover:bg-teal-600 text-white font-bold uppercase text mx-auto p-2 rounded-full"
      >
        <Link to={"/user/addBlog"}>Create Blog</Link>
      </button>
    </div>
  </div>

  <div className="flex justify-between items-center mt-4">
    <h1 className="text-2xl font-bold">All Blogs</h1>
    <div className="relative">
      <img src={filterImg} className="absolute top-2 left-2 w-4 h-4" />
      <select
        className="pl-8 pr-4 py-2 bg-white border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
        value={filterStatus}
        onChange={handleStatusChange}
      >
        <option value="All">All</option>
        <option value="Music">Music</option>
        <option value="Movies">Movies</option>
        <option value="Sports">Sports</option>
        <option value="Tech">Tech</option>
        <option value="Fashion">Fashion</option>
        <option value="Others">Others</option>
      </select>
    </div>
  </div>

  {filteredPosts.length > 0 ? (
  <div className="flex flex-wrap justify-center">
    {filteredPosts.map((event, index) => (
      <div
        key={index}
        class="flex flex-col flex-grow shadow-lg rounded-lg w-80 m-4"
        style={{ width: "30%", maxWidth: "30%" /* added maxWidth */ }}
      >
        <div class="flex justify-between items-center p-4">
          <div>{event.username}</div>
          <div>{event.category}</div>
        </div>
        <div class="p-4">
          <div style={{ textAlign: "left" }}>{event.title}</div>
          <div style={{ textAlign: "left" }}>{event.description}</div>
        </div>
      </div>
    ))}
  </div>
) : (
  <p style={{ color: 'red' }}>No Posts found.</p>

)}

</div>

      

    </>

    
  
  );
}

export default AllPosts