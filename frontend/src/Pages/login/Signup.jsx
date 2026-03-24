import { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../../api/axios";

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    pass: "",
  });

  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();
  const toast = useToast();

  const handleUserDetails = (e) => {
    const { name, value } = e.target;

    setUserDetails((userDetails) => ({
      ...userDetails,
      [name]: value,
    }));
  };

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    try {
      let response = await api.post(
        "/users/register",
        userDetails
      );
      console.log(response);

      if (response.data.msg === "New user has been created") {
        toast({
          title: "Registration Successful",
          description: "You have successfully registered",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        navigate("/login");
      } else if (response.data.error === "User with this email already exists") {
        toast({
          title: "Email Already Registered",
          description: "A user with this email already exists",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } else if (response.data.error === "Invalid password format") {
        toast({
          title: "Invalid Password",
          description: "Your password should have 1 Uppercase and 1 Lowercase Letter, 1 Special Character, 1 Number, and at least 8 Characters",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.log(error.message);
      toast({
        title: "Registration Failed",
        description: "An error occurred while registering",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <div className="signup">
      <div className="signupContainer">
        <div className="signupImage">
          <img
            src="https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/2023/10/29/9610df61-3b15-4615-a3c3-d92de434ba441698563319224-Flat_200--1-.jpg"
            alt="Signup Banner"
          />
        </div>
        <div className="signupDetail">
          <div>
            <h3>Signup <span>to Myntra</span></h3>
          </div>
          <div>
            <form onSubmit={handleRegisterUser}>
              <input
                className="signupInput"
                name="username"
                value={userDetails.username}
                onChange={handleUserDetails}
                type="text"
                required
                placeholder="Full Name"
              />
              <input
                className="signupInput"
                name="email"
                value={userDetails.email}
                onChange={handleUserDetails}
                type="email"
                required
                placeholder="Email Address"
              />
              <div className="passwordContainer">
                <input
                  className="signupInput"
                  name="pass"
                  value={userDetails.pass}
                  onChange={handleUserDetails}
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
                <span
                  className="passwordToggleIcon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <p>
                By signing up, I agree to the <span style={{color:"#ff3f6c",fontWeight:"700"}}>Terms of Use</span> & <span style={{color:"#ff3f6c",fontWeight:"700"}}>Privacy Policy</span>
              </p>
              <button type="submit" className="signupBtn">CONTINUE</button>
              <p style={{marginTop:"30px"}}>
                Already have an account? <Link to="/login" style={{color:"#ff3f6c",fontWeight:"700",textDecoration:"none"}}>Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
