import { useEffect, useRef } from "react";
// This Hook will track a keydown event and trigger an action with a callback. Everytime the key gets pressed
// the callback function gets triggered and effects de document. 

export const useKey = (key, callback) => {
    // We are using the Hook useRef to make sure that the stale callback reference is gone.
    const callbackRef = useRef(callback); 

    // After each render it will update the callback current value.
    useEffect(() => {
        callbackRef.current= callback;
    });

    useEffect(() => {
        // Here i'm checking if the key that i tied the event listener is being triggered, if it is triggers 
        // the callback.
        const handleEvent = (e) => {
            if (e.keyCode === key) {
                callbackRef.current(e);
            }
        }

        document.addEventListener("keydown", handleEvent); 
        //Here i'm making sure to clean the added event listener for the updated key.
        return () => document.removeEventListener("keydown", handleEvent);
    }, [key]);
};