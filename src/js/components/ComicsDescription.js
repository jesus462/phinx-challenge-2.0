import React, { useState, useContext } from "react";
import { Context } from "../store/Context";

import { LinkContainer, ComicImage, ComicInfo, Info } from "./styles/ComicsDescriptionStyled";

import { stringChecker } from "../utils/stringChecker";
import { addHttps } from "../utils/addHttps";
import { useKey } from '../utils/useKey';

export const ComicsDescription = ({ comic, hide }) => {
	const { store, actions } = useContext(Context);

	const handleClickComic = () => {
		actions.setComic(comic);
		window.scrollTo(0, 0);
		hide();
	};

	// With this checker i'm ensuring that if the user goes to another page or does a search and the character
	// he has clicked as favorite appears again mantains the star that shows it has been clicked already.
	let favoriteChecker = store.favorites.comics.filter(favorite => {
		return favorite.id === comic.id;
	});
	const [favorite, setFavorite] = useState(favoriteChecker.length > 0 ? true : false);
	const addFavorite = e => {
		// Prevents the triggering of the LinkContainer onClick when favorite star is clicked.
		e.stopPropagation(); 
		e.preventDefault(); 
		// Here i'm checking if favorite has been already clicked so it gets pulled out of the 
		// array if it has and pushed in if it hasn't.
		if (favorite) {
			setFavorite(!favorite);
			let newFavoritesArray = store.favorites.comics.filter(favorite => {
				return favorite.id !== comic.id;
			});
			store.favorites.comics = newFavoritesArray;
		} else {
			setFavorite(!favorite);
			store.favorites.comics.push(comic);
		}
	};

	useKey(27, hide); //With this i'm making sure that the modal also closes when the scape key is pressed.

	// In the return there is a ternary operator that is checking to change the icon of the star.
	return (
		<LinkContainer to="/Comic" onClick={handleClickComic}>
			<ComicImage src={`${addHttps(comic.thumbnail.path)}.${comic.thumbnail.extension}`} alt={comic.title} />
			<ComicInfo>
				<Info title>
					{comic.title}{" "}
					<span onClick={addFavorite}>
						{favorite ? <i className="fas fa-star" /> : <i className="far fa-star" />}
					</span>
				</Info>
				<Info justify>{stringChecker(comic.description)} For more click the card</Info>
				<Info title>click for more info...</Info>
			</ComicInfo>
		</LinkContainer>
	); 
};