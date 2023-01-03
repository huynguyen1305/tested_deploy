// Helper type
/**
 * generate a type with some properties specified in K is required
 * @usage RequiredField<IUser, 'role'>
 *
 */
export type RequiredField<T, K extends keyof T> = T & Required<Pick<T, K>>

// Use
// RequiredField<IUser, 'role'>
