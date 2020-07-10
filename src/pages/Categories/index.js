import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import api from '~/services/api';

import DataTable from 'react-data-table-component';
import { deleteCategoryRequest } from '~/store/modules/category/actions';
import { Container, Card, Button, ButtonBlock } from './styles';

export default function Categories() {
	const dispatch = useDispatch();

	const handleDelete = useCallback(data => {
		dispatch(deleteCategoryRequest(data));
	},[dispatch]);

	const [categories, setCategories] = useState([]);

	useEffect(() => {
		async function loadCategories() {
			const response = await api.get('categories');
			setCategories(response.data);
			console.tron.log(response.data);
		}

		loadCategories();
	}, [categories]); //eslint-disable-line

	const paginationOptions = { rowsPerPageText: 'Registros por página', rangeSeparatorText: 'de', selectAllRowsItem: true, selectAllRowsItemText: 'Total' };
	const columns = useMemo(() => [
		{
			name: 'Nome',
			selector: 'name',
			sortable: true,
		},
		{
			name: 'Gênero',
			selector: 'gender',
			cell: (row) => (row.gender === 1 ? 'Masculino' : 'Feminino'),
			sortable: true,
		},
		{
			name: 'Preço',
			selector: 'price',
			sortable: true,
		},
		{
			name: 'Ações',
			cell: (row) => (
				<>
					<ButtonBlock to={`/admin/categories/update/${row.id}`} green>
						Editar
					</ButtonBlock>
					<Button
						type="button"
						onClick={() => {
							handleDelete(row);
						}}
					>
						Apagar
					</Button>
				</>
			),
			ignoreRowClick: true,
			allowOverflow: true,
			button: true,
		}
	],[handleDelete]);

	return (
		<Container>
			<Card>
				<DataTable
					title='Categorias'
					columns={columns}
					data={categories}
					pagination
					paginationComponentOptions={paginationOptions}
					theme='dark'
				/>
				<ButtonBlock to='/admin/categories/create' green>Adicionar</ButtonBlock>	
			</Card>
		</Container>
	);
}
