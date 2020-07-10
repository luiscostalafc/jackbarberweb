import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams} from "react-router";
import { Link } from 'react-router-dom';
import api from '~/services/api';

import { deleteUserRequest } from '~/store/modules/user/actions';
import { Container } from './styles';

export default function Users() {
	const dispatch = useDispatch();
	const { userType } = useParams();
	const type = userType === 'users' ? 'not_providers' : 'providers';

	function handleDelete(data) {
		dispatch(deleteUserRequest(data));
	}
	const [users, setUsers] = useState([]);

	useEffect(() => {
		async function loadUsers() {
			const response = await api.get(`users/${type}`);
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
							<th>Telefones</th>
							<th>Ações</th>
						</tr>
					</thead>
					<tbody>
						{users.map(user => (
							<tr key={user.id}>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>{Boolean(user.phones) ? user.phones.map(phone => <span>({phone.area_code}) {phone.number}</span>) : <span>-</span>}</td>
								<td>
									<span>
										{userType === 'providers' && <Link to={`/admin/schedule/${user.id}`}>Agenda</Link>}
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

