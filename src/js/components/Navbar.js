import React, { useContext } from "react";
import { Context } from "../store/Context";
import { useLocation } from 'react-router-dom';

import { Nav, Logo, LinkStyled, SearchBar, Icon, LinkStyledIcon, LinkStyledLogo } from "./styles/NavbarStyled";

import { useKey } from '../utils/useKey';
import { useSearch } from "../utils/useSearch";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const { search, handleSearch } = useSearch(); // Here is a hook that manages the state of the search. Logic in the useSearch file.

	// This is to check the path in wich the user is currently on.
	const location = useLocation();
	const currentPath = location.pathname;
	
	// This function prevents that the clicking of favorite in nav exits home if the modal is on.
	const handleClickFavorite = (e) => {
		if (store.modalOn) {
			e.preventDefault();
		} else {
			window.scrollTo(0, 0);
		}
	};
	
	// Here i make sure that when the enter key gets pressed the fetching of data starts, it also gets instantly
	// activated when the user starts typing in the search bar, the logic is in the useSearch file.
	const handleEnter = () => {
		if (!store.modalOn) {
			actions.fetchCharacters(search);
			actions.setLoadingCharacters(store.loadingCharacters);
		} else {
			actions.fetchCharacterComics(store.urlComic, search);
			actions.setLoadingComics(store.loadingComics);
		}
	}
	useKey(13, handleEnter);
	
	return (
		<Nav>
			<LinkStyledLogo to="/">
				<Logo
					src="https://res.cloudinary.com/duu99bl6f/image/upload/v1597508080/Phinx/marvel-logo.png"
					alt="Marvel logo"
				/>
			</LinkStyledLogo>
			<LinkStyled to="/" favorite={currentPath === "/Favorite"}>
				<SearchBar
					value={search}
					onChange={handleSearch}
					type="text"
					className="fas fa-search"
					placeholder="&#xf002; Search"
				/>
			</LinkStyled>
			<LinkStyledIcon onClick={handleClickFavorite} to={currentPath === '/Favorite' ? "/" : "Favorite"}>
			<Icon className={currentPath === '/Favorite' ? "fas fa-star" : "far fa-star"} />
			</LinkStyledIcon>
		</Nav>
	);
};