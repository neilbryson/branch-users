import { useState } from 'react';

import { Button } from '../components/Button';
import { TextInput } from '../components/TextInput';

export const LoginForm = () => {
  const [branchId, setBranchId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <section className="border border-gray-800 w-full h-full md:w-96 md:h-96 p-8">
      <h1 className="text-2xl font-bold mb-8">Login</h1>
      <div className="flex flex-col">
        <TextInput type="number" placeholder="Branch id" value={branchId} />
        <TextInput type="text" placeholder="User name" value={username} />
        <TextInput type="password" placeholder="Password" value={password} />
        <Button isPrimary>LOGIN</Button>
      </div>
    </section>
  );
};
