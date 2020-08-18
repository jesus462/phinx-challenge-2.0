import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/Context";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { stringChecker } from "../utils/stringChecker";

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

export const ComicsDescription = ({ comic, hide }) => {
	const { store, actions } = useContext(Context);

	const handleClickComic = () => {
		actions.setComic(comic);
		window.scrollTo(0, 0);
		actions.setLoadingComics(store.loadingComics);
		hide();
		store.characterComics.length = 0; // Here i clear the array.
	};

	let favoriteChecker = store.favorites.comics.filter(favorite => {
		return favorite.id === comic.id;
	});
	const [favorite, setFavorite] = useState(favoriteChecker.length > 0 ? true : false);
	const addFavorite = e => {
		e.stopPropagation(); // Prevents that the onClick of the LinkContainer component gets trigger when favorite is clicked
		e.preventDefault(); //
		if (favorite) {
			setFavorite(!favorite);
			let newFavoritesArray = store.favorites.comics.filter(favorite => {
				return favorite.id != comic.id;
			});
			store.favorites.comics = newFavoritesArray;
		} else {
			setFavorite(!favorite);
			store.favorites.comics.push(comic);
		}
	};

	return (
		<LinkContainer to="/Comic" onClick={handleClickComic}>
			<ComicImage src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
			<ComicInfo>
				<Info title>
					{comic.title}{" "}
					<span onClick={addFavorite}>
						{favorite ? <i className="fas fa-star" /> : <i className="far fa-star" />}
					</span>
				</Info>
				<Info justify>{stringChecker(comic.description)}</Info>
			</ComicInfo>
		</LinkContainer>
	);
};