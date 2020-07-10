import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams} from "react-router";
import { Form } from '@rocketseat/unform';

import { signOut } from '~/store/modules/auth/actions';
import { getCategoryRequest, createCategoryRequest, updateCategoryRequest } from '~/store/modules/category/actions';

import { Container, Button, InputDark, SelectDark, ButtonBlock } from './styles';

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
			<ButtonBlock to="/admin/categories">Voltar para lista</ButtonBlock>
			<Form initialData={category} onSubmit={handleSubmit}>
				<InputDark name="id" type="hidden" />
				<InputDark name="name" placeholder="Nome categoria" />
				<SelectDark
					name="gender"
					placeholder="Gênero"
					options={options}
					getOptionValue={option => option.id}
      		getOptionLabel={option => option.title}
					defaultValue={1}
				/>
				<InputDark name="price"  type="number" placeholder="Valor" />
				<Button type="submit">{category && category.id ? 'Editar': 'Inserir'}</Button>
			</Form>

			<Button type="button" onClick={handleSignOut}>
				Sair do JackBarber
			</Button>
		</Container>
	);
}
