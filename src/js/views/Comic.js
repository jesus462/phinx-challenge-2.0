import React, { useContext } from "react";
import { Context } from "../store/Context";

import { Container, ComicInfo, ComicImage, Title, Info, LinkBack } from "./styles/ComicStyled";

import { addHttps } from "../utils/addHttps";
import { datesChecker } from "../utils/datesChecker";

export const Comic = () => {
	const { store, actions } = useContext(Context);

	const conditionedRender = () => {
		if (store.comic.length !== 0) {
			let mappedCreators = store.comic[0].creators.items.map(creator => {
				return <Info subTitle>{creator.role}: {creator.name}</Info>;
			});

			return (
				<React.Fragment>
					<ComicImage
						src={`${addHttps(store.comic[0].thumbnail.path)}.${store.comic[0].thumbnail.extension}`}
						alt={store.comic[0].title}
					/>
					<ComicInfo>
						<Title>{store.comic[0].title}</Title>
						<Info subTitle>Published: {datesChecker(store.comic[0].dates)}</Info>
						{mappedCreators}
						<Info>{store.comic[0].description}</Info>
					</ComicInfo>
				</React.Fragment>
			);
		} else {
			return;
		}
	};

	return (
		<React.Fragment>
			<Container>
				<LinkBack absolute={store.comic.length > 0} to="/">
					<i className="fas fa-chevron-left" /> Back
					{store.comic.length !== 0 ? "" : ", No comic selected, keep looking!!!"}
				</LinkBack>
				{conditionedRender()}
			</Container>
		</React.Fragment>
	);
};