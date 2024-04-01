import React, { useState } from "react";
import axios from '../../api/axios'; 
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../hooks/useAuth";
function AddBlog() {
  const { auth } = useAuth();
  const { user } = auth;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
  
  
      
      const { accessToken } = auth;
      await axios.post(
        "/post/create",
        JSON.stringify({ title,
          description,
          category,
          username: user, }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      toast.success("Blog added successfully");
 
      navigate(`/user/allBlog`);
    } catch (error) {

    
      toast.error("Failed to add Blog");
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center h-full w-full bg-white pt-10">
        <div className="w-2/3 bg-white rounded-xl border-black border-4 shadow-xl p-8 m-4 ml-34 mt-24">
          <h1 className="block w-full text-center text-black text-3xl font-bold mb-6">
            Add Blog
          </h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-1">
            <div className="flex flex-col mb-4 mr-4 pt-8">
              <label className="mb-2 font-bold text-lg text-black ml-5" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="border py-2 px-3 text-grey-800 w-full rounded-xl shadow-md"
                placeholder="Enter Title"
              />
            </div>

            <div className="flex flex-col mb-4 mr-4 pt-8">
              <label className="mb-2 font-bold text-lg text-black ml-5" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="border py-2 px-3 text-grey-800 w-full rounded-xl shadow-md"
                placeholder="Enter Description"
              />
            </div>

            <div className="flex flex-col mb-4 mr-4 pt-8">
              <label className="mb-2 font-bold text-lg text-black ml-5" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="border py-2 px-3 text-grey-800 w-full rounded-xl shadow-md"
              >
                <option value="">Select Category</option>
                <option value="Music">Music</option>
                <option value="Movies">Movies</option>
                <option value="Sports">Sports</option>
                <option value="Tech">Tech</option>
                <option value="Fashion">Fashion</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="col-span-2 flex justify-center">
              <button
                type="submit"
                className="bg-[#E65F2B] text-white rounded-[10px] mt-5 h-10 w-[200px] m-auto font-bold py-2 px-4 shadow focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBlog;