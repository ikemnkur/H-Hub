// @src/components/Modal.jsx

import React, { useRef, useState } from "react";
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { BiCommentAdd } from "react-icons/bi";
import AddCommentModal from "./AddCommentModal";


const CommentModal = ({ setIsOpen, data, modelName, postData }) => {

  // let modelName = "Example Model";
  let commentIdNumber = 1;
  let comments = data.split(";")

  // const [isOpenAddComments, setIsOpenAddComments] = useState(false);
  const [addCommentModal, setAddCommentModal] = useState(false);

  function onlyNumberKey(evt) {

    // Only ASCII character in that range allowed
    let ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
      return false;
    return true;
  }

  let votes;

  function likeCommentAction(id) {
    // commentsArray = [comments.length]
    let num = id.replace("comment#", "");
    let number = parseInt(num)
    try {
       document.getElementById(id).innerText = number+1
    } catch (error) {
      console.log("task failed")
    }
   

  };

  function dislikeCommentAction(id) {
    let num = id.replace("comment#", "");
    let number = parseInt(num)
     try {
       document.getElementById(id).innerText = number-1
    } catch (error) {
      console.log("task failed")
    }
  };

  const commentUsernameRef = useRef(null);
  const likesNumberRef = useRef(null);
  const commentTextRef = useRef(null);
  const downvoteRef = useRef(null);
  const upvoteRef = useRef(null);

  let commentsArray;

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

          <div style={{ background: "grey", padding: 5, width: "95%", margin: "auto" }}>
            {comments.map((comment) => {
              let name, text, likes;
              let idText = "comment#" + commentIdNumber
              if (comment.length > 0) {
                name = comment.split(":")[0];
                text = comment.split(":")[1].split(",")[0];
                likes = comment.split(":")[1].split(",")[1];

                // console.log("Comments: " + comment)
                // console.log("Comment Name: " + comment.split(":")[0])
                // console.log("Comment Text: " + comment.split(":")[1].split(",")[0])
                // console.log("Comment Likes: " + comment.split(":")[1].split(",")[1])

                return (
                  // <div>
                  //   Applicant name:  {data.name}
                  // </div>
                  <div style={{ background: "lightgrey", padding: 5, margin: 3, color: "black", borderRadius: 10, fontSize: 14 }} >
                    {/* <div style={{ display: "flex" }} > */}
                    <div style={{ margin: 2 }} >
                      <b ref={commentUsernameRef} style={{ margin: 5 }}>{name}: </b>
                      <span style={{ marginLeft: "auto", float: "right" }}>
                        <button ref={upvoteRef} onClick={() => likeCommentAction(idText)} style={{ margin: 5 }}>+</button>
                        <span id={idText} style={{ margin: 5 }} ref={likesNumberRef}>{likes}</span>
                        <button ref={downvoteRef} onClick={() => dislikeCommentAction(idText)} style={{ margin: 5 }}>-</button>
                      </span>
                    </div>
                    <div style={{ margin: 3 }}>
                      <span ref={commentTextRef} style={{ width: "50%", fontSize: 14 }}>{text}</span>
                    </div>
                  </div>
                )
              }
            })
            }


          </div>

          <div className={styles.modalContent}>

          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button className={styles.deleteBtn}
                onClick={() => {
                  // setIsOpenAddComments(true);
                  setAddCommentModal(true);
                  // setIsOpen(false);
                }}>
                Add Comment
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() =>  setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      {addCommentModal && <AddCommentModal setIsOpenAddCommentModal={setAddCommentModal} modelName={modelName} postData={postData}/>}
    </>
  );
};

export default CommentModal;