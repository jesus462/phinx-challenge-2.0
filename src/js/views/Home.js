import React, { useState, useContext } from "react";
import { Context } from "../store/Context";
import styled from "styled-components";

import { HeroCard } from "../components/HeroCard";
import { Navbar } from "../components/Navbar";

// Styled Components
const ContainerCards = styled.div`
	width: 93%;
	margin: 53px auto 0;
	padding: 35px 0;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	@media (max-width: 605px) {
		width: 97%;
	}
`;
const TextLoading = styled.h2`
	transition: opacity 04s ease-in-out;
	transition-property: opacity;
	animation-name: loading;
	animation-duration: 0.6s;
	animation-iteration-count: infinite;
	@media (max-width: 700px) {
		font-size: 20px;
	}
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
const TextMatch = styled.h2`
	text-align: center;
	@media (max-width: 700px) {
		font-size: 20px;
	}
`;

// Functional Component
export const Home = () => {
	const { store, actions } = useContext(Context);

	// filtering the cards that the images are not available, to then map the characters that have images.
	let charactersWithImage = store.characters.filter(character => {
		const noImageUrl = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";

		return character.thumbnail.path !== noImageUrl;
	});
	let mappedHeroCard = charactersWithImage.map(character => {
		return <HeroCard key={character.id} character={character} />;
	});

	const noMatchConditionalRender = () => {
		if (store.noMatchCharacter && !store.loadingCharacters) {
			return (
				<TextMatch>
					No match found, try again <i className="far fa-smile-wink" />
				</TextMatch>
			);
		} else {
			return;
		}
	};

	return (
		<React.Fragment>
			<Navbar />
			<ContainerCards>
				{noMatchConditionalRender()}
				{store.loadingCharacters ? <TextLoading>loading...</TextLoading> : mappedHeroCard}
			</ContainerCards>
		</React.Fragment>
	);
};
