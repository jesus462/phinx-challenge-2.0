import { useState } from "react";
// Custom hook for the logic of the modal for the comics.
export const useModal = () => {
	const [show, setShow] = useState(false);
	const toggle = () => {
		setShow(!show);
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