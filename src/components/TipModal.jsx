// @src/components/Modal.jsx

import React from "react";
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { useState, useRef } from "react";
import axios from "axios";

const Modal = ({ setIsOpen, tips, modelName }) => {

  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
  const tipInputRef = useRef(null);
  // let modelName = "Example Model";
  // modelName = modelname;

  // console.log("")

  console.log("Tips: ", tips)

  // Sort the tips array by highest tipAmount
  tips.sort((a, b) => b.tipAmount - a.tipAmount);


  let index = 0;

  function sortStringByNumbers(input) {
    // Split the string into an array of key-value pairs
    const pairs = input.split(';').filter(pair => pair.trim() !== '');

    // Split each pair into key and value, and parse the value as a number
    const keyValuePairs = pairs.map(pair => {
      const [key, value] = pair.split(':');
      return { key: key.trim(), value: parseInt(value, 10) };
    });

    // Sort the array based on the numeric value
    keyValuePairs.sort((a, b) => b.value - a.value);

    // Convert the sorted pairs back to a string or return the sorted array
    // If you need a string output, uncomment the next line:
    // return keyValuePairs.map(pair => `${pair.key}:${pair.value}`).join('; ');

    return keyValuePairs;
  }

  function isNumeric(value) {
    return /^\d+$/.test(value);
  }

  async function sendTip() {

    if (!isNumeric(tipInputRef.current.value)) {
      // if not a number
      alert("Invaild input: enter a numeric value")
      return -1;
    }

    let tip = parseInt(tipInputRef.current.value);

    setIsOpen(false)
    let pi = tips[0].postId
    let newTip = {
      "postId": pi,
      "tipUserId": currentUser.id,
      "tipUsername": currentUser.username,
      "tipAmount": tip
    }
    
    try {
      getCurrentUserData();
      let temp = currentUser
      temp.coins = temp.coins - tip;
      if (temp.coins < 0) {
        // let str = "Insufficent coins:"+ temp.coins+ " more are needed";
        let str = "Insufficent coins. "
        alert(str)
        return 0;
      }
      const response = await axios.post(`http://localhost:4000/tips`, newTip);
      console.log('Item updated:', response.data);
      handlePostUpdate(temp)
      setIsOpen(false);
      tips.push(newTip)
    } catch (error) {
      console.error('Error updating item:', error);
    }
  }

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

  function numbersOnly() {
    tipInputRef.current.value = tipInputRef.current.value.replace(/[^0-9]/g, '');
    console.log(tipInputRef.current.value)
  }

  function onlyNumberKey(evt) {

    // Only ASCII character in that range allowed
    let ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
      return false;
    return true;
  }


  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.tipModal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Tips</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>

          <div style={{ border: "2px solid black", borderRadius: 5, width: "90%", height: 100, margin: "auto", overflowY: "scroll", backgroundColor: "lightgray" }}>
            {


              tips.map((tip, index) => (
                <div key={index} style={{ display: "flex", padding: 2, margin: 3, color: "black", backgroundColor: "white", borderRadius: 5 }}>
                  <b style={{ marginLeft: "0" }}>#{index + 1}. </b>
                  <b style={{ margin: "auto" }}>
                    {tip.tipUsername} <span style={{ color: "gray" }}> tipped </span>
                    <b style={{ color: "gold", backgroundColor: "black", padding: "0px 7px", margin: "2px", borderRadius: 5 }}>
                      {tip.tipAmount}
                    </b>
                    <span> coins!!! </span>
                  </b>
                </div>
              ))

            }
          </div>
          <div className={styles.modalContent}>
            Want to tip: <b>{modelName}</b> ?
          </div>
          <div className={styles.modalContent}>
            <b>Tip Amount: </b>
            <input ref={tipInputRef} type="text" onKeyDown={() => numbersOnly()} maxLength="2" size="50%" />
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button className={styles.deleteBtn} onClick={() => sendTip()}>
                Send Tip
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