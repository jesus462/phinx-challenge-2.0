import React, { useContext } from "react";
import { Context } from "../store/Context";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Navbar } from "../components/Navbar";

// Styled Components
const Container = styled.div`
	width: 100%;
	height: 800px;
	padding: 35px 0;
	margin: 53px 0 0;
	display: flex;
	justify-content: center;
	@media (max-width: 700px) {
		flex-direction: column;
		justify-content: end;
	}
`;
const ComicInfo = styled.div`
	width: 40%;
	margin: 0 10px;
	@media (max-width: 700px) {
		margin: 0 auto;
		width: 85%;
	}
`;
const ComicImage = styled.img`
	width: 40%;
	height: 65%;
	margin: 0 10px;
	border-radius: 10px;
	@media (max-width: 700px) {
		margin: 0 auto;
		width: 50%;
		height: 40%;
	}
`;
const Title = styled.h2`
	font-weight: bold;
	@media (max-width: 700px) {
		font-size: 20px;
	}
`;
const Info = styled.p`
	font-size: 15px;
	text-align: justify;
	@media (max-width: 700px) {
		font-size: 13px;
	}
`;
const LinkBack = styled(Link)`
	color: black;
	font-size: 32px;
	margin: 0 5px;
	text-align: center;
	text-decoration: none;
	@media (max-width: 700px) {
		position: ${props => (props.absolute ? "absolute" : "static")};
		font-size: 20px;
		left: 5.5%;
	}
	:hover,
	:active {
		text-decoration: underline;
		opacity: 0.8;
	}
`;

// Functional Component
export const Comic = () => {
	const { store, actions } = useContext(Context);

	const conditionedRender = () => {
		if (store.comic.length !== 0) {
			return (
				<React.Fragment>
					<ComicImage
						src={`${store.comic[0].thumbnail.path}.${store.comic[0].thumbnail.extension}`}
						alt={store.comic[0].title}
					/>
					<ComicInfo>
						<Title>{store.comic[0].title}</Title>
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
			<Navbar />
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