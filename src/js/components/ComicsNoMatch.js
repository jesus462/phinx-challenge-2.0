import React, {  useContext } from "react";
import { Context } from "../store/Context";

import { TextMatch } from "./styles/ComicsNoMatchStyled";

import { useKey } from '../utils/useKey';

// This component is mainly to save space in the ComicsModal
export const ComicsNoMatch = ({character, hide}) => {
    const { store } = useContext(Context);

    let comicsWithImage = store.characterComics.filter(comic => {
		const noImageUrl = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
		return comic.thumbnail.path !== noImageUrl;
	});

    useKey(27, hide); //With this i'm making sure that the modal also closes when the scape key is pressed.
    return character.comics.available === 0 && !store.loadingComics ? (
        <TextMatch>
            No comics available <i className="far fa-frown" />
        </TextMatch>
	) : (comicsWithImage.length === 0 && !store.loadingComics ? (
            <TextMatch>
                This hero does not have comics by that title, keep trying.
            </TextMatch>
        ) : ('')         
    ); 
};