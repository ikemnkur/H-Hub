import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
// import { ChatContext } from "../context/ChatContext";
// import { db } from "../firebase";
import Message from "./Message";

const Messages = ({data}) => {
  
  // const [messages, setMessages] = useState([]);
  // const { data } = useContext(ChatContext);

  // useEffect(() => {
  //   const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
  //     doc.exists() && setMessages(doc.data().messages);
  //   });

  //   return () => {
  //     unSub();
  //   };
  // }, [data.chatId]);

  // console.log(messages)
  console.log("Msg Comp. Data: ", data)

  const [messages, setMessages] = useState(data.messages);

  useEffect(() => {
    setInterval(() => {
       setMessages(data.messages)
    }, 1000);
   
  }, [messages])
  

  
  // const { data } = useContext(ChatContext);

  // useEffect(() => {
  //   const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
  //     doc.exists() && setMessages(doc.data().messages);
  //   });

  //   return () => {
  //     unSub();
  //   };
  // }, [data.chatId]);
  // console.log("Data:", data)
  // console.log("Messages:",messages)

  //  //Updated chat page when new chat is sent
  //  useEffect(() => {
  //   setCurrentChat(newChat)
  //   sendChat()
  // }, [newChat]);

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} data={data}/>
      ))}
    </div>
  );
};

export default Messages;
