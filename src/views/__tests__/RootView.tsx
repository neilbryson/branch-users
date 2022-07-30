import { render } from '@testing-library/react';

import { RootView } from '../RootView';

describe('RootView', () => {
  it('renders without crashing', () => {
    const { container } = render(<RootView />);
    expect(container.firstChild).not.toBeNull();
  });
});
