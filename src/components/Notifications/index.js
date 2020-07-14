import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { MdNotifications } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';
import socketio from 'socket.io-client';

import api from '~/services/api';

import {
	Container,
	Badge,
	NotificationList,
	Scroll,
	Notification,
} from './styles';

export default function Notifications() {
	const [visible, setVisible] = useState(false);
	const [notifications, setNotifications] = useState([]);

	const hasUnread = useMemo(
		() => !!notifications.find(notification => notification.read === false),
		[notifications]
	);

	const user = useSelector(state => state.user.profile);
	const server = 'http://167.99.165.125:9091';

	const user_id = user && user.id ? user.id : null;
	const socket = useMemo(
		() =>
			socketio(server, {
				query: {
					user_id,
				},
			}),
		[user_id]
	);

	useEffect(() => {
		socket.on('notification', notification => {
			setNotifications([notification, ...notifications]);
		});
	}, [socket, notifications]);

	useEffect(() => {
		async function loadNotifications() {
			const response = await api.get('notifications');

			const data = response.data.map(notification => ({
				...notification,
				timeDistance: formatDistance(
					parseISO(notification.createdAt),
					new Date(),
					{ addSuffix: true, locale: pt }
				),
			}));

			setNotifications(data);
		}

		loadNotifications();
	}, []);

	function handleToggleVisible() {
		setVisible(!visible);
	}

	async function handleMarkAsRead(id) {
		await api.put(`notifications/${id}`);

		setNotifications(
			notifications.map(notification =>
				notification._id === id ? { ...notification, read: true } : notification
			)
		);
	}

	return (
		<Container>
			<Badge onClick={handleToggleVisible} hasUnread={hasUnread}>
				<MdNotifications color="#ebb400" size={20} />
			</Badge>

			<NotificationList visible={visible}>
				<Scroll>
					{notifications.map(notification => (
						<Notification key={notification._id} unread={!notification.read}>
							<p>{notification.content}</p>
							<time>{notification.timeDistance}</time>
							{!notification.read && (
								<button
									type="button"
									onClick={() => handleMarkAsRead(notification._id)}
								>
									Marcar como lida
								</button>
							)}
						</Notification>
					))}
				</Scroll>
			</NotificationList>
		</Container>
	);
}
