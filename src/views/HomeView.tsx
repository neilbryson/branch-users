import { Button } from '../components/Button';
import { useAuth } from '../contexts/Auth/Auth';
import { NewUserForm } from '../layouts/NewUserForm';
import { UserList } from '../layouts/UserList';

export const HomeView = () => {
  const { authDispatch, authState } = useAuth();
  if (authState.state !== 'logged-in') return null;
  return (
    <main className="w-screen h-screen p-12">
      <header className="flex flex-col md:flex-row md:justify-between md:content-center">
        <h1 className="text-2xl">{authState.currentUser}</h1>
        <Button onClick={() => authDispatch({ type: 'LOGOUT' })}>LOGOUT</Button>
      </header>
      <div className="mt-8 flex flex-col md:flex-row md:w-full">
        <NewUserForm />
        <UserList />
      </div>
    </main>
  );
};
