import type { Action } from '../../types/Action';
import { users } from '../../utilities/mockData/users_data';

export const LOGIN_STATE = ['initial', 'invalid', 'pending', 'logged-in'] as const;
export type LoginState = typeof LOGIN_STATE[number];

export type User = {
  branchId: number;
  firstName: string;
  lastName: string;
  middleName: string;
  password: string;
  position: string;
  userName: string;
};

export type LoginInfo = Pick<User, 'branchId' | 'userName' | 'password'>;

export type AuthReducerState = {
  currentUser: string | null;
  errorMessage: string | null;
  state: LoginState;
  userDetails: Record<string, User>;
  userNames: readonly string[];
};

// this is just to memoise the default users, for easier searching
const initialUsers = users.reduce<[userNames: string[], userDetails: Record<string, User>]>(
  (prev, curr) => {
    prev[0].push(curr.userName);
    prev[1][curr.userName] = curr;
    return prev;
  },
  [[], {}],
);

export const initialState: AuthReducerState = {
  currentUser: null,
  errorMessage: null,
  state: 'initial',
  userDetails: { ...initialUsers[1] },
  userNames: [...initialUsers[0]],
};

export type AuthReducerActions =
  | Action<'LOGIN', LoginInfo>
  | Action<'LOGOUT'>
  | Action<'ADD', User>
  | Action<'REMOVE', string>;

function validate(
  loginInfo: LoginInfo,
  userNames: AuthReducerState['userNames'],
  userDetails: AuthReducerState['userDetails'],
): [shouldLogin: boolean, state: LoginState, errorMessage: string | null] {
  const { branchId, userName, password } = loginInfo;
  if (!branchId || !userName || !password) {
    return [false, 'invalid', 'Missing required fields'];
  }
  const details = userDetails[userName];
  if (!userNames.includes(userName) || !details || details.password !== password || details.branchId !== branchId) {
    return [false, 'invalid', 'Invalid credentials'];
  }

  return [true, 'logged-in', null];
}

export function authReducer(state: AuthReducerState, action: AuthReducerActions): AuthReducerState {
  switch (action.type) {
    case 'ADD': {
      const newUserName = action.payload.userName;
      if (state.userNames.includes(newUserName)) return state;
      return {
        ...state,
        userNames: [...state.userNames, newUserName],
        userDetails: { ...state.userDetails, [newUserName]: action.payload },
      };
    }
    case 'REMOVE': {
      // Prevent logged-in user from removing themselves
      if (action.payload === state.currentUser) return state;
      const nextUserNames = state.userNames.filter((userName) => userName !== action.payload);
      return {
        ...state,
        userNames: nextUserNames,
        userDetails: nextUserNames.reduce<Record<string, User>>((prev, curr) => {
          prev[curr] = state.userDetails[curr];
          return prev;
        }, {}),
      };
    }
    case 'LOGIN': {
      const [shouldLogin, nextState, errorMessage] = validate(action.payload, state.userNames, state.userDetails);
      return { ...state, state: nextState, errorMessage, currentUser: shouldLogin ? action.payload.userName : null };
    }
    case 'LOGOUT':
      return { ...state, state: 'initial', errorMessage: null, currentUser: null };
    default:
      return state;
  }
}
