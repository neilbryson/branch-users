import { useMemo, useState } from 'react';

import { Button } from '../components/Button';
import { ErrorMessage } from '../components/ErrorMessage';
import { TextInput } from '../components/TextInput';
import { useAuth } from '../contexts/Auth/Auth';

export const LoginForm = () => {
  const [branchId, setBranchId] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const canLogin = useMemo(() => {
    // ensure branch id is numeric at least
    if (!branchId || Number.isNaN(branchId)) return false;
    return !(!userName || !password);
  }, [branchId, userName, password]);
  const { authDispatch, authState } = useAuth();

  function onClickLogin(): void {
    if (!canLogin) return;
    const id = parseInt(branchId);
    authDispatch({ type: 'LOGIN', payload: { branchId: id, userName, password } });
  }

  return (
    <section className="border border-gray-800 w-full h-full md:w-96 md:h-96 p-8">
      <h1 className="text-2xl font-bold mb-8">Login</h1>
      <div className="flex flex-col">
        <TextInput
          type="number"
          placeholder="Branch ID"
          onChange={(e) => setBranchId(e.target.value)}
          value={branchId}
        />
        <TextInput type="text" placeholder="User name" onChange={(e) => setUserName(e.target.value)} value={userName} />
        <TextInput
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button disabled={!canLogin} isPrimary onClick={onClickLogin}>
          LOGIN
        </Button>
        {authState.errorMessage && (
          <ErrorMessage data-testid="login-error-message">{authState.errorMessage}</ErrorMessage>
        )}
      </div>
    </section>
  );
};
