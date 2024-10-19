// import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
// import wishlist from "../../assets/wishimg.jpg"
const login = () => {
  return (
    <div className="notLogin">
      <h3>PLEASE LOG IN FIRST !!</h3>
      <img src="https://media.istockphoto.com/id/1305268276/vector/registration-abstract-concept-vector-illustration.jpg?s=612x612&w=0&k=20&c=nfvUbHjcNDVIPdWkaxGx0z0WZaAEuBK9SyG-aIqg2-0=" alt="img" />
      <Link to="/login" >
        <button className="btnLog">LOGIN</button>
      </Link>
    </div>
  );
};

export default login;