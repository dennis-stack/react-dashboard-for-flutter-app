import "./new.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const New = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields have been filled
    if (!firstName || !lastName || !phoneNo || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Check if the password is at least 8 characters
    if (password.length < 8) {
      toast.error("Password should be at least 8 characters long");
      return;
    }

    // Check if the phone number is in the correct format
    const phoneRegex = /^07\d{8}$/;
    if (!phoneNo.match(phoneRegex)) {
      toast.error("Phone number should start with 07 and be 10 digits long");
      return;
    }

    // Create a user object with the required fields
    const user = {
      firstName,
      lastName,
      phoneNo,
      email,
      password,
    };

    // Make a POST request to the PHP registration script
    const response = await fetch("http://localhost/pharmacy_app_api/admin/add_user.php", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // User registered successfully
      setFirstName("");
      setLastName("");
      setPhoneNo("");
      setEmail("");
      setPassword("");
      navigate("users");
      toast.success("User registered successfully");
    } else {
      const data = await response.json();
      if (data.message === "Email already exists.") {
        toast.error("An account with this email already exists");
      } else if (data.message === "Please fill in all fields") {
        toast.error("Please fill in all fields");
      } else if (data.message === "Password should be at least 8 characters long") {
        toast.error("Password should be at least 8 characters long");
      } else if (data.message === "Phone number should start with 07 and be 10 digits long") {
        toast.error("Phone number should start with 07 and be 10 digits long");
      } else {
        toast.error("Error registering user");
      }
    }
  };

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1 className="add">Add User</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label>First Name</label>
                <input
                  type="text"
                  value={firstName}
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Phone Number</label>
                <input
                  type="text"
                  value={phoneNo}
                  placeholder="Phone Number"
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default New;
