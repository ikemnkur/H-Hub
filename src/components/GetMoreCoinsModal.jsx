// @src/components/Modal.jsx

import React, { useEffect, useState, useRef } from "react";
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripe = loadStripe(
  "{PUBLIC-KEY}"
);



const Modal = ({ setIsOpen, currentUser }) => {

    // let modelName = "Example Model";
    // modelName = modelname;

    useEffect(() => {
        console.log(currentUser)
        let index = 0;

    }, [])

    const [isOpenCoinModal, setisOpenCoinModal] = useState(false);


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



    //   let allTips = sortStringByNumbers(tips);

    // let tipsAmount = parseInt(tips.split(':')[0].replace(';', ''));

    function onlyNumberKey(evt) {

        // Only ASCII character in that range allowed
        let ASCIICode = (evt.which) ? evt.which : evt.keyCode
        if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
            return false;
        return true;
    }

    function startPayment(coins){
        console.log("User is going to pay for ", coins, " coin(s)")
    }

    return (
        <>
            <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
            <div className={styles.centered}>
                <div className={styles.buyCoinsModal}>
                    <div className={styles.modalHeader}>
                        <h5 className={styles.heading}>Get More Coins</h5>
                    </div>
                    <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                        <RiCloseLine style={{ marginBottom: "-3px" }} />
                    </button>

                    <div style={{ border: "2px solid black", borderRadius: 5, width: "90%", height: 180, margin: "auto", overflowY: "scroll", backgroundColor: "lightgray" }}>

                    </div>
                    <div className={styles.modalContent}>
                        <span>
                             Current Coins: <b>{currentUser.coins}</b>
                        </span>
                        <br></br>
                        <span>
                            <b> Choose an Amount </b>
                        </span>
                        
                    </div>
                    <div style={{display:"flex", gap: 5, margin: "auto"}} className={styles.modalContent}>
                        
                        {/* <input type="text" onKeyDown={(e) => { return onlyNumberKey(e) }} maxLength="2" size="50%" /> */}
                        <button className={styles.coinBtn} onClick={() => startPayment(125)}>
                            125
                        </button>
                        <button className={styles.coinBtn} onClick={() => startPayment(250)}>
                            250
                        </button>
                        <button className={styles.coinBtn} onClick={() => startPayment(500)}>
                            500
                        </button>
                        <button className={styles.coinBtn} onClick={() => startPayment(1000)}>
                            1000
                        </button>
                    </div>
                    {/* <div className={styles.modalActions}>
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
                    </div> */}
                </div>
            </div>

           
        </>
    );
};

export default Modal;