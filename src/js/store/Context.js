import React, { useState, useEffect } from "react";
import getState from "./flux.js";

export const Context = React.createContext(null);

// This function injects the global store to any view/component that gets passed to it, we will inject 
// the context to layout.js, in there with react-router-dom we'll be able to pass the store to all the parts 
// of our App.
const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		// Here we are setting the global state of our App for the Context that we'll be using to change the 	
		// data in the store , the changes to the store will normally be restricted to the actions. 
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		);

		useEffect(() => {
			state.actions.fetchCharacters();
		}, []);

		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;
};

export default injectContext;