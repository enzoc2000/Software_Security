import {configureStore} from '@reduxjs/toolkit';
import {counterReducer} from './counterSlice';
import {usersReducer} from './usersSlice';

export default configureStore({
    reducer: {
        counter: counterReducer,
        users: usersReducer,
    },
});