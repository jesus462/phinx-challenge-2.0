import React, { useContext } from "react";
import { Context } from "../store/Context";

import { Card, Image, Text } from "./styles/HeroCardStyled";

import { ComicsModal } from "./ComicsModal";
import { useModal } from "../utils/useModal";
import { useFavorite } from "../utils/useFavorite";
import { addHttps } from "../utils/addHttps";

export const HeroCard = ({ character, check, setCheck }) => {
	const { store, actions } = useContext(Context);
	const { show, toggle } = useModal();
	// Custom Hook that helps me manage the state and changes in favorites.
	const { favorite, handleFavorite } = useFavorite('characters', character, check, setCheck);

	const handleShow = () => {
		// This queryComic is to condition the search of the comic to the title inputed in the query string. And to check
		// if in fact has been made a query string with the param comic.
		let queryComic = store.querySearch.comic[0]; 
		actions.fetchCharacterComics(addHttps(character.comics.collectionURI), queryComic !== null ? queryComic : "");
		actions.setUrlComic(addHttps(character.comics.collectionURI));
		toggle();
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