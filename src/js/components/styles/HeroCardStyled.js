import styled from "styled-components";

export const Card = styled.div`
	margin: 15px;
	width: 240px;
	height: 320px;
	border: 1px solid black;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: relative;
	@media (max-width: 605px) {
		width: 130px;
		height: 210px;
		margin: 10px 10px;
	}

	:hover,
	:active {
		opacity: 0.95;
		box-shadow: 0 10px 10px rgba(0, 0, 0, 1);
		cursor: pointer;
	}
`;

export const Image = styled.img`
	height: 100%;
	width: 100%;
	pointer-events: none;
	position: absolute;
	z-index: -1;
`;

export const Text = styled.p`
	margin: 15px;
	color: white;
	text-align: ${props => (props.right ? "right" : "left")};
	font-size: 20px;

	span {
		background-color: rgba(0, 0, 0, 0.2);
		border-radius: 14px;
		padding: 2px;
	}
`;