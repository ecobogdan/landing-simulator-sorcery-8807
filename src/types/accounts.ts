// Types for multiple accounts per platform
export interface SocialAccount {
  id: string
  platformId: string
  platformName: string
  username: string
  displayName: string
  avatar?: string
  isActive: boolean
  connectedAt: string
  lastSync?: string
  followerCount?: number
  engagementRate?: number
  accountType?: 'personal' | 'business' | 'creator'
}

export interface Platform {
  id: string
  name: string
  icon: string
  color: string
  maxAccounts: number
  supportsScheduling: boolean
  charLimit: number
  features: string[]
}

export interface AccountConnection {
  platformId: string
  accounts: SocialAccount[]
  totalConnected: number
  maxAllowed: number
}

export interface PostTarget {
  accountId: string
  platformId: string
  username: string
  scheduled?: boolean
}