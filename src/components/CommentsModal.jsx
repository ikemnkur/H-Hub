// @src/components/Modal.jsx

import React, { useRef, useState, useEffect } from "react";
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { BiCommentAdd } from "react-icons/bi";
import AddCommentModal from "./AddCommentModal";
import axios from "axios";


const CommentModal = ({ setIsOpen, postComments, modelName, postData }) => {

  // let modelName = "Example Model";
  // let commentIdNumber = 1;
  // let comments = data.split(";")


  // const [isOpenAddComments, setIsOpenAddComments] = useState(false);
  const [addCommentModal, setAddCommentModal] = useState(false);
  localStorage.setItem("comments", JSON.stringify(postComments))
   
  const handlePostUpdate = async (id, updatedComment) => {
    try {
        // console.log("PD: ", postData) users/${currentUser.id}
        const response = await axios.put(`http://localhost:4000/comments/${id}`, updatedComment);
        console.log('Item updated:', response.data);
    } catch (error) {
        console.error('Error updating item:', error);
    }
  };

  // function voteCommentAction() {

  //   console.log("Post Comment");
  //   // postData.comments += " " + localStorage.getItem("username")+": " + newComment.current.value + ", " + 0+ ";";
  //   // let id = uuid();
    
      
    
  //   // getPost
  //   console.log("Voted on Comment: ", newUserComment)
  //   handlePostUpdate(id, newUserComment);
  // }

  let commentIndex = 0;

  function likeCommentAction(id) {
    let num = id.replace("comment#", "");
    // let idNum = parseInt(num);
    const comment = getCommentById(num)[0];
    console.log("like comment: ", comment);
    let updatedComment = comment;
    console.log("CI: ", commentIndex)
    updatedComment.likes = comment.likes+1;
    handlePostUpdate(num, updatedComment);
    try {
      if (parseInt(document.getElementById(id).innerText) < parseInt(comment.likes))
        document.getElementById(id).innerText = parseInt(comment.likes)
      else
        document.getElementById(id).innerText = parseInt(comment.likes) + 1
    } catch (error) {
      console.log("like task failed")
    }
  };

  function getCommentById(idNum) {
    let i = 0
    return postComments.filter(
      function (postComments) { 
        // console.log("idNum: ", idNum)
        i++;
        
        if (postComments.id === idNum ){
          commentIndex = i
        }
        return postComments.id === idNum 
      }
    );
  }

  function dislikeCommentAction(id) {
    let num = id.replace("comment#", "");
    // let idNum = parseInt(num);
    const comment = getCommentById(num)[0];
    console.log("dislike comment: ", comment);
    let updatedComment = comment;
    console.log("CI: ", commentIndex)
    updatedComment.likes = comment.likes-1;
    handlePostUpdate(num, updatedComment);
    try {
      if (parseInt(document.getElementById(id).innerText) < parseInt(comment.likes))
        document.getElementById(id).innerText = parseInt(comment.likes);
      else
        document.getElementById(id).innerText = parseInt(comment.likes) - 1;
    } catch (error) {
      console.log("dislike task failed")
    }
  };

  const commentUsernameRef = useRef(null);
  const likesNumberRef = useRef(null);
  const commentTextRef = useRef(null);
  const downvoteRef = useRef(null);
  const upvoteRef = useRef(null);

  let commentsArray;

  async function getComments(){
    const response = await axios.get(`http://localhost:4000/comments?postId=${postData.id}`);
    console.log("Post Comments Data: ", response.data);
    const data = response.data;
    commentsArray = data;
  }

  useEffect(() => {
    getComments();
    
    return () => {
      
    }
  }, [addCommentModal])
  

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
            {postComments.map((comment) => {
              let name, text, likes;
              let idText = "comment#" + comment.id
              console.log("creating comment: ", comment )
              if (1) { //(comment.length > 0) {
                name = comment.username //comment.split(":")[0];
                text = comment.text //comment.split(":")[1].split(",")[0];
                likes = comment.likes //comment.split(":")[1].split(",")[1];

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
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      {addCommentModal && <AddCommentModal setIsOpenAddCommentModal={setAddCommentModal} modelName={modelName} postData={postData} />}
    </>
  );
};

export default CommentModal;