import { createActionWith, PayloadOfMaker } from '@store/core/models/helpers'
import {
  CoreActions,
  SetAuthenticatedUser,
  SetCoreState,
  SetIsLoading,
  SET_AUTHENTICATED_USER,
  SET_CORE_STATE,
  SET_IS_LOADING,
} from './actions'

type PayloadOf<T extends CoreActions> = PayloadOfMaker<CoreActions, T>

export const setCore = createActionWith<PayloadOf<SetCoreState>>(SET_CORE_STATE)
export const setIsLoading = createActionWith<PayloadOf<SetIsLoading>>(SET_IS_LOADING)
export const setAuthenticatedUser = createActionWith<PayloadOf<SetAuthenticatedUser>>(SET_AUTHENTICATED_USER)
