import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
	max-width: 600px;
	margin: 20px auto;

	form {
		max-height: 450px;
		display: flex;
		flex-direction: column;
		margin-top: 20px;
		}

		input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 35px;
      padding: 0 10px;
      color: #fff;
      margin: 0 0 10px;
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
			margin: 10px 0 20px;
		}

		button {
			margin: 5px 0 0;
			height: 35px;
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

		a {
      color: #fff;
      margin-top: 10px;
      font-size: 16px;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
  }
	}

	> button {
		width: 100%;
		margin: 10px 0 0;
		height: 35px;
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
