import React from 'react'
import playStore from "../../../Images/playStore.png"
import appStore from "../../../Images/appStore.png"
import logo from "../../../Images/logo.png"
import "./Footer.css"
const Footer = () => {
  return (
    <footer id='footer'>
        <div className="leftFooter">
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download App for Android and IOS Mobile phone</p>
            <img src={playStore} alt="playstore" />
            <img src={appStore} alt="appstore" />
        </div>
        <div className="midFooter">
            <img src={logo} alt="" />
            <p>High Quality is our first priority</p>
            <p>Copyrights 2023 &copy; Ashutosh</p>

        </div>

        <div className="rightFooter">
            <h4>Follow Us</h4>
            <a href="http://instagram.com">Instagram</a>
            <a href="http://Youtube.com">Youtube</a>
            <a href="http://facebook.com">Facebook</a>
        </div>

    </footer>
  )
}

export default Footer
