import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Notifications from '~/components/Notifications';

import logo from '~/assets/logo1.png';
import { Container, Content, Profile } from './styles';

export default function Header() {
	const profile = useSelector(state => state.user.profile);

	return (
		<Container>
			<Content>
				<nav>
					<img src={logo} alt="JackBarber" />
					<Link to="/dashboard">DASHBOARD</Link>
				</nav>

				<aside>
					<Notifications />

					{profile 
					? <Profile>
						<div>
							<strong>{profile.name}</strong>
							<Link to="/profile">Meu perfil</Link>
						</div>
						<img
							src={
								(profile.avatar && profile.avatar.url2) ||
								`https://api.adorable.io/avatars/50/${profile.email}`
							}
							alt={`Foto de perfil de ${profile.name}`}
						/>
					</Profile>
					: <div>Não logado</div>}
				</aside>
			</Content>
		</Container>
	);
}
