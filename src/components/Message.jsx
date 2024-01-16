import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message, data }) => {
  // const { currentUser } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
  // const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.from === currentUser.username && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.from === currentUser.username
              ? currentUser.profileUrl
              : data.modelProfileImg
          }
          alt=""
        />
        
      </div>
      <div className="messageContent">
        <p>{message.messageText}</p>
        {message.img && <img src={message.img} alt="" />}
        {/* <div> */}
          <span style={{fontSize: 10}}>TIme: {message.datetime}</span>
        {/* </div> */}
      </div>
      
      
    </div>
  );
};

export default Message;
