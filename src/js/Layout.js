import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Home } from "./views/Home";
import { Comic } from "./views/Comic";
import { Favorite } from "./views/Favorite";
import { Navbar } from "./components/Navbar";
import injectContext from "./store/Context";


// This is where with the react-router-dom we stablish the Routes of our App and inject the context to 
// each view, so  we nay have a global state in reach for our use.
const Layout = () => {

	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter>
				<Navbar />
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/Comic">
						<Comic />
					</Route>
					<Route exact path="/Favorite">
						<Favorite />
					</Route>
					<Route>
						<h1>Not found!</h1>
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);