// @src/components/Modal.jsx

import React from "react";
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";

const Modal = ({ setIsOpen, modelName }) => {

  // let modelName = "Example Model";
  // modelName = modelname;
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
        <div className={styles.subscribeModal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Subscribe</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>
            Do you want to subscribe to: <b>{modelName}</b>?<br />
            <span> For 30 days, you can subscribe to {modelName}'s exculsive posts. </span>
          </div>
          <div className={styles.modalContent}>
            <b>Subscribe Amount: </b> <span>50</span>
            <br />
            
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button className={styles.deleteBtn} onClick={() => setIsOpen(false)}>
                Subscribe
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