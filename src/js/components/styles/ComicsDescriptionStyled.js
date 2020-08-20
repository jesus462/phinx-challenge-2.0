import styled from "styled-components";
import { Link } from "react-router-dom";

export const LinkContainer = styled(Link)`
	text-decoration: none;
	color: black;
	display: flex;
	width: 100%;

	:hover,
	:active {
		text-decoration: none;
		color: #595959;
		box-shadow: 0 10px 10px rgba(0, 0, 0, 0.4);
		border-radius: 10px;
		cursor: pointer;
	}
`;

export const ComicImage = styled.img`
	height: 100px;
	width: 30%;
	border-radius: 10px;
	padding: 5px;
	margin: auto 0;
`;

export const ComicInfo = styled.div`
	display: flex;
	flex-direction: column;
	padding: 5px;
`;

export const Info = styled.div`
	font-size: 12px;
	font-weight: ${props => (props.title ? "bold" : "regular")};
	text-align: ${props => (props.justify ? "justify" : "")};
`;