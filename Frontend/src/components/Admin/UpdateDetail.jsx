import { useState, useEffect } from "react";
import axios from '../../api/axios';
import React from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from '../../hooks/useAuth';
import { useNavigate} from 'react-router-dom';

const Update_URL = '/user/updateUser';

function UpdateDetail() {
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [id, setID] = useState('');
    const [success, setSuccess] = useState(false);
    const { user } = auth;

    useEffect(() => {
      const getUser = async () => {
        try {
          
          const { accessToken } = auth;
         
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          };
          const res = await axios.get(`/user/getOneUser/${user}`, config);
        
          setUsername(res.data.username);
          setEmail(res.data.email);
          setID(res.data._id);
        } catch (err) {
         
          toast.error('Error occurred while fetching employees.');
        }
      };
    
      getUser();
    }, [auth]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { user, accessToken } = auth;
            console.log(username,email);
            const response = await axios.put(
                `/user/updateUser/${id}`,
                JSON.stringify({ username, email }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                    withCredentials: true,
                }
            );
            toast.success('Details updated successfully');
            setTimeout(() => {
              navigate(`/admin/allBlog`);
            }, 1500);
        } catch (err) {
          if (!err?.response) {
            toast.error('No Server Response');
          } else if (err.response?.status === 400) {
            toast.error('ID parameter is required.');
          } else if (err.response?.status === 401) {
            toast.error('Email is already used.');
          }else if (err.response?.status === 403) {
            toast.error('Username is already used.');
          }else if (err.response?.status === 406) {
            toast.error('No changed happened.');
          } else {
            toast.error('Password update failed');
          }
        }
    };

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <section>
                    <div className="flex justify-center items-center h-full w-full bg-white pt-24">
                        <div className="w-full md:w-2/3 bg-white rounded-xl border-black border-4 shadow-xl p-8 m-4 md:ml-34 mt-24">
                            <div className="relative flex flex-col items-center justify-center">
                                <h1 className="block w-full text-center text-black text-3xl font-bold mb-6">
                                    Update Details
                                </h1>
                                <form
                                    className="flex flex-col items-center"
                                    onSubmit={handleSubmit}
                                >
                                  
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        className="border py-2 px-4 h-12 text-grey-800 w-72 rounded-xl mb-8 shadow-md"
                                        onChange={(e) => setUsername(e.target.value)}
                                        value={username}
                                        required
                                    />

                               
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="border py-2 px-4 h-12 text-grey-800 w-72 rounded-xl mb-8 shadow-md"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        required
                                    />

                                    <button className="w-32 h-10 bg-[#E65F2B] text-white font-bold rounded-lg">
                                        Update
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default UpdateDetail;
