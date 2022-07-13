import { User } from '@core/models'

export interface CoreState {
  authenticatedUser: User | null
  isLoading: boolean
}
