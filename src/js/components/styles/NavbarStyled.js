import styled from "styled-components";
import { Link } from "react-router-dom";

export const Nav = styled.nav`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	padding: 12px 12px;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.11);
	position: fixed;
	top: 0;
	background-color: white;
	z-index: 1060;
`;

export const Logo = styled.img`
	width: 70px;
	margin-right: 10px;
`;

export const LinkStyled = styled(Link)`
	width: 80%;
	cursor: default;
	visibility: ${props => (props.favorite ? "hidden" : "")};
`;

export const SearchBar = styled.input`
	width: 100%;
	border: none;
	outline: none;
	font-size: 20px;

	:active {
		border: none;
	}
	::-webkit-input-placeholder {
		font-size: 20px;
		color: lightgrey;
	}
`;

export const Icon = styled.i`
	margin: auto 0;
	color: #a8a8a8;
	font-size: 20px;
`;

export const LinkStyledIcon = styled(Link)`
	margin-right: 15px;
`;

export const LinkStyledLogo = styled(Link)`
	display: flex;
	align-items: center;
`;