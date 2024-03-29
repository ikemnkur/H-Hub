// @src/components/Modal.jsx

import React from "react";
import axios from "axios";
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { BiCommentAdd } from "react-icons/bi";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const { v4 : uuid } = require("uuid");

const CommentModal = ({ setIsOpenAddCommentModal, modelName, postData }) => {

  // let modelName = "Example Model";

  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
  // const modelName = postData.modelName;
  
  async function getCurrentUserData() {

    const response = await axios.get(`http://localhost:4000/users?id=${currentUser.id}`);
    const data = response.data[0];
    console.log("Current User Data: ", data)
    setCurrentUser(data)

  }

  getCurrentUserData();

  const newComment = useRef(null)
  
  const handlePostUpdate = async (id, newUserComment) => {
    try {
        // console.log("PD: ", postData)

        const response = await axios.post(`http://localhost:4000/comments?id=${id}`, newUserComment);
        console.log('Item updated:', response.data);
    } catch (error) {
        console.error('Error updating item:', error);
    }
  };

  function postCommentAction() {

    console.log("Post Comment");
    // postData.comments += " " + localStorage.getItem("username")+": " + newComment.current.value + ", " + 0+ ";";
    let id = uuid();
    let newUserComment = {
      "id": id,
      "username": currentUser.username,
      "text": newComment.current.value,
      "likes": 0,
      "postId": postData.id
    }
    // getPost
    console.log("New Comment: ", newUserComment)
    handlePostUpdate(id, newUserComment);
    setIsOpenAddCommentModal(false)
  }

  // function toggleIsOpen(){
    // setIsOpenAddCommentModal(false)
    //  console.log('isOpen: ' + isOpen)
  // }

  // useEffect(() => {
    
  //   isOpen(setIsOpen)
  // },[])

  return (
    <>
      {
        <div>
          <div className={styles.darkBG} onClick={() => setIsOpenAddCommentModal(false)} />
          <div className={styles.centered}>
            <div className={styles.addCommentModal}>
              <div className={styles.modalHeader}>
                <h5 className={styles.heading}>Add a Comment</h5>
              </div>
              <button className={styles.closeBtn} onClick={() => setIsOpenAddCommentModal(false)}>
                <RiCloseLine style={{ marginBottom: "-3px" }} />
              </button>
              <div className={styles.modalContent}>
                Leave a comment on {modelName}'s post:
              </div>
              <div className={styles.modalContent}>
                <b style={{margin: 3}}>Type Comment: </b> <br />
                <textarea ref={newComment} type="text" maxLength="512" size="90%" style={{ width: 350, height: 100, margin: 5 }} />
                {/* <button className={styles.addComment} onClick={() => setIsOpen(false)}>
                  <BiCommentAdd style={{ fontSize: 24 }} />
                </button> */}
              </div>
              <div className={styles.modalActions}>
                <div className={styles.actionsContainer}>
                  <button className={styles.deleteBtn} onClick={postCommentAction}>
                    Post Comment
                  </button>
                  <button
                    className={styles.cancelBtn}
                    onClick={() => setIsOpenAddCommentModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      }
    </>
  );
};

export default CommentModal;