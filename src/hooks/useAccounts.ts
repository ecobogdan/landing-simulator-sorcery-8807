import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from '@/hooks/use-toast'
import type { SocialAccount, Platform, AccountConnection } from '@/types/accounts'

// Mock data for demonstration
const mockPlatforms: Platform[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: '📷',
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    maxAccounts: 5,
    supportsScheduling: true,
    charLimit: 2200,
    features: ['Stories', 'Reels', 'Posts', 'IGTV']
  },
  {
    id: 'twitter',
    name: 'Twitter / X',
    icon: '🐦',
    color: 'bg-gradient-to-r from-blue-400 to-blue-600',
    maxAccounts: 3,
    supportsScheduling: true,
    charLimit: 280,
    features: ['Tweets', 'Threads', 'Spaces']
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: '👤',
    color: 'bg-gradient-to-r from-blue-600 to-blue-800',
    maxAccounts: 10,
    supportsScheduling: true,
    charLimit: 63206,
    features: ['Posts', 'Stories', 'Live Video']
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '💼',
    color: 'bg-gradient-to-r from-blue-700 to-blue-900',
    maxAccounts: 5,
    supportsScheduling: true,
    charLimit: 3000,
    features: ['Posts', 'Articles', 'Stories']
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: '▶️',
    color: 'bg-gradient-to-r from-red-500 to-red-700',
    maxAccounts: 3,
    supportsScheduling: true,
    charLimit: 5000,
    features: ['Videos', 'Shorts', 'Live Streams']
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: '🎵',
    color: 'bg-gradient-to-r from-black to-gray-800',
    maxAccounts: 3,
    supportsScheduling: true,
    charLimit: 2200,
    features: ['Videos', 'Live']
  }
]

const mockAccounts: SocialAccount[] = [
  {
    id: 'ig_1',
    platformId: 'instagram',
    platformName: 'Instagram',
    username: '@brandname',
    displayName: 'Brand Name Official',
    avatar: '/placeholder.svg',
    isActive: true,
    connectedAt: '2024-01-15',
    lastSync: '2 hours ago',
    followerCount: 45230,
    engagementRate: 4.2,
    accountType: 'business'
  },
  {
    id: 'ig_2',
    platformId: 'instagram',
    platformName: 'Instagram',
    username: '@brandname_personal',
    displayName: 'John Doe - Brand',
    avatar: '/placeholder.svg',
    isActive: true,
    connectedAt: '2024-02-01',
    lastSync: '1 hour ago',
    followerCount: 12500,
    engagementRate: 6.8,
    accountType: 'personal'
  },
  {
    id: 'li_1',
    platformId: 'linkedin',
    platformName: 'LinkedIn',
    username: '@johndoe',
    displayName: 'John Doe',
    avatar: '/placeholder.svg',
    isActive: true,
    connectedAt: '2024-01-10',
    lastSync: '3 hours ago',
    followerCount: 8950,
    engagementRate: 3.5,
    accountType: 'personal'
  },
  {
    id: 'tw_1',
    platformId: 'twitter',
    platformName: 'Twitter',
    username: '@brandname_official',
    displayName: 'Brand Name',
    avatar: '/placeholder.svg',
    isActive: false,
    connectedAt: '2024-01-20',
    lastSync: '1 day ago',
    followerCount: 25600,
    engagementRate: 2.1,
    accountType: 'business'
  }
]

const mockApi = {
  async getAccounts(): Promise<SocialAccount[]> {
    await new Promise(resolve => setTimeout(resolve, 800))
    return mockAccounts
  },

  async getPlatforms(): Promise<Platform[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockPlatforms
  },

  async connectAccount(platformId: string): Promise<SocialAccount> {
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const platform = mockPlatforms.find(p => p.id === platformId)
    if (!platform) throw new Error('Platform not found')

    const newAccount: SocialAccount = {
      id: `${platformId}_${Date.now()}`,
      platformId,
      platformName: platform.name,
      username: `@newaccount_${Date.now()}`,
      displayName: 'New Account',
      isActive: true,
      connectedAt: new Date().toISOString().split('T')[0],
      lastSync: 'Just now',
      followerCount: Math.floor(Math.random() * 10000),
      engagementRate: Math.round((Math.random() * 5 + 1) * 10) / 10,
      accountType: 'personal'
    }

    return newAccount
  },

  async disconnectAccount(accountId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000))
  },

  async syncAccount(accountId: string): Promise<SocialAccount> {
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const account = mockAccounts.find(a => a.id === accountId)
    if (!account) throw new Error('Account not found')

    return {
      ...account,
      lastSync: 'Just now'
    }
  }
}

export function useAccounts() {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: mockApi.getAccounts,
    staleTime: 5 * 60 * 1000,
  })
}

export function usePlatforms() {
  return useQuery({
    queryKey: ['platforms'],
    queryFn: mockApi.getPlatforms,
    staleTime: 10 * 60 * 1000,
  })
}

export function useAccountConnections() {
  const { data: accounts = [] } = useAccounts()
  const { data: platforms = [] } = usePlatforms()

  const connections: AccountConnection[] = platforms.map(platform => {
    const platformAccounts = accounts.filter(acc => acc.platformId === platform.id)
    return {
      platformId: platform.id,
      accounts: platformAccounts,
      totalConnected: platformAccounts.length,
      maxAllowed: platform.maxAccounts
    }
  })

  return { data: connections }
}

export function useConnectAccount() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: mockApi.connectAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      toast({
        title: "Account connected successfully",
        description: "Your new social media account is now connected and ready to use."
      })
    },
    onError: (error: any) => {
      toast({
        title: "Failed to connect account",
        description: error.message || "Please try again later.",
        variant: "destructive"
      })
    }
  })
}

export function useDisconnectAccount() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: mockApi.disconnectAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      toast({
        title: "Account disconnected",
        description: "The account has been removed from your connected accounts."
      })
    },
    onError: (error: any) => {
      toast({
        title: "Failed to disconnect account",
        description: error.message || "Please try again later.",
        variant: "destructive"
      })
    }
  })
}

export function useSyncAccount() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: mockApi.syncAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      toast({
        title: "Account synced successfully",
        description: "Account data has been updated with the latest information."
      })
    },
    onError: (error: any) => {
      toast({
        title: "Failed to sync account",
        description: error.message || "Please try again later.",
        variant: "destructive"
      })
    }
  })
}