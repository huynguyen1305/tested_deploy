// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'

import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate HoC receive the t function as a prop
  withTranslation: () => Component => {
    // eslint-disable-next-line no-param-reassign
    Component.defaultProps = { ...Component.defaultProps, t: () => '' }
    return Component
  }
}))

console.log('should run')
