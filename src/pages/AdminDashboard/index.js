import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Card } from './styles';

const routes = [
	{ route: 'categories', title: 'Categorias' },
	{ route: 'users', title: 'Usuários' },
	{ route: 'providers', title: 'Prestadores' },
];

export default function AdminDashboard() {
	return (
		<Container>
			<ul>
				{routes.map(route => (
					<Card key={route.route}>
						<Link to={`/admin/${route.route}`}>
							<strong>{route.title}</strong>
						</Link>
					</Card>
				))}
			</ul>
		</Container>
	);
}
