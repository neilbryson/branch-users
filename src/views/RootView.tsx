import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import store from '../store/configureStore';
import { LoginView } from './LoginView';
import { NotFoundView } from './NotFoundView';

export const RootView = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
