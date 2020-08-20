import { useState, useContext } from "react";
import { Context } from "../store/Context";
// Custom hook for the logic of the modal for the comics.
export const useModal = () => {
	const { store, actions } = useContext(Context);
	const [show, setShow] = useState(false);
	const toggle = () => {
		setShow(!show);
		actions.setModalOn(store.modalOn); 
		if (show) {
		actions.setLoadingComics(store.loadingComics);
		} 
		// Here i clear the array of comics shown, so when another card gets clicked there will be a fresh look.
		store.characterComics.length = 0; 
		// This conditional is here to stop the scrolling in the background depending if the modal is showing or not.
		// It also checks the width of the screen to see if it varies when openning the modal, so when it is, the modal
		// doesnt affects the sizing of the page.
		if (!show && document.body.offsetWidth !== window.innerWidth) {
			document.body.style.width = `${document.body.offsetWidth}px`;
			document.body.style.overflow = "hidden";
		} else if (!show && document.body.offsetWidth === window.innerWidth) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.width = "";
			document.body.style.overflow = "";
		}
	};

	return {
		show,
		toggle
	};
};