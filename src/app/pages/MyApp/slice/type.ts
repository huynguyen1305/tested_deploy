/* --- STATE --- */
// eslint-disable-next-line @typescript-eslint/no-empty-interface

import { Application } from 'domain/application'

// Define a type for the slice state
export default interface ApplicationState {
  loading: boolean
  data: Application[]
}

/**
 * Application item in the list
 */
export type I = Pick<
  Application,
  'id' | 'name' | 'type' | 'gameName' | 'restricted'
>
