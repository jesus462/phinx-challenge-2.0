import React, { useState, useContext } from "react";
import { Context } from "../store/Context";
import styled from "styled-components";

import { ComicsModal } from "./ComicsModal";
import { useModal } from "../utils/useModal";
import { addHttps } from "../utils/addHttps";

// Styled Components
const Card = styled.div`
	margin: 15px;
	width: 240px;
	height: 320px;
	border: 1px solid black;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: relative;
	@media (max-width: 605px) {
		width: 130px;
		height: 210px;
		margin: 10px 10px;
	}

	:hover,
	:active {
		opacity: 0.95;
		box-shadow: 0 10px 10px rgba(0, 0, 0, 1);
		cursor: pointer;
	}
`;
const Image = styled.img`
	height: 100%;
	width: 100%;
	pointer-events: none;
	position: absolute;
	z-index: -1;
`;
const Text = styled.p`
	margin: 15px;
	color: white;
	text-align: ${props => (props.right ? "right" : "left")};
	font-size: 20px;

	span {
		background-color: rgba(0, 0, 0, 0.2);
		border-radius: 14px;
		padding: 2px;
	}
`;

// Functional Component
export const HeroCard = ({ character, check, setCheck }) => {
	const { store, actions } = useContext(Context);

	const { show, toggle } = useModal();
	const handleShow = () => {
		actions.fetchCharacterComic(character.comics.collectionURI);
		toggle();
	};

	// With this checker i'm ensuring that if the user goes to another page or does a search and the character
	// he has clicked as favorite appears again, maintains the star that shows it has been clicked already.
	let favoriteChecker = store.favorites.characters.filter(favorite => {
		return favorite.id === character.id;
	});
	const [favorite, setFavorite] = useState(favoriteChecker.length > 0 ? true : false);
	const addFavorite = e => {
		// Prevents the triggering of the Card onClick when favorite star is clicked.
		e.stopPropagation(); 
		// Here i'm checking if favorite has been already clicked so it gets pulled out of the 
		// array if it has and pushed in if it hasn't.
		if (favorite) {
			setFavorite(!favorite);
			let newFavoritesArray = store.favorites.characters.filter(favorite => {
				return favorite.id !== character.id;
			});
			store.favorites.characters = newFavoritesArray;
			if (check !== undefined) {
				setCheck(!check);
			}
		} else {
			setFavorite(!favorite);
			store.favorites.characters.push(character);
		}
	};

	return (
		<React.Fragment>
			<Card onClick={handleShow}>
				<Image src={`${addHttps(character.thumbnail.path)}.${character.thumbnail.extension}`} alt={character.name} />
				<Text right>
					<span onClick={addFavorite}>
						{favorite ? <i className="fas fa-star" /> : <i className="far fa-star" />}
					</span>
				</Text>
				<Text>
					<span>{character.name}</span>
				</Text>
			</Card>
			<ComicsModal character={character} show={show} hide={toggle} />
		</React.Fragment>
	);
};