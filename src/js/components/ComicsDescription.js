import React, { useState, useContext } from "react";
import { Context } from "../store/Context";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { stringChecker } from "../utils/stringChecker";
import { addHttps } from "../utils/addHttps";
import { useKey } from '../utils/useKey';

// Styled Components
const LinkContainer = styled(Link)`
	text-decoration: none;
	color: black;
	display: flex;
	width: 100%;

	:hover,
	:active {
		text-decoration: none;
		color: #595959;
		box-shadow: 0 10px 10px rgba(0, 0, 0, 0.4);
		border-radius: 10px;
		cursor: pointer;
	}
`;
const ComicImage = styled.img`
	height: 100px;
	width: 30%;
	border-radius: 10px;
	padding: 5px;
	margin: auto 0;
`;
const ComicInfo = styled.div`
	display: flex;
	flex-direction: column;
	padding: 5px;
`;
const Info = styled.div`
	font-size: 12px;
	font-weight: ${props => (props.title ? "bold" : "regular")};
	text-align: ${props => (props.justify ? "justify" : "")};
`;

// Functional Component
export const ComicsDescription = ({ comic, hide }) => {
	const { store, actions } = useContext(Context);

	const handleClickComic = () => {
		actions.setComic(comic);
		window.scrollTo(0, 0);
		actions.setLoadingComics(store.loadingComics);
		hide();
		// Here i clear the array of comics shown, so when another card gets clicked there will be a fresh look.
		store.characterComics.length = 0; 
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