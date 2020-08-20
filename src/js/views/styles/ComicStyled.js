import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
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

export const ComicInfo = styled.div`
	width: 40%;
	margin: 0 10px;
	@media (max-width: 700px) {
		margin: 0 auto;
		width: 85%;
	}
`;

export const ComicImage = styled.img`
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

export const Title = styled.h2`
	font-weight: bold;
	@media (max-width: 700px) {
		font-size: 20px;
		text-align: center;
	}
`;

export const Info = styled.p`
	font-size: 15px;
	text-align: justify;
	margin: ${props => (props.subTitle ? "0" : "")};
	font-weight: ${props => (props.subTitle ? "bold" : "")};
	@media (max-width: 700px) {
		font-size: 13px;
	}
`;

export const LinkBack = styled(Link)`
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
