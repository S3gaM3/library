// App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import AppRoutes from './routes.tsx';

const App = () => {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
};

export default App;
