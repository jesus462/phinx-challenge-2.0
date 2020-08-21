import React, { useContext } from "react";
import { Context } from "../store/Context";

import { LinkContainer, ComicImage, ComicInfo, Info } from "./styles/ComicsDescriptionStyled";

import { stringChecker } from "../utils/stringChecker";
import { addHttps } from "../utils/addHttps";
import { useKey } from '../utils/useKey';
import { useFavorite } from "../utils/useFavorite";

export const ComicsDescription = ({ comic, hide }) => {
	const { actions } = useContext(Context);

	//Just like in HeroCard this Custom Hook helps me manage the state and changes in favorites.
	const { favorite, handleFavorite } = useFavorite('comics', comic); 

	const handleClickComic = () => {
		actions.setComicPreview(comic);
		window.scrollTo(0, 0);
		hide();
	};

	useKey(27, hide); //With this i'm making sure that the modal also closes when the scape key is pressed.

	// In the return there is a ternary operator that is checking to change the icon of the star.
	return (
		<LinkContainer to="/Comic" onClick={handleClickComic}>
			<ComicImage src={`${addHttps(comic.thumbnail.path)}.${comic.thumbnail.extension}`} alt={comic.title} />
			<ComicInfo>
				<Info title>
					{comic.title}{" "}
					<span onClick={handleFavorite}>
						{favorite ? <i className="fas fa-star" /> : <i className="far fa-star" />}
					</span>
				</Info>
				<Info justify>{stringChecker(comic.description)} For more click the card</Info>
				<Info title>click for more info...</Info>
			</ComicInfo>
		</LinkContainer>
	); 
};