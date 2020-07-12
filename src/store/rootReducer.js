import { combineReducers } from 'redux';

import auth from './modules/auth/reducer';
import user from './modules/user/reducer';
import category from './modules/category/reducer';
import schedule from './modules/schedule/reducer';

export default combineReducers({
	auth,
	user,
	category,
	schedule,
});
