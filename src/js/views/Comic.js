import React, { useContext } from "react";
import { Context } from "../store/Context";

import { Container, ComicInfo, ComicImage, Title, Info, LinkBack } from "./styles/ComicStyled";

import { addHttps } from "../utils/addHttps";
import { datesChecker } from "../utils/datesChecker";

export const Comic = () => {
	const { store } = useContext(Context);

	const conditionedRenderComic = () => {
		if (store.comicPreview.length !== 0) {
			let mappedCreators = store.comicPreview[0].creators.items.slice(0, 5).map(creator => {
				return <Info subTitle>{creator.role}: {creator.name}</Info>;
			});

			return (
				<React.Fragment>
					<ComicImage
						src={`${addHttps(store.comicPreview[0].thumbnail.path)}.${store.comicPreview[0].thumbnail.extension}`}
						alt={store.comicPreview[0].title}
					/>
					<ComicInfo>
						<Title>{store.comicPreview[0].title}</Title>
						<Info subTitle>Published: {datesChecker(store.comicPreview[0].dates)}</Info>
						{mappedCreators}
						<Info>{store.comicPreview[0].description}</Info>
					</ComicInfo>
				</React.Fragment>
			);
		} else {
			return null;
		}
	};

	return (
		<React.Fragment>
			<Container>
				<LinkBack absolute={store.comicPreview.length > 0} to="/">
					<i className="fas fa-chevron-left" /> Back
					{store.comicPreview.length !== 0 ? "" : ", No comic selected, keep looking!!!"}
				</LinkBack>
				{conditionedRenderComic()}
			</Container>
		</React.Fragment>
	);
};