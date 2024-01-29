// @src/components/Modal.jsx

import React from "react";
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";

const Modal = ({ setIsOpen, tips, modelName }) => {

  // let modelName = "Example Model";
  // modelName = modelname;

  console.log("")

  console.log("Tips: ", tips)

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

  

  let allTips = sortStringByNumbers(tips);

  // let tipsAmount = parseInt(tips.split(':')[0].replace(';', ''));

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
            
            allTips.map((KV) => {
              index++;
              return (
                <div style={{ display: "flex", padding: 2, margin: 3, color: "black", backgroundColor: "white", borderRadius: 5 }}>
                  <b style={{ marginLeft: "0" }}>#{index}. </b> <b style={{ margin: "auto" }}> {KV.key} <span> tipped </span> <b style={{ color: "gold", backgroundColor: "black", padding:"0px 7px", margin: "2px", borderRadius: 5 }}>{KV.value}</b><span> coins!!! </span></b>
                </div>
              )
            })}
          </div>
          <div className={styles.modalContent}>
            Want to tip: <b>{modelName}</b> ?
          </div>
          <div className={styles.modalContent}>
            <b>Tip Amount: </b>
            <input type="text" onKeyDown={(e) => { return onlyNumberKey(e) }} maxLength="2" size="50%" />
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button className={styles.deleteBtn} onClick={() => setIsOpen(false)}>
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