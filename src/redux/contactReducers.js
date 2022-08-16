import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { changeFilter } from './contactActions';

export const filterReducer = createReducer('', {
    [changeFilter]: (_, { payload }) => payload,
});

// const itemsReducer = createReducer(initialContacts, {
//     [addContact]: (state, { payload }) => {state.push(payload)},
//     [deleteContact]: (state, { payload }) => state.filter(item => item.id !== payload),
// });

export default combineReducers({
    // items: itemsReducer,
    filter: filterReducer,
});