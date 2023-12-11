// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './src/slices/authSlice'

// Import your reducers here
// import someReducer from './someReducer';

const store = configureStore({
  reducer: {
    auth : authReducer,

    // Add your reducers here
    // someReducer,
  },
});

export default store;
