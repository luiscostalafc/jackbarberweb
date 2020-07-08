import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import category from './category/sagas';
import phone from './phone/sagas';
import schedule from './schedule/sagas';

export default function* rootSaga() {
	return yield all([auth, user, category, phone, schedule]);
}
