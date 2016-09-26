import { applyMiddleware, createStore, compose } from 'redux';
import { fromJS } from 'immutable';
import thunk from 'redux-thunk';
import createReducer from './reducers';

function configureStore() {
	const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
	return createStoreWithMiddleware(createReducer());
}

module.exports = configureStore;
