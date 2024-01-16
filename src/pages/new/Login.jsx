import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;



    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
      localStorage.setItem("userEmail", email)
    } catch (err) {
      setErr(true);
    }
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.get(`http://localhost:3000/users`);
      const users = response.data;

      const user = users.find(u => u.email === email && u.password === password);
      

      if (user) {
        setLoginStatus('Login successful!');
        navigate("/")
        localStorage.setItem("userEmail", email)
        console.log("logging in: " + user.username);
        // Perform further actions here like redirecting to another page or storing user details in context/state
      } else {
        setLoginStatus('Invalid credentials');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoginStatus('Login failed. Please try again later.');
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Talk to Pamme</span>
      </div> <br></br>
      <div className="formWrapper">
        <span className="logo">H-Hub</span>
        <span className="title">Login</span>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="password" value={password} 
                onChange={e => setPassword(e.target.value)}/>
          <button>Sign in</button>
          {err && <span>Something went wrong</span>}
        </form>
        <div><b>{loginStatus}</b></div>
        <p>You don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
