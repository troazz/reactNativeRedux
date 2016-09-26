import app from './reducers/app';
import { combineReducers } from 'redux-immutable';

const applicationReducers = {
    app,
};
export default function createReducer() {
	return combineReducers(applicationReducers);
}
