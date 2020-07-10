import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { darken } from 'polished';

export const Container = styled.div`
	align-self: center;
	margin-bottom: 10px;

	label {
		cursor: pointer;

		&:hover {
			opacity: 0.7;
		}

		img {
			height: 120px;
			width: 120px;
			border-radius: 50%;
			border: 3px solid rgba(255, 255, 255, 0.3);
			background: #eee;
		}

		input {
			display: none;
		}
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

