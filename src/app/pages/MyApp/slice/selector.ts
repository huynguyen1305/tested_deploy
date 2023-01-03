import { RootState } from '@redux/store'
import { createSelector } from '@reduxjs/toolkit'
import { initialState } from '.'
import { I } from './type'

const selectSlice = (state: RootState) => state.application || initialState

const selectApplications = createSelector([selectSlice], state => state.data) // get root state
const selectApplicationListItems = createSelector([selectApplications], data =>
  data.map(
    item =>
      ({
        id: item.id,
        name: item.name,
        type: item.type,
        gameName: item.gameName
      } as I)
  )
) // get application to display as a list

const selectApplicationDetail = createSelector(
  [selectApplications, (state, id: string) => id],
  (data, id) => data.find(item => item.id === id)
)
const selectApplicationModify = createSelector(
  [selectApplications, (state, id: string) => id],
  (data, identification) => {
    const item = data.find(i => i.id === identification)
    if (item) {
      const { accountId, gameName, id, token, ...rest } = item
      return {
        ...rest,
        icon: item.imageUrl,
        useDefaultIcon: item.imageUrl === undefined
      }
    }
    return undefined
  }
)
export {
  selectApplications,
  selectApplicationListItems,
  selectApplicationDetail,
  selectApplicationModify
}
