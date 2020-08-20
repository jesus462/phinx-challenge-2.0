import styled from "styled-components";

export const ContainerCards = styled.div`
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

export const TextLoading = styled.h2`
	transition: opacity 04s ease-in-out;
	transition-property: opacity;
	animation-name: loading;
	animation-duration: 0.6s;
	animation-iteration-count: infinite;
	@media (max-width: 700px) {
		font-size: 20px;
	}
	@keyframes loading {
		0% {
			color: #212529;
		}
		50% {
			color: #737373;
		}
		100% {
			color: #212529;
		}
	}
`;

export const TextMatch = styled.h2`
	text-align: center;
	@media (max-width: 700px) {
		font-size: 20px;
	}
`;