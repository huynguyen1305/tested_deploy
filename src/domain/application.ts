export enum AppType {
  develop = 'develop',
  service = 'service'
}

export type Token = {
  id: string
  token: string
  expiredAt: string
  createdAt: string
  blacklisted: boolean
}

export type Application = {
  id: string
  gameName: string
  gameId: string
  type: AppType
  url?: string
  name: string
  description?: string
  imageUrl?: string
  restricted?: boolean
  token: Token
  accountId: string
}
