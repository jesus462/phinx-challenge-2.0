import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Home } from "./views/Home";
import { Comic } from "./views/Comic";
import { Favorite } from "./views/Favorite";
import injectContext from "./store/Context";

const Layout = () => {

	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter>
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