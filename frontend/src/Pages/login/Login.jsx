import { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../Contexts/AuthContext";
import { useToast } from "@chakra-ui/react";
import "./Login.css";
import api from "../../api/axios";

const Login = () => {
  const [userDetails, setUserDetails] = useState({ email: "", pass: "" });
  const [showPassword, setShowPassword] = useState(false); 
  const { login } = useContext(Context);
  const toast = useToast();
  const navigate = useNavigate();

  const handleUserDetails = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/users/login",
        userDetails
      );
      console.log(response.data.ACCESS_TOKEN);
      console.log(response);
      if (response.data.msg === "Login Successful") {
        login(response.data.user);
        // alert("Login Successful ")
        toast({
          title: "Login Successful",
          description: "You have been logged in successfully",
          status: "success",
          duration: 5000,
          position: "top",
        });
        navigate("/");
      } else if (response.data.msg === "Register first or Wrong crendential") {
        toast({
          title: "Not Register",
          description: "Please register first or enter correct credentials",
          status: "error",
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response.data === "User not found") {
        toast({
          title: "User not found",
          description: "Please signup first or enter correct credentials",
          status: "error",
          isClosable: true,
          position: "top",
        });
      }
    }
  };

  return (
    <div className="login">
      <div className="loginContainer">
        <div className="loginImage">
          <img
            src="https://media.istockphoto.com/id/1305268276/vector/registration-abstract-concept-vector-illustration.jpg?s=612x612&w=0&k=20&c=nfvUbHjcNDVIPdWkaxGx0z0WZaAEuBK9SyG-aIqg2-0="
            alt=""
          />
        </div>
        <div className="loginDetail">
          <div>
            <h3>Login <span>or Signup</span></h3>
          </div>
          <div className="formInput">
            <form onSubmit={handleLoginUser}>
              <input
                className="loginInput"
                name="email"
                value={userDetails.email}
                onChange={handleUserDetails}
                type="email"
                required
                placeholder="Mobile Number or Email"
              />
              <div className="passwordContainer">
                <input
                  className="loginInput"
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
                By continuing, I agree to the <span style={{color:"#ff3f6c",fontWeight:"700"}}>Terms of Use</span> & <span style={{color:"#ff3f6c",fontWeight:"700"}}>Privacy Policy</span>
              </p>
              <button type="submit" className="loginBtn">CONTINUE</button>
              <p>
                Have trouble logging in? <span style={{color:"#ff3f6c",fontWeight:"700"}}>Get help</span>
              </p>
              <p style={{marginTop:"30px"}}>
                New to Myntra? <Link to="/signup" style={{color:"#ff3f6c",fontWeight:"700",textDecoration:"none"}}>Create an account</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
