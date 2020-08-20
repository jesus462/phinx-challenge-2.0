import { useState, useContext, useEffect } from "react";
import { Context } from "../store/Context";
// currently not being used, need to refactor it.

// Here i declare a search state that will get triggered when the input changes, meaning every time 
// the user types in the input.
export const useSearch = () => {
    const { store, actions } = useContext(Context);
    const [search, setSearch] = useState("");
    
    const handleSearch = (e) => {
		setSearch(e.target.value);
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
                actions.fetchCharacters(search);
            } else {
                actions.fetchCharacterComic(store.urlComic, search);
            }
        },
        [search]
    );
    
    return {
        search,
        handleSearch
    };
};