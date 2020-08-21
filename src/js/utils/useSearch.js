import { useState, useContext, useEffect } from "react";
import { Context } from "../store/Context";
import { useLocation } from 'react-router-dom';

// This custom hook manages the search state that will get triggered when the input changes, meaning every time 
// the user types in the input, or when the url gets add a query string.
export const useSearch = () => {
    const { store, actions } = useContext(Context);
    const [search, setSearch] = useState(""); //Manages the state of the search bar.
    
    // Here i'm generating a random letter so every time the page gets reloaded and there is no query string
    // there will be new random characters, there will also be new characters if the search parameter is empty.
    var randomChar = String.fromCharCode(97 + Math.floor(Math.random() * (25 - 0)) + 0);

    // Querying the URL to make a search
	let query = new URLSearchParams(useLocation().search);
	let character = query.get("character");
	let comic = query.get("comic");

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
    // parameter changes, thats why search is between []. It also makes the fetch of data instantly when entered in
    // the App
    useEffect(
        () => {
            // Here i'm conditioning the search depending on wether the modal is on, so it looks for comics or 
            // if its off it looks for characters
            if (!store.modalOn) {
				actions.setQuerySearch(character, comic); // Here, i'm making global the query string received from the url.
                actions.fetchCharacters(character !== null ? character : (search === "" ? randomChar : search));
            } else {
                actions.fetchCharacterComics(store.urlComic, search);
            }
        },
        [search]
	);
    
    return {
        search,
        handleSearch
    };
};