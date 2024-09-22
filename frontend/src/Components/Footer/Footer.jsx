// import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { MdCall, MdEmail, MdHome, MdModeComment } from "react-icons/md";
import { FaLinkedin, FaGithub, FaHeart } from "react-icons/fa";
import './Footer.css'

const footer = () => {
  return (
    <div className="footer">
      <div className="footerContainer">
        <div className="footerList">
          <h4>SHOPPING</h4>
          <ul>
            <li>
              <Link to="/">Take me home !</Link>
            </li>
            <li>
              <Link>All Products</Link>
            </li>
            <li>
              <Link>Men</Link>
            </li>
            <li>
              <Link>Women</Link>
            </li>
            <li>
              <Link>Kids</Link>
            </li>
            <li>
              <Link>Beauty</Link>
            </li>
          </ul>
        </div>
        <div className="footerList">
          <h4>USEFUL LINKS</h4>
          <ul>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/admin">Admin Panel</Link>
            </li>
            <li>
              <Link to="/bag">Bag</Link>
            </li>
            <li>
              <Link to="/wishlist">Wishlist</Link>
            </li>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </div>
        <div className="footerList">
          <h4>KEEP IN TOUCH</h4>
          <ul>
            <li>
              <p>
                <MdCall className="footerIcon" /> +91-9507750615
              </p>
            </li>
            <li>
              <p>
                <MdEmail className="footerIcon" />
                pkryadav9304@gmail.com
              </p>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/callmeprinceyadav"
                target="blank"
              >
                <FaLinkedin className="footerIcon" />
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://github.com/callmeprinceyadav" target="blank">
                <FaGithub className="footerIcon" />
                Github
              </a>
            </li>
            
            <li>
              <a href="https://checkportfolioprince.netlify.app/" target="blank">
                <MdHome className="footerIcon" />
                Portfolio
              </a>
            </li>
            <li>
              <p>
                <MdModeComment className="footerIcon" />
                Post and Blogs
              </p>
            </li>
          </ul>
        </div>
        <div className="footerList">
          <h4>ABOUT ME</h4>
          <ul>
            <li>
              <p>Prince Kumar</p>
            </li>
    
            <li>
              <p>MERN Stack Developer</p>
            </li>
            
            
          </ul>
        </div>
      </div>
    </div>
  );
};

export default footer;