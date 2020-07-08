import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams} from "react-router";
// import InputMask from "react-input-mask";
import { Form, Input } from '@rocketseat/unform';

import { signOut } from '~/store/modules/auth/actions';
import { getUserRequest, createUserRequest, updateUserRequest } from '~/store/modules/user/actions';

import { Container } from './styles';

export default function UsersForm() {
	const { id } = useParams();
	const dispatch = useDispatch();
	if (id) dispatch(getUserRequest(id));
	const provider = useSelector(state => state.provider);

	function handleSubmit(data) {
		if(data.id) {
			dispatch(updateUserRequest(data));
		}
		dispatch(createUserRequest(data));
	}

	function handleSignOut() {
		dispatch(signOut());
	}

	return (
		<Container>
			<Form initialData={provider} onSubmit={handleSubmit}>
				<Input name="id" type="hidden" />
				<Input name="name" placeholder="Nome completo" />
				<Input name="email" type="email" placeholder="Seu endereço de e-mail" />
				{/* <InputMask mask="(99) 99999-9999" placeholder="Telefone" name="phone" /> */}
				<Input name="phone"  placeholder="Seu número com DDD" />

				<hr />

				<Input name="password" type="password" placeholder="Nova senha" />

				<button type="submit">{provider && provider.id ? 'Editar': 'Inserir'}</button>
			</Form>

			<button type="button" onClick={handleSignOut}>
				Sair do JackBarber
			</button>
		</Container>
	);
}
