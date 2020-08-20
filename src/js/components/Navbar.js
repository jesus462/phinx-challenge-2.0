import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/Context";
import { useLocation } from 'react-router-dom';

import { Nav, Logo, LinkStyled, SearchBar, Icon, LinkStyledIcon, LinkStyledLogo } from "./styles/NavbarStyled";

import { useKey } from '../utils/useKey';

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	
	// This is to check the path in wich we are currently on.
	const location = useLocation();
	const currentPath = location.pathname;

	// Querying the URL to make a search
	let query = new URLSearchParams(location.search);
	let character = query.get("character");
	let comic = query.get("comic");

    const [search, setSearch] = useState(""); //Manages the state of the search bar.
	const handleSearch = (e) => {
		setSearch(e.target.value);
		if(store.querySearch.comic[0] !== null) {
			actions.setQuerySearch('', ''); 
		}
		if (!store.modalOn) {
			window.scrollTo(0, 0);// This is just so when ever the search bar gets typed the page will go to the top.
			actions.setLoadingCharacters(store.loadingCharacters);
		} else {
			actions.setLoadingComics(store.loadingComics);
		}
	};
	
	// This use effect makes sure that the action of fetching the characters gets done every time the search 
	// parameter changes, thats why search is between [].
    useEffect(
        () => {
            // Here i'm conditioning the search depending on wether the modal is on, so it looks for comics or 
            // if its off it looks for characters
            if (!store.modalOn) {
				actions.setQuerySearch(character, comic); // Here, i'm making global the query string that received from the url.
				actions.fetchCharacters(character ? character : search);
            } else {
                actions.fetchCharacterComic(store.urlComic, search);
            }
        },
        [search]
	);
	
	// This function prevents that the clicking of favorite in nav exits home if the modal is on.
	const handleClickFavorite = (e) => {
		if (store.modalOn) {
			e.preventDefault();
		} else {
			window.scrollTo(0, 0);
		}
	};
	
	// Here i make sure that when the enter key gets pressed the search activates.
	const handleEnter = () => {
		if (!store.modalOn) {
			actions.fetchCharacters(search);
			actions.setLoadingCharacters(store.loadingCharacters);
		} else {
			actions.fetchCharacterComic(store.urlComic, search);
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