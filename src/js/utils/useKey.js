import { useEffect, useRef } from "react";
// This function will track a keydown event and trigger an action with a callback.
export const useKey = (key, callback) => {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current= callback;
    });

    useEffect(() => {

        const handleEvent = (e) => {
            if (e.keyCode === key) {
                callbackRef.current(e);
            }
        }

        document.addEventListener("keydown", handleEvent); 
        return () => document.removeEventListener("keydown", handleEvent);
    }, [key]);
};