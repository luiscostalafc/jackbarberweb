import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

const routes = ['schedules', 'phones', 'categories', 'users'];

export default function AdminDashboard() {
	return (
		<Container>
			<ul>
				{routes.map(route => (
					<Link to={`/admin/${route}`}>{route}</Link>
				))}
			</ul>
		</Container>
	);
}
