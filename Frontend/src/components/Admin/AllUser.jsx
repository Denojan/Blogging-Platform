import axios from '../../api/axios';
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../hooks/useAuth";

const GET_USERS_URL = '/user/getUsers';

function AllUser() {
  const { auth } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { accessToken } = auth;
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        };
        const response = await axios.get(GET_USERS_URL, config);
       
        const filteredUsers = response.data.filter(user => user.roles.User === 2000);
        setUsers(filteredUsers);
      } catch (error) {
       
        toast.error("Failed to fetch users");
      }
    };
  
    fetchUsers();
  }, [auth]);
  

  const onDelete = async (userId) => {
    try {
      const { accessToken } = auth;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      };
      console.log(userId);
      const response = await axios.delete(`/user/deleteUser/${userId}`, config);
      
      setUsers(users.filter(users => users._id !== userId));
      toast.success('User deleted successfully');
    } catch (err) {
      if (!err?.response) {
        toast.error('No Server Response');
    } else if (err.response?.status === 404) {
      toast.error('Post not found');
    } else if (err.response?.status === 500) {
      toast.error('Internal server error');
    } 
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-2xl p-8 m-4 mt-32">
        <h1 className="text-2xl font-bold mb-4">All Users</h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="border px-4 py-2">{user.username}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2"> <button onClick={() => onDelete(user._id)}>
                              <div class="w-4 mr-2 transform hover:text-red-600 hover:scale-110">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </div>
                            </button>
                 </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AllUser;
