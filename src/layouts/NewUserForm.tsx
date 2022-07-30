import { type ChangeEvent, useEffect, useReducer } from 'react';

import { Button } from '../components/Button';
import { TextInput } from '../components/TextInput';
import { useAuth } from '../contexts/Auth/Auth';
import type { User } from '../contexts/Auth/authReducer';
import type { Action } from '../types/Action';

const initialState: User = {
  branchId: -1,
  lastName: '',
  middleName: '',
  userName: '',
  firstName: '',
  password: '',
  position: '',
};

export const NewUserForm = () => {
  const [formState, formDispatch] = useReducer(newUserFormReducer, { ...initialState, canAdd: false });
  const { authState, authDispatch } = useAuth();

  useEffect(() => {
    formDispatch({ type: 'RESET' });
  }, [authState]);

  function setValue<U extends User>(key: keyof U) {
    return (e: ChangeEvent<HTMLInputElement>) => {
      formDispatch({ type: 'SET', payload: { key: key as keyof User, value: e.target.value } });
    };
  }

  function onClickAdd(): void {
    const { canAdd, ...state } = formState;
    authDispatch({ type: 'ADD', payload: state });
  }

  return (
    <div className="p-4 bg-gray-400 w-full md:w-96">
      <div className="flex flex-col">
        <TextInput
          type="number"
          placeholder="Branch ID"
          onChange={(e) =>
            formDispatch({ type: 'SET', payload: { key: 'branchId', value: parseInt(e.target.value) || -1 } })
          }
          value={formState.branchId === -1 ? '' : formState.branchId}
        />
        <TextInput placeholder="Username" onChange={setValue('userName')} value={formState.userName} />
        <TextInput placeholder="First Name" onChange={setValue('firstName')} value={formState.firstName} />
        <TextInput placeholder="Middle Name" onChange={setValue('middleName')} value={formState.middleName} />
        <TextInput placeholder="Last Name" onChange={setValue('lastName')} value={formState.lastName} />
        <TextInput placeholder="Position" onChange={setValue('position')} value={formState.position} />
        <TextInput type="password" onChange={setValue('password')} placeholder="Password" value={formState.password} />
      </div>
      <div className="flex justify-end mt-4">
        <Button className="mr-2" isPrimary={false} onClick={() => formDispatch({ type: 'RESET' })}>
          RESET
        </Button>
        <Button disabled={!formState.canAdd} onClick={onClickAdd}>
          ADD
        </Button>
      </div>
    </div>
  );
};

type NewUserFormReducerState<U extends User> = U & { canAdd: boolean };
type NewUserFormReducerActions<U extends User> = Action<'SET', { key: keyof U; value: U[keyof U] }> | Action<'RESET'>;

function validate<U extends User>(state: NewUserFormReducerState<U>): boolean {
  const { branchId, firstName, lastName, middleName, userName, position, password } = state;
  if (!branchId || Number.isNaN(branchId)) return false;
  return (
    firstName !== '' && lastName !== '' && middleName !== '' && userName !== '' && position !== '' && password !== ''
  );
}

function newUserFormReducer<U extends User>(
  state: NewUserFormReducerState<U>,
  action: NewUserFormReducerActions<U>,
): NewUserFormReducerState<U> {
  switch (action.type) {
    case 'SET': {
      const { key, value } = action.payload;
      const nextState = { ...state, [key]: value };
      return { ...nextState, canAdd: validate(nextState) };
    }
    case 'RESET':
      return { ...state, canAdd: false, ...initialState };
    default:
      return state;
  }
}
