import React, { useState, useEffect } from 'react';
import api from '~/services/api';

import { Container } from './styles';

export default function Phoness() {
	const [phones, setPhones] = useState([]);

	useEffect(() => {
		async function loadPhones() {
			const response = await api.get('phones');
			setPhones(response.data);
			console.tron.log(response.data);
		}

		loadPhones();
	}, [phones]); //eslint-disable-line

	return (
		<Container>
			{phones.lenght > 0 ? (
				<table>
					<thead>
						<tr>
							<th>Nome</th>
							<th>Telefone</th>
						</tr>
					</thead>
					<tbody>
						{phones.map(phone => (
							<tr key={phone.id}>
								<td>({phone.area_code}) {phone.number}</td>
								<td>
								{phone.Users.length() > 0 
								? phone.Users.map((user) => (
									<span>{user.name}</span>
									)) : <span>-</span>
								}
								</td>
								
							</tr>
						))}
					</tbody>
				</table>
			 ) : (
				<div>Não há registros</div>
			)} 
		</Container>
	);
}