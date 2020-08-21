import styled from "styled-components";

export const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1040;
	width: 100%;
	height: 100%;
	background-color: #000;
	opacity: 0.5;
`;

export const ModalWrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1050;
	width: 100%;
	height: 100%;
	outline: 0;
	display: flex;
`;

export const Modal = styled.div`
	z-index: 100;
	background: white;
	position: relative;
	margin: auto;
	border-radius: 10px;
	width: 350px;
	height: 60%;
	overflow-y: scroll;
	@media (max-width: 400px) {
		width: 90%;
	}
`;

export const Header = styled.div`
	position: sticky;
	top: 0;
	background-color: white;
	width: 100%;
	display: flex;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.11);
`;

export const Main = styled.div`
	width: 100%;
`;

export const Title = styled.p`
	font-size: 20px;
	font-weight: bold;
	margin: 5px 20px;
	width: 80%;
`;

export const Button = styled.button`
	height: 90%;
	margin: auto 0;
	font-size: 15px;
	font-weight: bold;
	:hover,
	:active {
		opacity: 0.8;
		cursor: pointer;
	}
`;

export const TextLoading = styled.h5`
	text-align: center;
	transition: opacity 04s ease-in-out;
	transition-property: opacity;
	animation-name: loading;
	animation-duration: 0.4s;
	animation-iteration-count: infinite;

	@keyframes loading {
		0% {
			color: #212529;
		}
		50% {
			color: #737373;
		}
		100% {
			color: #212529;
		}
	}
`;