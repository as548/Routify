import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route ,Navigate} from 'react-router-dom';
import Header from '../src/components/layout/Header/Header';
import './App.css';
import WebFont from "webfontloader";
import Footer from './components/layout/Footer/Footer.js';
import Home from './components/Home/Home.js';
import store from './Store.js';
import { loadUser } from './actions/userActions.js';
import { useSelector } from "react-redux";
import LoginSignUp from "./components/User/LoginSignUp.js"
import Profile from "./components/User/Profile.js"
import UpdateProfile from './components/User/UpdateProfile.js';
import UpdatePassword from './components/User/UpdatePassword.js';
import ForgotPassword from './components/User/ForgotPassword.js';
import ResetPassword from './components/User/ResetPassword.js';
import MyUrls from './components/URL/MyUrls.js';
import UpdateUrl from "./components/URL/UpdateUrl.js"
import About from './components/layout/About/About.js';
import Contact from './components/layout/Contact/Contact.js';
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);
  


  return (
    
    <Router>
       <Header/>
       <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/login" element={<LoginSignUp/>} />
       <Route path="/account" element={isAuthenticated? <Profile/>:<Navigate to ="/login"/>} />
       <Route path="/me/update" element={isAuthenticated? <UpdateProfile/>:<Navigate to ="/login"/>} />
       <Route path="/password/update" element={isAuthenticated? <UpdatePassword/>:<Navigate to ="/login"/>} />
       <Route path="/urls/me" element={isAuthenticated? <MyUrls/>:<Navigate to ="/login"/>} />
       <Route path="/edit/:id" element={isAuthenticated? <UpdateUrl/>:<Navigate to ="/login"/>} />
       <Route path="/password/forgot" element={<ForgotPassword/>} /> 
        <Route path="/password/reset/:token" element={<ResetPassword/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
       </Routes>
       <Footer/>
    </Router>
  );
}

export default App;
