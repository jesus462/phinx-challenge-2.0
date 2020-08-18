import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from "./views/App";
import injectContext from "./store/Context";

const Layout = () => {

	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter>
				<Switch>
					<Route exact path="/">
						<App />
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