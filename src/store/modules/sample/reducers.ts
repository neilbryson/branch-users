import { type SampleActionTypes, type SampleReducerState, LocalActions } from './types';

const initialState: SampleReducerState = {
  count: 0,
};

export function sampleReducer(state = initialState, action: SampleActionTypes): SampleReducerState {
  switch (action.type) {
    case LocalActions.INCREMENT:
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
}
