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

  var currentdate = new Date();
  var msgdate = new Date(message.datetime);

  var datetime;
  var Difference_In_Time = currentdate.getTime() - msgdate.getTime();
  var diffInDays = Math.round(Difference_In_Time / (1000 * 3600 * 24));

  if (diffInDays > 0) {
    datetime = msgdate.getDate() + "/"
      + (msgdate.getMonth() + 1) + "/"
      + msgdate.getFullYear()
  } else {
    datetime =
      ((msgdate.getHours() < 10) ? "0" : "") + msgdate.getHours() + ":"
      + ((msgdate.getMinutes() < 10) ? "0" : "") + msgdate.getMinutes() + ":"
      + ((msgdate.getSeconds() < 10) ? "0" : "") + msgdate.getSeconds();
  }

  // datetime = msgdate.getDate() + "/"
  //           + (msgdate.getMonth()+1)  + "/" 
  //           + msgdate.getFullYear() + " @ "  
  //           + ((msgdate.getHours() < 10) ? "0" : "")  + msgdate.getHours()+ ":"  
  //           + ((msgdate.getMinutes() < 10) ? "0" : "") + msgdate.getMinutes() + ":" 
  //           + ((msgdate.getSeconds() < 10) ? "0" : "") + msgdate.getSeconds();

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
          <span style={{fontSize: 10}}>{(diffInDays > 0)? "Date:": "Today:"} {datetime}</span>
        {/* </div> */}
      </div>
      
      
    </div>
  );
};

export default Message;
