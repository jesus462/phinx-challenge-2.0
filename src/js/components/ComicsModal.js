import React, {  useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { Context } from "../store/Context";

import { ModalOverlay, ModalWrapper, Modal, Header, Main, Title, Button, TextLoading, TextMatch } from "./styles/ComicsModalStyled";

import { ComicsDescription } from "./ComicsDescription";

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
					No comics available <i className="far fa-frown" />
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
								<Button onClick={hide}>X</Button>
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