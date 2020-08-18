import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/Context";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
	width: 100%;
	display: flex;
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
	text-align: right;
	margin-right: 15px;
`;

export const Navbar = ({ currentView }) => {
	const { store, actions } = useContext(Context);

	const [search, setSearch] = useState("");
	const handleChangeSearh = e => {
		setSearch(e.target.value);
		window.scrollTo(0, 0);
		actions.setLoadingCharacters(store.loadingCharacters);
	};
	useEffect(
		() => {
			actions.fetchCharacters(search);
		},
		[search]
	);

	const [favorite, setFavorite] = useState(false);
	const handleFavorite = () => {
		setFavorite(!favorite);
		window.scrollTo(0, 0);
	};
	const conditionedRender = () => {
		if (currentView === "Favorite") {
			return <Icon className="fas fa-star" />;
		} else {
			return <Icon className="far fa-star" />;
		}
	};

	return (
		<Nav>
			<Link to="/">
				<Logo
					src="https://res.cloudinary.com/duu99bl6f/image/upload/v1597508080/Phinx/marvel-logo.png"
					alt="Marvel logo"
				/>
			</Link>
			<LinkStyled to="/">
				<SearchBar
					value={search}
					onChange={handleChangeSearh}
					type="text"
					className="fas fa-search"
					placeholder="&#xf002; Search"
				/>
			</LinkStyled>
			<LinkStyledIcon onClick={handleFavorite} to="Favorite">
				{conditionedRender()}
			</LinkStyledIcon>
		</Nav>
	);
};