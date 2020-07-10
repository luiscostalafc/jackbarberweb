import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams} from "react-router";
import api from '~/services/api';

import DataTable from 'react-data-table-component';
// import memoize from 'memoize-one';
import { deleteUserRequest } from '~/store/modules/user/actions';
import { Container, Card, Button, ButtonBlock } from './styles';

export default function Users() {
	const [users, setUsers] = useState([]);
	const dispatch = useDispatch();
	const { userType } = useParams();
	const type = userType === 'users' ? 'not_providers' : 'providers';

	useEffect(() => {
		async function loadUsers() {
			const response = await api.get(`users/${type}`);
			setUsers(response.data);
			console.tron.log(response.data);
		}

		loadUsers();
	}, [users]); //eslint-disable-line
	
	const handleDelete = useCallback(id => {
		dispatch(deleteUserRequest(id));
	},[dispatch]);

	const paginationOptions = { rowsPerPageText: 'Registros por página', rangeSeparatorText: 'de', selectAllRowsItem: true, selectAllRowsItemText: 'Total' };
	const columns = useMemo(() => [
		{
			name: 'Nome',
			selector: 'name',
			sortable: true,
		},
		{
			name: 'Email',
			selector: 'email',
			sortable: true,
		},
		{
			name: 'Telefone',
			cell: (row) => (
				Boolean(row.phones) ? row.phones.map(phone => <span>({phone.area_code}) {phone.number}</span>) : <span>-</span>
			),
		},
		{
			name: 'Ações',
			cell: (row) => (
				<>
					{userType === 'providers' && <ButtonBlock to={`/admin/schedules/${row.id}`} green>Agenda</ButtonBlock>}
					<Button onClick={() => { handleDelete(row.id);}}>Apagar</Button>
				</>
			),
			ignoreRowClick: true,
			allowOverflow: true,
			button: true,
		}
	],[handleDelete, userType]);

	return (
		<Container>
			<Card>
				<DataTable
					title={userType === 'users' ? 'Lista de Usuários' : 'Lista de Prestadores'}
					columns={columns}
					data={users}
					pagination
					paginationComponentOptions={paginationOptions}
					theme='dark'
				/>
				{userType === 'providers' && <ButtonBlock to='/admin/users/create'>Adicionar</ButtonBlock>}	
			</Card>
		</Container>
	);
}

