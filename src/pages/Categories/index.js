import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '~/services/api';

import { deleteCategoryRequest } from '~/store/modules/category/actions';
import { Container, Card } from './styles';

export default function Categories() {
	const dispatch = useDispatch();

	function handleDelete(data) {
		dispatch(deleteCategoryRequest(data));
	}
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		async function loadCategories() {
			const response = await api.get('categories');
			setCategories(response.data);
			console.tron.log(response.data);
		}

		loadCategories();
	}, [categories]); //eslint-disable-line

	return (
		<Container>
			<ul>
				<Card>
					{Boolean(categories.lenght) ? (
						<table>
							<thead>
								<tr>
									<th>Nome</th>
									<th>Gênero</th>
									<th>Preço</th>
									<th>Ações</th>
								</tr>
							</thead>
							<tbody>
								{categories.map(category => (
									<tr key={category.id}>
										<td>{category.name}</td>
										<td>{category.gender === 1 ? 'Masculino' : 'Feminino'}</td>
										<td>{category.price}</td>
										<td>
											<span>
												<Link to={`/admin/categories/update/${category.id}`}>
													Editar
												</Link>
												<button
													type="button"
													onClick={() => {
														handleDelete(category);
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
					) : (
					<div>Não há registros</div>
					)}
					<Link to='/admin/categories/create'>Adicionar</Link>
				</Card>
			</ul>
		</Container>
	);
}
