import styled from 'styled-components';

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

export const Card = styled.li`
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
