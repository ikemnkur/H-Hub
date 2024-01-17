import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Model from "./pages/Model";
import ChatPage from "./pages/ChatPage";
import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
// import { Navigate } from "react-router-dom";


function App() {
  // const { currentUser } = useContext(AuthContext);

  // const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));

  // useEffect(() => {
  //   const temp = localStorage.getItem("currentUser")
  //   console.log("CU: ", temp)
  //   if(temp === "null" || temp === "[object Object]")
  //     navigate("/login")
  //   // getAllPosts();
  // })
  

  const ProtectedRoute = ({ children }) => {
    // if ( localStorage.getItem("currentUser") === "null") {
    //   // alert(`currentUser === "null"`)
    //   return <Navigate to="/login" />;
    // }

    return children
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="model"
            element={
              <ProtectedRoute>
                <Model />
              </ProtectedRoute>
            }
          />
          <Route
            path="chat"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />
           <Route
            path="chat/:id"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
