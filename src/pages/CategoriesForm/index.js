import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams} from "react-router";
import { Form, Input, Select } from '@rocketseat/unform';

import { signOut } from '~/store/modules/auth/actions';
import { getCategoryRequest, createCategoryRequest, updateCategoryRequest } from '~/store/modules/category/actions';

import { Container } from './styles';

export default function CategoriesForm() {
	const { id } = useParams();
	const dispatch = useDispatch();
	if (id) dispatch(getCategoryRequest(id));
	const category = useSelector(state => state.category);

	const options = [
		{id: 1, title: "Feminino"},
		{id: 2, title: "Masculino"}
	];

	function handleSubmit(data) {
		if(data.id) {
			dispatch(updateCategoryRequest(data));
		}
		dispatch(createCategoryRequest(data));
	}

	function handleSignOut() {
		dispatch(signOut());
	}

	return (
		<Container>
			<Link to="/admin/categories">Voltar para lista</Link>
			<Form initialData={category} onSubmit={handleSubmit}>
				<Input name="id" type="hidden" />
				<Input name="name" placeholder="Nome categoria" />
				<Select
					name="gender"
					placeholder="Gênero"
					options={options}
					getOptionValue={option => option.id}
      		getOptionLabel={option => option.title}
					defaultValue={1}
				/>
				<Input name="price"  type="number" placeholder="Valor" />
				<button type="submit">{category && category.id ? 'Editar': 'Inserir'}</button>
			</Form>

			<button type="button" onClick={handleSignOut}>
				Sair do JackBarber
			</button>
		</Container>
	);
}
