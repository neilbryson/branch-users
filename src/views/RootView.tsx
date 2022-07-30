import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useTheme } from '../hooks/useTheme';
import store from '../store/configureStore';
import { NotFoundView } from './NotFoundView';
import { SampleView } from './SampleView';

export const RootView = () => {
  useTheme();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SampleView />} />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
