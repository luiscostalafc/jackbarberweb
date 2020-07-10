import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
	max-width: 600px;
	margin: 5px auto;

	form {
		display: flex;
		flex-direction: column;
		margin-top: 0px;
		max-height: 550px

		input {
			background: rgba(0, 0, 0, 0.1);
			border: 0;
			border-radius: 4px;
			height: 44px;
			padding: 0 15px;
			color: #fff;
			margin: 0 0 5px;

			&::placeholder {
				color: rgba(255, 255, 255, 0.7);
			}
		}

		span {
			color: #f64c75;
			align-self: flex-start;
			margin: 0 0 10px;
			font-weight: bold;
		}

		hr {
			border: 0;
			height: 1px;
			background: rgba(255, 255, 255, 0.2);
			margin: 5px 0 10px;
		}

		button {
			margin: 10px 0 0;
			height: 44px;
			background: #008b45;
			font-weight: bold;
			color: #fff;
			border: 0;
			border-radius: 4px;
			font-size: 16px;
			transition: background 0.2s;

			&:hover {
				background: ${darken(0.03, '#008b45')};
			}
		}
	}

	> button {
		width: 100%;
		margin: 10px 0 0;
		height: 44px;
		background: #f64c75;
		font-weight: bold;
		color: #fff;
		border: 0;
		border-radius: 4px;
		font-size: 16px;
		transition: background 0.2s;

		&:hover {
			background: ${darken(0.08, '#f64c75')};
		}
	}
`;