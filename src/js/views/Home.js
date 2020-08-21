import React, { useContext } from "react";
import { Context } from "../store/Context";

import { ContainerCards, TextLoading, TextMatch } from "./styles/HomeStyled";

import { HeroCard } from "../components/HeroCard";

export const Home = () => {
	const { store } = useContext(Context);

	// filtering the cards that the images are not available, to then map the characters that have images.
	let charactersWithImage = store.characters.filter(character => {
		const noImageUrl = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";

		return character.thumbnail.path !== noImageUrl;
	});
	let mappedHeroCard = charactersWithImage.map(character => {
		return <HeroCard key={character.id} character={character} />;
	});

	return (
		<React.Fragment>
			<ContainerCards>
				{store.noMatchCharacter && !store.loadingCharacters ? (
					<TextMatch>
					No match found, try again <i className="far fa-smile-wink" />
					</TextMatch> 
				) : (
					null
				)}
				{store.loadingCharacters ? <TextLoading>loading...</TextLoading> : mappedHeroCard}
			</ContainerCards>
		</React.Fragment>
	);
};
