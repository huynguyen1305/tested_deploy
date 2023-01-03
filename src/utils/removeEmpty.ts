/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/**
 *
 * Clean up an object by removing all empty values [null, undefined, '']
 * @param {Object} obj  object to clean up
 * @returns {Object} object without empty values
 */
export default function removeEmpty<T>(obj): Partial<T> {
  return Object.entries(obj).reduce(
    (a, [k, v]) => (v == null || v === '' ? a : ((a[k] = v), a)),
    {}
  )
}
