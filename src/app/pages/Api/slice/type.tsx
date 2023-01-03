export interface IGameSelected {
  gameName: string
  gameId: string
  isPublish: boolean
  tabNameList: string[]
  updatedAt?: Date
  updatedBy?: string
  createdAt?: Date
  createdBy?: string
}

export interface ITabNameSelected {
  tabName: string
  category2List: string[]
}
export interface IApiDetail {
  apiDescription: string
  apiId: string
  apiMethod: string
  apiName: string
  category2: string
  createdAt: Date
  createdBy: string
  deprecated: { isDeprecated: boolean; deprecatedDate: string }
  gameName: string
  isPublish: boolean
  path: string
  requestParams: [
    {
      paramId: string
      keyLabel: string
      description: string
      isRequired: boolean
      type: string
    }
  ]
  responseCode: [
    {
      paramId: string
      keyLabel: string
      description: string
      type: string
    }
  ]
  responseParams: [
    {
      resParamId: string
      keyLabel: string
      description: string
      type: string
      subItem: [
        {
          keyLabel: string
          description: string
          subResParamId: string
          type: string
        }
      ]
    }
  ]
  tabName: string
  updatedAt: Date
}
