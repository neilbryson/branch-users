import { Button } from '../components/Button';
import { TableCell } from '../components/TableCell';
import { TableHeader } from '../components/TableHeader';
import { useAuth } from '../contexts/Auth/Auth';
import { buildFullName } from '../utilities/buildFullName';

export const UserList = () => {
  const { authState, authDispatch } = useAuth();

  function renderHeaders() {
    return (
      <tr>
        <TableHeader>#</TableHeader>
        <TableHeader>Branch ID</TableHeader>
        <TableHeader>Username</TableHeader>
        <TableHeader>Name</TableHeader>
        <TableHeader>Position</TableHeader>
        <TableHeader>Action</TableHeader>
      </tr>
    );
  }

  function renderContents() {
    return authState.userNames.map((userName, index) => {
      const user = authState.userDetails[userName];
      if (!user) return null;
      const isLoggedInUser = user.userName === authState.currentUser;
      return (
        <tr key={userName}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{user.branchId}</TableCell>
          <TableCell>{user.userName}</TableCell>
          <TableCell>{buildFullName(user.firstName, user.middleName, user.lastName)}</TableCell>
          <TableCell>{user.position}</TableCell>
          <TableCell>
            <Button
              disabled={isLoggedInUser}
              isPrimary={false}
              onClick={() => authDispatch({ type: 'REMOVE', payload: user.userName })}
              title={isLoggedInUser ? `You can't remove your own account` : undefined}
            >
              Remove
            </Button>
          </TableCell>
        </tr>
      );
    });
  }

  return (
    <table className="self-start w-full mt-4 md:ml-4">
      <thead>{renderHeaders()}</thead>
      <tbody>{renderContents()}</tbody>
    </table>
  );
};
