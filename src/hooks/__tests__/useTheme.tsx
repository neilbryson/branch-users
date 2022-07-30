import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect } from 'react';

import { useTheme } from '../useTheme';

describe('useTheme', () => {
  const TestComponent = ({ initialTheme = 'light' }: { initialTheme?: 'dark' | 'light' }) => {
    const { changeTheme, removeTheme } = useTheme();

    useEffect(() => {
      changeTheme(initialTheme);
    }, [changeTheme, initialTheme]);

    function handleChangeTheme(): void {
      const currentTheme = localStorage.getItem('theme');
      changeTheme(currentTheme === 'dark' ? 'light' : 'dark');
    }

    return (
      <div data-testid="useTheme-container">
        <button onClick={handleChangeTheme}>changeTheme</button>
        <button onClick={removeTheme}>removeTheme</button>
      </div>
    );
  };

  afterEach(() => {
    global.localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  describe('changeTheme', () => {
    it('changes to dark theme', async () => {
      const user = userEvent.setup();
      render(<TestComponent />);
      expect(document.documentElement).not.toHaveClass('dark');
      await user.click(screen.getByText('changeTheme'));
      expect(document.documentElement).toHaveClass('dark');
      expect(global.localStorage.getItem('theme')).toBe('dark');
    });

    it('changes to light theme', async () => {
      const user = userEvent.setup();
      render(<TestComponent initialTheme="dark" />);
      expect(document.documentElement).toHaveClass('dark');
      await user.click(screen.getByText('changeTheme'));
      expect(document.documentElement).not.toHaveClass('dark');
      expect(global.localStorage.getItem('theme')).toBe('light');
    });
  });

  it('removes the set theme', async () => {
    const user = userEvent.setup();
    render(<TestComponent />);
    await user.click(screen.getByText('changeTheme'));
    expect(document.documentElement).toHaveClass('dark');
    expect(global.localStorage.getItem('theme')).not.toBeNull();

    await user.click(screen.getByText('removeTheme'));
    expect(document.documentElement).not.toHaveClass('dark');
    expect(global.localStorage.getItem('theme')).toBeNull();
  });
});
