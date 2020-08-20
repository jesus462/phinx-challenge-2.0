import React, { useContext, useState } from "react";
import { Context } from "../store/Context";

import { Card, Image, Text } from "./styles/HeroCardStyled";

import { ComicsModal } from "./ComicsModal";
import { useModal } from "../utils/useModal";
import { addHttps } from "../utils/addHttps";

export const HeroCard = ({ character, check, setCheck }) => {
	const { store, actions } = useContext(Context);
	const { show, toggle } = useModal();

	const handleShow = () => {
		let queryComic = store.querySearch.comic[0];
		actions.fetchCharacterComic(addHttps(character.comics.collectionURI), queryComic !== null ? queryComic : "");
		actions.setUrlComic(addHttps(character.comics.collectionURI));
		toggle();
	};

	// With this checker i'm ensuring that if the user goes to another page or does a search and the character
	// he has clicked as favorite appears again, maintains the star that shows it has been clicked already.
	let favoriteChecker = store.favorites.characters.filter(favorite => {
		return favorite.id === character.id;
	});
	const [favorite, setFavorite] = useState(favoriteChecker.length > 0 ? true : false);
	const handleFavorite = e => {
		// Prevents the triggering of the Card onClick when favorite star is clicked.
		e.stopPropagation(); 
		e.preventDefault(); 
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
					<span onClick={handleFavorite}>
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