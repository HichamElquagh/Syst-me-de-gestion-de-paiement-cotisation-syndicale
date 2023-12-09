// redux/store.js
import { configureStore } from '@reduxjs/toolkit';

// Import your reducers here
// import someReducer from './someReducer';

const store = configureStore({
  reducer: {
    // Add your reducers here
    // someReducer,
  },
});

export default store;
