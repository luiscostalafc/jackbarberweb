import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import category from './category/reducer';
import phone from './phone/reducer';
import schedule from './schedule/reducer';

export default combineReducers({
	auth,
	user,
	category,
	phone,
	schedule,
});
