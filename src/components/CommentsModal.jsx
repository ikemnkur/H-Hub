// @src/components/Modal.jsx

import React, {useRef, useState} from "react";
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { BiCommentAdd } from "react-icons/bi";
import AddCommentModal from "./AddCommentModal";

const CommentModal = ({ setIsOpen, data }) => {

  let modelName = "Example Model";

  let comments = data.split(";")

  const [isOpenAddComments, setIsOpenAddComments] = useState(false);

  function onlyNumberKey(evt) {
 
    // Only ASCII character in that range allowed
    let ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
  } 
  
  let votes;

  function likeCommentAction() {

  };

  function dislikeCommentAction() {

  };

  const commentUsernameRef = useRef(null);
  const likesNumberRef = useRef(null);
  const commentTextRef = useRef(null);
  const downvoteRef = useRef(null);
  const upvoteRef = useRef(null);
  
  return (
    <>
      <AddCommentModal setIsOpen={isOpenAddComments}/>
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
                let name, text, likes
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
                      <div style={{margin: 2}} >
                        <b ref={commentUsernameRef} style={{ margin: 5 }}>{name}: </b>
                        <span style={{ marginLeft: "auto", float: "right" }}>
                          <button ref={upvoteRef} onClick={likeCommentAction} style={{ margin: 5 }}>+</button>
                          <span style={{ margin: 5 }} ref={likesNumberRef}>{likes}</span>
                          <button ref={downvoteRef} onClick={dislikeCommentAction} style={{ margin: 5 }}>-</button>
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
              <button className={styles.deleteBtn} onClick={() => setIsOpenAddComments(true)}>
                Add Comment
              </button>
              <button
                className={styles.cancelBtn}
                onClick={ () => setIsOpen(false)}
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