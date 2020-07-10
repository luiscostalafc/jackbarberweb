import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import AuthLayout from '~/pages/_layouts/auth';
import DefaultLayout from '~/pages/_layouts/default';

import { store } from '~/store';

export default function RouteWrapper({
	component: Component,
	isPrivate,
	...rest
}) {
	const { signed } = store.getState().auth;
	const is_admin = store.getState() && store.getState().user && store.getState().user.profile && store.getState().user.profile.is_admin ? store.getState().user.profile.is_admin : false;

	if (!signed && isPrivate) {
		return <Redirect to="/" />;
	}

	if (signed && !isPrivate) {
		return <Redirect to="/dashboard" />;
	}

	if (signed && is_admin) {
		return <Redirect to="/admin/dashboard" />;
	}

	const Layout = signed ? DefaultLayout : AuthLayout;

	return (
		<Route
			{...rest}
			render={props => (
				<Layout>
					<Component {...props} />
				</Layout>
			)}
		/>
	);
}

RouteWrapper.propTypes = {
	isPrivate: PropTypes.bool,
	component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
		.isRequired,
};

RouteWrapper.defaultProps = {
	isPrivate: false,
};
