import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
	width: 93%;
	margin: 53px auto 0;
	padding: 35px 0;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	@media (max-width: 605px) {
		width: 97%;
	}
`;

export const LinkBack = styled(Link)`
	color: black;
	font-size: 32px;
	margin: 0 5px;
	text-align: center;
	text-decoration: none;
	position: absolute;
	left: ${props => (props.placing ? "5.5%" : "")};
	top: ${props => (props.placing ? "55px" : "")};
	@media (max-width: 700px) {
		font-size: 20px;
	}
	:hover,
	:active {
		text-decoration: underline;
		opacity: 0.8;
	}
`;