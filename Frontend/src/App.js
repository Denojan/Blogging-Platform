
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import { Routes, Route } from "react-router-dom";
import AdminPortal from "./components/portal/AdminPortal";
import UserPortal from "./components/portal/UserPortal";
import AllPosts from "./components/User/AllPosts";
import AddPost from "./components/User/AddBlog";
import MyBlog from "./components/User/MyBlog";
import UpdatePassword from "./components/User/UpdatePassword";
import UpdateDetail from "./components/User/UpdateDetail";
import EditPost from "./components/User/EditPost";
import AllAdminBlog from "./components/Admin/AllAdminBlog";
import AllUser from "./components/Admin/AllUser";
import AdminAddBlog from "./components/Admin/AdminAddBlog";
import AdminEditPost from "./components/Admin/EditPost";
import AdminMyBlog from "./components/Admin/MyBlog";
import AdminUpdateDetail from "./components/Admin/UpdateDetail";
import AdminUpdatePassword from "./components/Admin/UpdatePassword";






const ROLES = {
  User: 2000,
  Admin: 5000,
};

function App() {
  return (
    <>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />


          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/user" element={<UserPortal />}>
               <Route path="allBlog" element={<AllPosts />} />
            <Route path="addBlog" element={<AddPost />} />
              <Route path="myBlog" element={<MyBlog />} />
               <Route path="updatePass" element={<UpdatePassword />} />
               <Route path="update" element={<UpdateDetail />} />
               
              <Route path="updateBlog/:id" element={<EditPost />} />
          
        </Route>
        </Route>

        
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="/admin" element={<AdminPortal />}>
               <Route path="allBlog" element={<AllAdminBlog />} />
            <Route path="addBlog" element={<AdminAddBlog />} />
              <Route path="myBlog" element={<AdminMyBlog />} />
               <Route path="updatePass" element={<AdminUpdatePassword />} />
               <Route path="update" element={<AdminUpdateDetail />} />
               
              <Route path="updateBlog/:id" element={<AdminEditPost />} />
              <Route path="alluser" element={<AllUser />} />
        </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Routes>
 
      <ToastContainer />
    </>
  );
}

export default App;
