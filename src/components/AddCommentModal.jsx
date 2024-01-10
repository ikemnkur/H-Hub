// @src/components/Modal.jsx

import React from "react";
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { BiCommentAdd } from "react-icons/bi";

const CommentModal = ({ setIsOpen }) => {

  let modelName = "Example Model";

  function onlyNumberKey(evt) {
 
    // Only ASCII character in that range allowed
    let ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
  } 
  
  function postCommentAction() {

    // fetch("http://localhost:3000/posts/1", {
		// 	method: "POST",
		// 	body: JSON.stringify({
		// 		thread,
		// 		user_id: localStorage.getItem("_id"),
		// 		title: threadTitle,
		// 		media_link: ""
		// 	}),
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// })
		// 	.then((res) => res.json())
		// 	.then((data) => {
		// 		alert(data.message);
		// 		const newThread = data.data;
		// 		setThreadList((prev) => ([newThread, ...prev]));
		// 	})
		// 	.catch((err) => console.error(err));

    // fetch('http://localhost:3000/posts/1', {
    //   method: 'PUT',
    //   headers: {
    //      'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //      'ID': 2,
    //      'Name': 'John',
    //      'lastName': 'Doe'
    //   })
    // }).then(response => response.json())
    // .then(console.log(newPerson))
  }

  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Comments</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div style={{}}>

          </div>
          <div className={styles.modalContent}>
            Leave a comment on {modelName}'s post:
          </div>
          <div className={styles.modalContent}>
            <b>Type Comment: </b> <br />
            <textarea type="text" maxlength="512" size="90%" style={{width: 350, height:100}} />
             <button className={styles.addComment} onClick={() => setIsOpen(false)}>
                <BiCommentAdd style={{fontSize: 24}}/>
              </button>
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button className={styles.deleteBtn} onClick={postCommentAction}>
                Post Comment
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

export default CommentModal;