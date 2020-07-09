import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Card } from './styles';

const routes = ['schedules', 'phones', 'categories', 'users'];

export default function AdminDashboard() {
	return (
		<Container>
			<ul>
				{routes.map(route => (
					<Card key={route}>
						<Link to={`/admin/${route}`}>
							<strong>{route}</strong>
						</Link>
					</Card>
				))}
			</ul>
		</Container>
	);
}
