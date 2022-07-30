import { type RenderOptions, type RenderResult, render as baseRender } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { AuthProvider } from '../contexts/Auth/Auth';

const RequiredProviders = ({ children }: { children: ReactNode }) => {
  return (
    <MemoryRouter initialEntries={[{ pathname: '/', search: '' }]}>
      <AuthProvider>{children}</AuthProvider>
    </MemoryRouter>
  );
};

export const render = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>): RenderResult =>
  baseRender(ui, { wrapper: RequiredProviders, ...options });
