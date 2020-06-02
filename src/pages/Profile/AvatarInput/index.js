import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import api from '~/services/api';

import { Container } from './styles';

export default function AvatarInput() {
	const { defaultValue, registerField } = useField('avatar');
	const { email } = useField('email');

	const [file, setFile] = useState(defaultValue && defaultValue.id);
	const [preview, setPreview] = useState(defaultValue && defaultValue.url2);

	const ref = useRef();

	useEffect(() => {
		if (ref.current) {
			registerField({
				name: 'avatar_id',
				ref: ref.current,
				path: 'dataset.file',
			});
		}
	}, [ref.registerField]); //eslint-disable-line

	async function hanldeChange(e) {

			const data = new FormData();

			data.append('file', e.target.files[0]);

			const response = await api.post('files', data);

			const { id, url2 } = response.data;

			setFile(id);
		 setPreview(url2);



	}

	return (
		<Container>
			<label htmlFor="avatar">
				<img
					src={preview || `https://api.adorable.io/avatars/120/${email}`}
					alt="Foto do perfil"
				/>

				<input
					type="file"
					id="avatar"
					accept="image/*"
					onChange={hanldeChange}
					data-file={file}
					ref={ref}
				/>
			</label>
		</Container>
	);
}
