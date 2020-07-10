import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { darken } from 'polished';

export const Container = styled.div`
	max-width: 600px;
	margin: 50px auto;

	display: flex;
	flex-direction: column;

	header {
		display: flex;
		align-self: center;
		align-items: center;

		button {
			border: 0;
			background: none;
		}

		strong {
			color: #fff;
			font-size: 24px;
			margin: 0 15px;
		}
	}

	ul {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 15px;
		margin-top: 30px;
	}
`;

export const Time = styled.li`
	padding: 20px;
	border-radius: 4px;
	background: #fff;

	opacity: ${props => (props.past ? 0.6 : 1)};

	strong {
		display: block;
		color: ${props => (props.available ? '#999' : '#ebb400')};
		font-size: 20px;
		font-weight: normal;
	}

	span {
		display: block;
		margin-top: 3px;
		color: ${props => (props.available ? '#999' : '#666')};
	}
`;

export const Card = styled.div`
	padding: 30px 350px;
`;

export const Button = styled.button`
	width: 100%;
	margin: 10px 0 0;
	height: 44px;
	background: ${props => (props.green ? '#008b45' : '#f64c75')};
	font-weight: bold;
	color: #fff;
	border: 0;
	border-radius: 4px;
	font-size: 16px;
	transition: background 0.2s;

	&:hover {
		background: ${darken(0.08, '#f64c75')};
`;

export const ButtonBlock = styled(Link)`
	width: 100%;
	margin: 10px 0 0;
	height: 44px;
	background: ${props => (props.green ? '#008b45' : '#f64c75')};
	font-weight: bold;
	color: #fff;
	border: 0;
	border-radius: 4px;
	font-size: 16px;
	transition: background 0.2s;

	&:hover {
		background: ${darken(0.08, '#f64c75')};
`;
