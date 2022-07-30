import type { Action } from '../../../types/Redux';

export type SampleReducerState = {
  count: number;
};

export const LocalActions = {
  INCREMENT: '@sample/increment',
} as const;

export type Increment = Action<typeof LocalActions.INCREMENT>;

export type SampleActionTypes = Increment;
