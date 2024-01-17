// @src/components/Modal.jsx

import React from "react";
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";

import Post from "../components/Post";

const Modal = ({ setIsOpen, postData }) => {

  let modelName = "Example Model";



  let index = 0;
  

  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.postModal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>{postData.title}</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>

          <Post data={postData} showButtons={false}/>

        </div>
      </div>
    </>
  );
};

export default Modal;