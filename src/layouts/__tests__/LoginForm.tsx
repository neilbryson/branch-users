import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { users } from '../../utilities/mockData/users_data';
import { render } from '../../utilities/testUtilities';
import { LoginForm } from '../LoginForm';

describe('Login form', () => {
  it('renders with the correct labels', () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText('Branch ID')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('User name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('LOGIN')).toBeInTheDocument();
  });

  it('should login if the credentials are correct', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    expect(screen.getByText('LOGIN')).toHaveAttribute('disabled');
    await user.type(screen.getByPlaceholderText('Branch ID'), users[0].branchId.toString());
    await user.type(screen.getByPlaceholderText('User name'), users[0].userName);
    await user.type(screen.getByPlaceholderText('Password'), users[0].password);
    await user.click(screen.getByText('LOGIN'));
    expect(screen.getByText('LOGIN')).not.toHaveAttribute('disabled');
    expect(screen.queryByTestId('login-error-message')).not.toBeInTheDocument();
  });

  it('should disable the button if the form is incomplete', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    await user.type(screen.getByPlaceholderText('User name'), users[0].userName);
    expect(screen.getByText('LOGIN')).toHaveAttribute('disabled');
  });

  it.each<[branchId: number, userName: string, password: string]>([
    [users[0].branchId, users[0].userName, 'hassword'],
    [users[0].branchId, users[1].userName, users[0].password],
    [1241, users[2].userName, users[2].password],
  ])('should show an error message if the credentials are invalid (%p, %p)', async (branchId, userName, password) => {
    const user = userEvent.setup();
    render(<LoginForm />);
    await user.type(screen.getByPlaceholderText('Branch ID'), branchId.toString());
    await user.type(screen.getByPlaceholderText('User name'), userName);
    await user.type(screen.getByPlaceholderText('Password'), password);
    await user.click(screen.getByText('LOGIN'));
    const errorContainer = screen.getByTestId('login-error-message');
    expect(errorContainer).toBeInTheDocument();
    expect(errorContainer).toHaveTextContent(/Invalid credentials/);
  });
});
