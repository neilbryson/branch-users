import { useLocation } from 'react-router-dom';

export const NotFoundView = () => {
  const { pathname } = useLocation();

  return (
    <main>
      <h1 className="text-2xl font-bold">Not found</h1>
      <span className="text-lg">
        Invalid path <span className="font-mono">{pathname}</span>
      </span>
    </main>
  );
};
