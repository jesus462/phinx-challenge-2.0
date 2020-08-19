import React, {  useContext } from "react";
import ReactDOM from "react-dom";
import { Context } from "../store/Context";
import styled from "styled-components";

import { ComicsDescription } from "./ComicsDescription";

// Styled Components
const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1040;
	width: 100%;
	height: 100%;
	background-color: #000;
	opacity: 0.5;
`;
const ModalWrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1050;
	width: 100%;
	height: 100%;
	outline: 0;
	display: flex;
`;
const Modal = styled.div`
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
const Header = styled.div`
	position: sticky;
	top: 0;
	background-color: white;
	width: 100%;
	display: flex;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.11);
`;
const Main = styled.div`
	width: 100%;
`;
const Title = styled.p`
	font-size: 20px;
	font-weight: bold;
	margin: 5px 20px;
	width: 80%;
`;
const Button = styled.button`
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
const TextLoading = styled.h5`
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
const TextMatch = styled.h5`
	text-align: center;
`;

// Functional component
export const ComicsModal = ({ show, hide, character }) => {
	const { store, actions } = useContext(Context);

	// Here i'm checking if the comic has an image available, so that the ones that dont, dont get mapped.
	let comicsWithImage = store.characterComics.filter(comic => {
		const noImageUrl = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
		return comic.thumbnail.path !== noImageUrl;
	});
	let mappedComics = comicsWithImage.map(comic => {
		return <ComicsDescription key={comic.id} comic={comic} hide={hide} />;
	});

	const noMatchConditionalRender = () => {
		if (character.comics.available === 0) {
			return (
				<TextMatch>
					This hero does not have comics <i className="far fa-frown" />
				</TextMatch>
			);
		} else if(mappedComics.length === 0) {
			return (
				<TextMatch>
					This hero does not have comics by that title, keep trying.
				</TextMatch>
			);
		} else {
			return;
		}
	};

	const handleClose = () => {
		actions.setLoadingComics(store.loadingComics);
		hide();
		store.characterComics.length = 0;
	};
	
	// The return has a ternary operator that is checking if show is true or false, if true, 
	// createPortal adds a child to the body, creating a modal component that shows and hide on comand.
	// The state of the show is in the custom hook called useModal in utils, we imported it in the heroCard
	// where the clicking of it triggers the modal.
	return show
		? ReactDOM.createPortal(
				<React.Fragment>
					<ModalOverlay />
					<ModalWrapper>
						<Modal>
							<Header>
								<Title>{character.name}</Title>
								<Button onClick={handleClose}>X</Button>
							</Header>
							<Main>
								{!store.loadingComics ? noMatchConditionalRender() : ""}
								{store.loadingComics ? <TextLoading>loading...</TextLoading> : mappedComics}
							</Main>
						</Modal>
					</ModalWrapper>
				</React.Fragment>,
				document.body
		  )
		: null;
};