import { useMemo, useState } from 'react';

import { Button } from '../components/Button';
import { TextInput } from '../components/TextInput';

export const LoginForm = () => {
  const [branchId, setBranchId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const canLogin = useMemo(() => {
    // ensure branch id is numeric at least
    if (!branchId || Number.isNaN(branchId)) return false;
    return username || password;
  }, [branchId, username, password]);

  return (
    <section className="border border-gray-800 w-full h-full md:w-96 md:h-96 p-8">
      <h1 className="text-2xl font-bold mb-8">Login</h1>
      <div className="flex flex-col">
        <TextInput
          type="number"
          placeholder="Branch id"
          onChange={(e) => setBranchId(e.target.value)}
          value={branchId}
        />
        <TextInput type="text" placeholder="User name" onChange={(e) => setUsername(e.target.value)} value={username} />
        <TextInput
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button disabled={!canLogin} isPrimary>
          LOGIN
        </Button>
      </div>
    </section>
  );
};
