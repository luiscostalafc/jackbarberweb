import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
	format,
	subDays,
	addDays,
	setHours,
	setMinutes,
	setSeconds,
	setMilliseconds,
	isBefore,
	isEqual,
	parseISO,
} from 'date-fns';
import { useParams } from 'react-router';
import { utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { store } from '~/store';
import api from '~/services/api';

import { createUnavaliableRequest } from '~/store/modules/schedule/actions';
import { Container, Time, Button } from './styles';

const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

export default function Dashboard() {
	const is_admin =
		store.getState() &&
		store.getState().user &&
		store.getState().user.profile &&
		store.getState().user.profile.is_admin
			? store.getState().user.profile.is_admin
			: false;
	const [date, setDate] = useState(new Date());
	const [schedule, setSchedule] = useState([]);
	const { id } = useParams();
	const provider_id = store.getState().user.profile.id;

	const dispatch = useDispatch();

	const dateFormatted = useMemo(
		() => format(date, "d 'de' MMMM", { locale: pt }),
		[date]
	);

	const dateBD = useMemo(() => format(date, 'y-MM-dd', { locale: pt }), [date]);

	useEffect(() => {
		async function loadSchedule() {
			const response = await api.post('providers/available', {
				provider_id,
				date: dateBD,
			});

			const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

			const data = range.map(hour => {
				const checkDate = hour =>
					setMilliseconds(
						setSeconds(setMinutes(setHours(date, hour), 0), 0),
						0
					);
				const compareDate = utcToZonedTime(checkDate(hour), timezone);
				return {
					time: `${hour}:00h`,
					past: isBefore(compareDate, new Date()),
					appointment: response.data.find(a =>
						isEqual(parseISO(a.value), compareDate)
					),
					user: response.data.user,
				};
			});

			setSchedule(data);
			console.tron.log(data);
		}

		loadSchedule();
	}, [date]); //eslint-disable-line
	console.log(is_admin);
	function handleUnvaliable(time) {
		const data = {
			date: time,
		};
		dispatch(createUnavaliableRequest(data));
	}

	function handlePrevDay() {
		setDate(subDays(date, 1));
	}

	function handleNextDay() {
		setDate(addDays(date, 1));
	}

	return (
		<Container>
			<header>
				<button type="button" onClick={handlePrevDay}>
					<MdChevronLeft size={36} color="#fff" />
				</button>
				<strong>{dateFormatted}</strong>
				<button type="button" onClick={handleNextDay}>
					<MdChevronRight size={36} color="#fff" />
				</button>
			</header>

			<ul>
				{schedule.map(time => (
					<Time key={time.time} past={time.past} available={!time.appointment}>
						<strong>{time.time}</strong>
						<span>
							{time.appointment && time.user ? time.user.name : 'Em aberto'}
						</span>
						<br />
						<span>
							{time.appointment && time.user && time.user.phone
								? `Fone: ${time.user.phone[0]}`
								: ''}
						</span>
						<br />
						<span>
							{time.appointment && time.user && time.user.services
								? `Serviços: ${time.user.services}`
								: ''}
						</span>
						<br />
						{id && time.appointment && time.appointment.value && (
							<Button onClick={() => handleUnvaliable(time.appointment.value)}>
								Deixar Indisponível
							</Button>
						)}
					</Time>
				))}
			</ul>
		</Container>
	);
}
