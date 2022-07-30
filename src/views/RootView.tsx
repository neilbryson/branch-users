import { ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider } from '../contexts/Auth/Auth';
import { HomeView } from './HomeView';
import { LoginView } from './LoginView';
import { NotFoundView } from './NotFoundView';

function wrapProviders(children: ReactNode) {
  return <AuthProvider>{children}</AuthProvider>;
}

export const RootView = () => {
  return (
    <BrowserRouter basename={process.env.BASE_PATH || '/'}>
      <Routes>
        <Route path="/" element={wrapProviders(<LoginView />)} />
        <Route path="/home" element={wrapProviders(<HomeView />)} />
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </BrowserRouter>
  );
};
