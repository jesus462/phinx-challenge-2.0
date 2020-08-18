import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/Context";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const Nav = styled.nav`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	padding: 12px 12px;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.11);
	position: fixed;
	top: 0;
	background-color: white;
	z-index: 1;
`;
const Logo = styled.img`
	width: 70px;
	margin-right: 10px;
`;
const LinkStyled = styled(Link)`
	width: 80%;
	cursor: default;
`;
const SearchBar = styled.input`
	width: 100%;
	border: none;
	outline: none;
	font-size: 20px;

	:active {
		border: none;
	}
	::-webkit-input-placeholder {
		font-size: 20px;
		color: lightgrey;
	}
`;
const Icon = styled.i`
	margin: auto 0;
	color: #a8a8a8;
	font-size: 20px;
`;
const LinkStyledIcon = styled(Link)`
	margin-right: 15px;
`;
const LinkStyledLogo = styled(Link)`
	display: flex;
	align-items: center;
`;

// Functional Component
export const Navbar = ({ currentView }) => {
	const { store, actions } = useContext(Context);

	// Here i declare a search state that will get triggered when the input changes, meaning every time 
	// the user types in the input.
	const [search, setSearch] = useState("");
	const handleChangeSearh = e => {
		setSearch(e.target.value);
		window.scrollTo(0, 0); // This is just so when ever the search bar gets typed the page will go to the top.
		actions.setLoadingCharacters(store.loadingCharacters);
	};
	// This use effect makes sure that the action of fetching the characters gets done every time the search 
	// parameter changes, thats why is between [].
	useEffect(
		() => {
			actions.fetchCharacters(search);
		},
		[search]
	);
	
	// Here i'm conditioning wich Icon will show depending on the page that the user is.
	const conditionedRender = () => {
		if (currentView === "Favorite") {
			return <Icon className="fas fa-star" />;
		} else {
			return <Icon className="far fa-star" />;
		}
	};

	return (
		<Nav>
			<LinkStyledLogo to="/">
				<Logo
					src="https://res.cloudinary.com/duu99bl6f/image/upload/v1597508080/Phinx/marvel-logo.png"
					alt="Marvel logo"
				/>
			</LinkStyledLogo>
			<LinkStyled to="/">
				<SearchBar
					value={search}
					onChange={handleChangeSearh}
					type="text"
					className="fas fa-search"
					placeholder="&#xf002; Search"
				/>
			</LinkStyled>
			<LinkStyledIcon onClick={() => window.scrollTo(0, 0)} to="Favorite">
				{conditionedRender()}
			</LinkStyledIcon>
		</Nav>
	);
};