// @src/components/Modal.jsx

import React, {useState} from "react";
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import axios from "axios";
// import { useState } from "react";

const Modal = ({ setIsOpen, tips, postData, cost, lockStatus }) => {

  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
  const modelName = postData.modelName;
  
  async function getCurrentUserData() {

    const response = await axios.get(`http://localhost:4000/users?id=${currentUser.id}`);
    const data = response.data[0];
    console.log("Current User Data: ", data)
    setCurrentUser(data)

  }

  const handlePostUpdate = async (newUserData) => {
    try {
      // console.log("PD: ", postData)
      const response = await axios.put(`http://localhost:4000/users/${currentUser.id}`, newUserData);
      console.log('Item updated:', response.data);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };


  // let modelName = "Example Model";
  // modelName = modelname;
  // let tipsAmount = parseInt(tips.split(':')[0].replace(';', ''));

  function unlockPost() {

    getCurrentUserData();
    let temp = currentUser
    temp.coins = temp.coins - cost;
    temp.unlockedPosts += ", " + postData.id;
    handlePostUpdate(temp)
    setIsOpen(false);
  
  } 
  
  
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.unlockModal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Unlock Post</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>
            Are you sure you want to unlock: <b>{modelName}'s</b> post ?
          </div>
          <div className={styles.modalContent}>
            <b>Unlock Amount: </b><span>{cost}</span>
          </div>
          <div style={{textAlign: "center"}}>
            {
            <span style={{color:"red", margin: 10}}>!!!!Error Insufficient Coins!!!!</span>
            }
            {
            <span style={{color:"green", margin: 10}}>!!!Post Unlocked!!!</span>
            }
          </div>
          
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button className={styles.deleteBtn} onClick={() => {unlockPost()}}>
                Unlock
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;