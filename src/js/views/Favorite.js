import React, { useState, useContext } from "react";
import { Context } from "../store/Context";

import { Container, LinkBack } from "./styles/FavoriteStyled";

import { HeroCard } from "../components/HeroCard";

export const Favorite = () => {
	const { store } = useContext(Context);
	
	// This is so the page renders everytime that the favorite is taken from the array in the store. 
	// This state is passed to the heroCard and everytime that the star is clicked gets changed this state,  
	// hence re-rendering the page and actualizing the mapped store in the view.
	const [check, setCheck] = useState(false); 

	let mappedFavorites = store.favorites.characters.map(favorite => {
		return <HeroCard check={check} setCheck={setCheck} key={favorite.id} character={favorite} />;
	});

	return (
		<React.Fragment>
			<Container>
				<LinkBack placing={store.favorites.characters.length !== 0} to="/">
					<i className="fas fa-chevron-left" /> Back
					{mappedFavorites.length !== 0 ? "" : ", No favorites selected, keep searching!!!"}
				</LinkBack>
				{mappedFavorites}
			</Container>
		</React.Fragment>
	);
};