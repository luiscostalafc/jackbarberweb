import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams} from "react-router";
import { Form, Input } from '@rocketseat/unform';

import { signOut } from '~/store/modules/auth/actions';
import { getCategoryRequest, createCategoryRequest, updateCategoryRequest } from '~/store/modules/category/actions';

import { Container } from './styles';

export default function CategoriesForm() {
	const { id } = useParams();
	const dispatch = useDispatch();
	if (id) dispatch(getCategoryRequest(id));
	const category = useSelector(state => state.category);

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
			<Form initialData={category} onSubmit={handleSubmit}>
				<Input name="id" type="hidden" />
				<Input name="name" placeholder="Nome categoria" />
				<Input name="gender" placeholder="Gênero" />
				<Input name="price"  placeholder="Valor" />
				<button type="submit">{category && category.id ? 'Editar': 'Inserir'}</button>
			</Form>

			<button type="button" onClick={handleSignOut}>
				Sair do JackBarber
			</button>
		</Container>
	);
}
