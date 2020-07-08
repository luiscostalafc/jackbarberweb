import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '~/services/api';

import { deleteUserRequest } from '~/store/modules/user/actions';
import { Container } from './styles';

export default function Users() {
	const dispatch = useDispatch();

	function handleDelete(data) {
		dispatch(deleteUserRequest(data));
	}
	const [users, setUsers] = useState([]);

	useEffect(() => {
		async function loadUsers() {
			const response = await api.get('users');
			setUsers(response.data);
			console.tron.log(response.data);
		}

		loadUsers();
	}, [users]); //eslint-disable-line
	return (
		<Container>
			{/* {users.lenght > 0 ? ( */}
				<table>
					<thead>
						<tr>
							<th>Nome</th>
							<th>Email</th>
							<th>Prestador</th>
							<th>Ações</th>
						</tr>
					</thead>
					<tbody>
						{users.map(user => (
							<tr key={user.id}>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>{user.provider ? 'Sim' : 'Não'}</td>
								<td>
									<span>
										<Link to={`/admin/users/update/${user.id}`}>
											Editar
										</Link>
										<button
											type="button"
											onClick={() => {
												handleDelete(user.id);
											}}
										>
											Apagar
										</button>
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<Link to='/admin/users/create'>Adicionar</Link>
			{/* ) : (
				<div>Não há registros</div>
			)} */}
		</Container>
	);
}

