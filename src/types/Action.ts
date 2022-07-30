export interface BaseAction<T> {
  type: T;
}

export type Action<T, P = undefined> = P extends undefined ? BaseAction<T> : BaseAction<T> & { payload: P };
