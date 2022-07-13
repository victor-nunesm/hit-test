import { createAction, props } from '@ngrx/store'

export function createActionWith<T extends Record<string, unknown>>(name: string) {
  return createAction(name, props<Pick<T, 'payload'>>())
}

type ActionBase = { type: string; payload: any }

/** This is the base type for use with createActionWith function.
 *
 * Usage:
 *
 * type PayloadOf<T extends CoreActions> = PayloadOfMaker<CoreActions, T>;
 *
 * export const setCore = createActionWith<PayloadOf<SetCoreAction>>(SET_CORE);
 *
 */
export type PayloadOfMaker<L extends ActionBase, T extends L> = Required<Pick<T, 'payload'>> & Omit<T, 'type'>
