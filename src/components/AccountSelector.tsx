import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useAccountConnections } from "@/hooks/useAccounts"
import type { PostTarget } from "@/types/accounts"

interface AccountSelectorProps {
  selectedAccounts: PostTarget[]
  onAccountsChange: (accounts: PostTarget[]) => void
  selectedPlatforms: string[]
}

export function AccountSelector({ selectedAccounts, onAccountsChange, selectedPlatforms }: AccountSelectorProps) {
  const { data: connections = [] } = useAccountConnections()
  const [openPlatforms, setOpenPlatforms] = useState<Record<string, boolean>>({})

  const handleAccountToggle = (accountId: string, platformId: string, username: string) => {
    const isSelected = selectedAccounts.some(acc => acc.accountId === accountId)
    
    if (isSelected) {
      onAccountsChange(selectedAccounts.filter(acc => acc.accountId !== accountId))
    } else {
      onAccountsChange([...selectedAccounts, { accountId, platformId, username }])
    }
  }

  const togglePlatform = (platformId: string) => {
    setOpenPlatforms(prev => ({
      ...prev,
      [platformId]: !prev[platformId]
    }))
  }

  // Filter connections to only show selected platforms with connected accounts
  const relevantConnections = connections.filter(
    conn => selectedPlatforms.includes(conn.platformId) && conn.accounts.length > 0
  )

  if (relevantConnections.length === 0) {
    return (
      <Card className="card-elevated shadow-elegant border-0">
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">
            No connected accounts found for selected platforms.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="card-elevated shadow-elegant border-0">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gradient-primary"></div>
          Select Accounts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {relevantConnections.map((connection) => {
          const platformAccounts = connection.accounts.filter(acc => acc.isActive)
          if (platformAccounts.length === 0) return null

          const selectedPlatformAccounts = selectedAccounts.filter(
            acc => acc.platformId === connection.platformId
          )

          return (
            <Collapsible
              key={connection.platformId}
              open={openPlatforms[connection.platformId] ?? true}
              onOpenChange={() => togglePlatform(connection.platformId)}
            >
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between h-auto p-3">
                  <div className="flex items-center gap-3">
                    <div className="text-lg">
                      {platformAccounts[0]?.platformName === 'Instagram' && '📷'}
                      {platformAccounts[0]?.platformName === 'Twitter' && '🐦'}
                      {platformAccounts[0]?.platformName === 'Facebook' && '👤'}
                      {platformAccounts[0]?.platformName === 'LinkedIn' && '💼'}
                      {platformAccounts[0]?.platformName === 'YouTube' && '▶️'}
                      {platformAccounts[0]?.platformName === 'TikTok' && '🎵'}
                    </div>
                    <div className="text-left">
                      <p className="font-medium">{platformAccounts[0]?.platformName}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedPlatformAccounts.length} of {platformAccounts.length} selected
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedPlatformAccounts.length > 0 && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {selectedPlatformAccounts.length}
                      </Badge>
                    )}
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </Button>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="space-y-2 pt-2">
                {platformAccounts.map((account) => {
                  const isSelected = selectedAccounts.some(acc => acc.accountId === account.id)
                  
                  return (
                    <div
                      key={account.id}
                      className="flex items-center space-x-3 p-3 rounded-lg border bg-background/50 hover:bg-background/80 transition-colors"
                    >
                      <Checkbox
                        id={account.id}
                        checked={isSelected}
                        onCheckedChange={() => handleAccountToggle(account.id, account.platformId, account.username)}
                      />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm font-medium">
                          {account.displayName.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm truncate">{account.displayName}</p>
                          <p className="text-xs text-muted-foreground truncate">{account.username}</p>
                        </div>
                      </div>
                      {account.followerCount && (
                        <div className="text-xs text-muted-foreground">
                          {account.followerCount.toLocaleString()} followers
                        </div>
                      )}
                    </div>
                  )
                })}
              </CollapsibleContent>
            </Collapsible>
          )
        })}
        
        <div className="pt-2 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total accounts selected:</span>
            <Badge variant="default" className="bg-primary">
              {selectedAccounts.length}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}