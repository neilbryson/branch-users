import { Increment, LocalActions } from './types';

export const increment = (): Increment => ({
  type: LocalActions.INCREMENT,
});
