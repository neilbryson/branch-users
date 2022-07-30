import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { NotFoundView } from '../NotFoundView';

describe('NotFoundView', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/sample' }]}>
        <NotFoundView />
      </MemoryRouter>,
    );
    expect(screen.getByText('Not found')).toBeInTheDocument();
  });
});
