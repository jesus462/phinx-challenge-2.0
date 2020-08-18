import React, { useState, useContext } from "react";
import { Context } from "../store/Context";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { HeroCard } from "../components/HeroCard";
import { Navbar } from "../components/Navbar";

// Styled Components
const Container = styled.div`
	width: 93%;
	margin: 53px auto 0;
	padding: 35px 0;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	@media (max-width: 605px) {
		width: 97%;
	}
`;
const LinkBack = styled(Link)`
	color: black;
	font-size: 32px;
	margin: 0 5px;
	text-align: center;
	text-decoration: none;
	position: absolute;
	left: ${props => (props.placing ? "5.5%" : "")};
	top: ${props => (props.placing ? "55px" : "")};
	@media (max-width: 700px) {
		font-size: 20px;
	}
	:hover,
	:active {
		text-decoration: underline;
		opacity: 0.8;
	}
`;

// Functional Components
export const Favorite = () => {
	const { store, actions } = useContext(Context);
	
	// This is so the page renders everytime that the favorite is taken from the array in the store. 
	// This state is passed to the heroCard and everytime that the star is clicked gets changed this state,  
	// hence re-rendering the page and actualizing the mapped store in the view.
	const [check, setCheck] = useState(false); 

	const currentView = "Favorite";

	let mappedFavorites = store.favorites.characters.map(favorite => {
		return <HeroCard check={check} setCheck={setCheck} key={favorite.id} character={favorite} />;
	});

	return (
		<React.Fragment>
			<Navbar currentView={currentView} />
			<Container>
				<LinkBack placing={store.favorites.characters.length !== 0} to="/">
					<i className="fas fa-chevron-left" /> Back
					{store.favorites.characters.length !== 0 ? "" : ", No favorites selected, keep searching!!!"}
				</LinkBack>
				{mappedFavorites}
			</Container>
		</React.Fragment>
	);
};