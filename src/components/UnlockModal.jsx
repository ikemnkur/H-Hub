// @src/components/Modal.jsx

import React from "react";
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";

const Modal = ({ setIsOpen, tips, modelName }) => {

  // let modelName = "Example Model";
  // modelName = modelname;
  let tipsAmount = parseInt(tips.split(':')[0].replace(';', ''));

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
            <h5 className={styles.heading}>Unlock Post</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>
            Are you sure you want to unlock: <b>{modelName}'s</b> post ?
          </div>
          <div className={styles.modalContent}>
            <b>Unlock Amount: </b><span>5</span>
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button className={styles.deleteBtn} onClick={() => setIsOpen(false)}>
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