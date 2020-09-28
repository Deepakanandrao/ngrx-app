import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './counter.actions';

// declare initial state
export const initialState = 0;

// Create a reducer function
const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(reset, (state) => 0)
);

//Export counter reducer

export function counterReducer(state, action) {
  return _counterReducer(state, action);
}
