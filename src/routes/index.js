import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './Route';

import SingIn from '../pages/SingIn';
// import SingUp from '../pages/SingUp';

import Dashboard from '../pages/Dashboard';
import AdminDashboard from '../pages/AdminDashboard';
import Profile from '../pages/Profile';
import Schedules from '~/pages/Schedules';
import Phones from '~/pages/Phones';
import Categories from '~/pages/Categories';
import CategoriesForm from '~/pages/CategoriesForm';
import Users from '~/pages/Users';
import UsersForm from '~/pages/UsersForm';

export default function Routes() {
	return (
		<Switch>
			<Route path="/" exact component={SingIn} />
			{/* <Route path="/register" component={SingUp} /> */}

			<Route path="/dashboard" component={Dashboard} isPrivate />
			<Route path="/profile" component={Profile} isPrivate />
			<Route
				path="/admin/dashboard"
				exact
				component={AdminDashboard}
				isPrivate
				isAdmin
			/>
			<Route path="/admin/schedules" exact component={Schedules} isPrivate isAdmin />
			<Route path="/admin/phones" exact component={Phones} isPrivate isAdmin />
			<Route
				exact
				path="/admin/categories"
				component={Categories}
				isPrivate
				isAdmin
			/>
			<Route
				exact
				path="/admin/categories/create"
				component={CategoriesForm}
				isPrivate
				isAdmin
			/>
			<Route
				exact
				path="/admin/categories/update/:id"
				component={CategoriesForm}
				isPrivate
				isAdmin
			/>
			<Route path="/admin/users" exact component={Users} isPrivate isAdmin />
			<Route
				exact
				path="/admin/users/create"
				component={UsersForm}
				isPrivate
				isAdmin
			/>
			<Route
				exact
				path="/admin/users/update/:id"
				component={UsersForm}
				isPrivate
				isAdmin
			/>
		</Switch>
	);
}
