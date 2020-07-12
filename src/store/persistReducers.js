import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
	const persistedReducer = persistReducer(
		{
			key: 'jackbarber',
			storage,
			whitelist: ['auth', 'user', 'schedule', 'category'],
		},
		reducers
	);

	return persistedReducer;
};
