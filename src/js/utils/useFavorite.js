import { useState, useContext } from "react";
import { Context } from "../store/Context";

// This custom hook manages the favorite state that will get triggered when the user clicks in the stars icons
// , pushing it to a favorites object and an array of favorite or comic depending on wich was clicked.
// The Hook has four arguments, mainly because this gives us the chance to reuse it in multiple components,
// in this case we are using it in HeroCard and in ComicsDescription. 
export const useFavorite = (property, object, check, setCheck) => {
    const { store } = useContext(Context);
    
    // With this checker i'm ensuring that if the user goes to another page or does a search and the character
	// he has clicked as favorite appears again, maintains the star that shows it has been clicked already.
	let favoriteChecker = store.favorites[property].filter(favorite => {
		return favorite.id === object.id;
	});
	const [favorite, setFavorite] = useState(favoriteChecker.length > 0 ? true : false);
	const handleFavorite = e => {
		// Prevents the triggering of the Card onClick when favorite star is clicked.
		e.stopPropagation(); 
		e.preventDefault(); 
		// Here i'm checking if favorite has been already clicked so it gets pulled out of the 
		// array if it has and pushed in if it hasn't.
		if (favorite) {
			setFavorite(!favorite);
			let newFavoritesArray = store.favorites[property].filter(favorite => {
				return favorite.id !== object.id;
			});
			store.favorites[property] = newFavoritesArray;
			if (check !== undefined) {
				setCheck(!check);
			}
		} else {
			setFavorite(!favorite);
			store.favorites[property].push(object);
		}
    };
    
    return {
        favorite,
        handleFavorite
    };
};