import React, { Fragment, useEffect } from "react";
import {useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";
import logo from "../../Images/Profile.png"
import { logout } from "../../actions/userActions";
import { useAlert } from "react-alert";
const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);
  
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={logo} alt={user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/">Home</Link>
                <Link to="/urls/me">My URLs</Link>
                <Link to="/password/update">Change Password</Link>
                <Link onClick={logoutUser} to="/">Log Out</Link>
                
            
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;