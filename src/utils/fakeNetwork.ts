const randomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const fakeNetwork = <T>(data: T) =>
  new Promise<T>(resolve =>
    // eslint-disable-next-line no-promise-executor-return
    setTimeout(() => {
      resolve(data)
    }, randomNumber(0, 1000))
  )

export { randomNumber }
export default fakeNetwork
