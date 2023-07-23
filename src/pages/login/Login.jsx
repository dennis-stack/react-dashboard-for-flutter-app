import "./login.scss";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // Send the email and password to the PHP backend using an HTTP POST request
    fetch("http://localhost/pharmacy_app_api/admin/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Login successful, navigate to the appropriate page
          dispatch({ type: "LOGIN", payload: data.admin });
          navigate("/");
        } else {
          // Login failed, display error toast
          if (data.error === "empty-fields") {
            toast.error("Please enter both email and password.");
          } else if (data.error === "invalid-email") {
            toast.error("Please enter a valid email.");
          } else if (data.error === "admin-not-found") {
            toast.error("Admin account not found.");
          } else if (data.error === "wrong-password") {
            toast.error("Incorrect password.");
          } else {
            toast.error("An error occurred.");
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("An error occurred. Please try again later.");
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="heading" style={{borderBottom: '0.5px solid rgb(231, 228, 228)', height: '50px', alignContent: 'center'}}><h1 style={{color: 'blue', textAlign: 'center'}}>Pharmacy App Dashboard</h1></div>
      <div className="login">
        <form onSubmit={handleLogin}>
          <h1 className="title">Login</h1>
          <div className="input-container">
            <input
              type="email"
              className="email"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <AiFillEyeInvisible style={{ color: "red" }} />
              ) : (
                <AiFillEye style={{ color: "blue" }} />
              )}
            </span>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
