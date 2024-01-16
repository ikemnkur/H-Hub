import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const email = e.target[0].value;
  //   const password = e.target[1].value;



  //   try {
  //     await signInWithEmailAndPassword(auth, email, password);
  //     navigate("/")
  //     localStorage.setItem("userEmail", email)
  //   } catch (err) {
  //     setErr(true);
  //   }
  // };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');

  const passwordField =  useRef(null);
  const showButton =  useRef(null);

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      console.log("Term: ", email)
      const emailResponse = await axios.get(`http://localhost:4000/users?email=${email}`);
      const userByEmail = emailResponse.data;
      const usernameResponse = await axios.get(`http://localhost:4000/users?username=${email}`);
      const userByUsername = usernameResponse.data;

      localStorage.setItem("userByEmail", JSON.stringify(userByEmail[0])); 

      let emailuser//= userByEmail[0].email//.find(u => u.email === email && u.password === password);
      let user// = userByUsername[0].username//.find(u => u.username === email && u.password === password);
      
      try {
        emailuser = userByEmail[0].email//.find(u => u.email === email && u.password === password);
        // user = userByUsername[0].username//.find(u => u.username === email && u.password === password);
      } catch (error) {
        
      }

      try {
        // emailuser = userByEmail[0].email//.find(u => u.email === email && u.password === password);
        user = userByUsername[0].username//.find(u => u.username === email && u.password === password);
      } catch (error) {
        
      }
      
      

      console.log("emailUser: ", emailuser);
      console.log("User: ", user);

      if (user === email || emailuser === email) {
        setLoginStatus('Login successful!');

        if (email.includes("@")) {
          // localStorage.setItem("currentUser", emailuser);  
          localStorage.setItem("currentUser", JSON.stringify(userByEmail[0])); 
          console.log("logging in by email: " + emailuser.username);
        } else {
          // localStorage.setItem("currentUser", user);
          localStorage.setItem("currentUser", JSON.stringify(userByUsername[0])); 
          console.log("logging in by username: " + user.username);
        }
        
        
        console.log("logging in: " + user.username);
        navigate("/")
        // Perform further actions here like redirecting to another page or storing user details in context/state
      } else {
        setLoginStatus('Invalid credentials');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoginStatus('Login failed. Please try again later.');
    }
  };

  function showPassword() {
    if (passwordField.current.type !== "text"){
      passwordField.current.type = "text";
      showButton.current.innerHTML = "Hide";
    } else {
      passwordField.current.type = "password";
      showButton.current.innerHTML = "Show";
    }
      
  } 

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Talk to Pamme</span>
      </div> <br></br>
      <div className="formWrapper">
        <span className="logo">H-Hub</span>
        <span className="title">Login</span>
        <form onSubmit={handleLogin}>
          <input style={{width: "90%"}} type="text" placeholder="email or username" value={email} onChange={e => setEmail(e.target.value)} />
          <div style={{display:"flex"}}>
            <input ref={passwordField} type="password" placeholder="password" value={password}
            onChange={e => setPassword(e.target.value)} />
            <button onClick={showPassword} ref={showButton} style={{}}>Show</button> 
          </div>
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
