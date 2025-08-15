import { useState } from "react"
import { CheckCircle2, AlertCircle, RefreshCw, Settings, Plus, Users, TrendingUp, MoreHorizontal, Unlink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { useAccountConnections, usePlatforms, useConnectAccount, useDisconnectAccount, useSyncAccount } from "@/hooks/useAccounts"
import { LoadingSkeleton } from "@/components/ui/loading-skeleton"
import { ErrorMessage } from "@/components/ui/error-boundary"

export default function Accounts() {
  const [filter, setFilter] = useState('all')
  
  const { data: platforms = [], isLoading: platformsLoading } = usePlatforms()
  const { data: connections = [] } = useAccountConnections()
  const connectAccount = useConnectAccount()
  const disconnectAccount = useDisconnectAccount()
  const syncAccount = useSyncAccount()

  const handleConnect = async (platformId: string) => {
    await connectAccount.mutateAsync(platformId)
  }

  const handleDisconnect = async (accountId: string) => {
    await disconnectAccount.mutateAsync(accountId)
  }

  const handleSync = async (accountId: string) => {
    await syncAccount.mutateAsync(accountId)
  }

  const filteredConnections = connections.filter(connection => {
    if (filter === 'connected') return connection.totalConnected > 0
    if (filter === 'available') return connection.totalConnected < connection.maxAllowed
    return true
  })

  const totalConnected = connections.reduce((sum, conn) => sum + conn.totalConnected, 0)
  const totalPossible = connections.reduce((sum, conn) => sum + conn.maxAllowed, 0)

  if (platformsLoading) {
    return <LoadingSkeleton />
  }

  return (
    <div className="space-y-8 fade-in">
      {/* Premium Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-subtle opacity-50 rounded-2xl"></div>
        <div className="relative p-8 rounded-2xl border bg-background/95 backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Social Accounts
              </h1>
              <p className="text-lg text-muted-foreground">
                Connect and orchestrate your social media presence
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-primary text-white shadow-glow">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                <span className="font-medium">{totalConnected} accounts connected</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="card-elevated shadow-elegant border-0 bg-gradient-subtle">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success"></div>
              Connected Accounts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">{totalConnected}</div>
          </CardContent>
        </Card>

        <Card className="card-elevated shadow-elegant border-0 bg-gradient-subtle">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              Available Slots
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">{totalPossible - totalConnected}</div>
          </CardContent>
        </Card>

        <Card className="card-elevated shadow-elegant border-0 bg-gradient-subtle">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
              Last Sync
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">2h ago</div>
          </CardContent>
        </Card>
      </div>

      {/* Premium Filters */}
      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList className="bg-gradient-subtle shadow-elegant">
          <TabsTrigger value="all" className="px-6">All Platforms</TabsTrigger>
          <TabsTrigger value="connected" className="px-6">Connected</TabsTrigger>
          <TabsTrigger value="available" className="px-6">Available</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-8">
          <div className="space-y-8">
            {filteredConnections.map((connection) => {
              const platform = platforms.find(p => p.id === connection.platformId)
              if (!platform) return null

              return (
                <motion.div
                  key={connection.platformId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="card-elevated shadow-elegant border-0 bg-gradient-subtle overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl ${platform.color} flex items-center justify-center text-white text-xl shadow-lg`}>
                            {platform.icon}
                          </div>
                          <div>
                            <CardTitle className="text-xl">{platform.name}</CardTitle>
                            <CardDescription className="flex items-center gap-4 mt-1">
                              <span>{connection.totalConnected} of {connection.maxAllowed} accounts connected</span>
                              {connection.totalConnected > 0 && (
                                <Badge variant="secondary" className="bg-success/10 text-success">
                                  <CheckCircle2 className="w-3 h-3 mr-1" />
                                  Active
                                </Badge>
                              )}
                            </CardDescription>
                          </div>
                        </div>
                        
                        {connection.totalConnected < connection.maxAllowed && (
                          <Button
                            onClick={() => handleConnect(platform.id)}
                            disabled={connectAccount.isPending}
                            className="btn-hero shadow-glow"
                          >
                            {connectAccount.isPending ? (
                              <>
                                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                Connecting...
                              </>
                            ) : (
                              <>
                                <Plus className="w-4 h-4 mr-2" />
                                Add Account
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent>
                      {connection.accounts.length > 0 ? (
                        <div className="space-y-4">
                          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {connection.accounts.map((account) => (
                              <motion.div
                                key={account.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200 bg-background/50">
                                  <CardContent className="p-4">
                                    <div className="flex items-start justify-between mb-3">
                                      <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-medium">
                                          {account.displayName.charAt(0)}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                          <h4 className="font-medium text-sm truncate">{account.displayName}</h4>
                                          <p className="text-xs text-muted-foreground truncate">{account.username}</p>
                                        </div>
                                      </div>
                                      
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <MoreHorizontal className="w-4 h-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuItem 
                                            onClick={() => handleSync(account.id)}
                                            disabled={syncAccount.isPending}
                                          >
                                            <RefreshCw className="w-4 h-4 mr-2" />
                                            Sync Account
                                          </DropdownMenuItem>
                                          <DropdownMenuItem>
                                            <Settings className="w-4 h-4 mr-2" />
                                            Settings
                                          </DropdownMenuItem>
                                          <Separator className="my-1" />
                                          <DropdownMenuItem 
                                            onClick={() => handleDisconnect(account.id)}
                                            disabled={disconnectAccount.isPending}
                                            className="text-destructive"
                                          >
                                            <Unlink className="w-4 h-4 mr-2" />
                                            Disconnect
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>

                                    <div className="space-y-2">
                                      <div className="flex items-center justify-between text-xs">
                                        <span className="text-muted-foreground">Status</span>
                                        <Badge variant={account.isActive ? "default" : "secondary"} className="text-xs">
                                          {account.isActive ? "Active" : "Inactive"}
                                        </Badge>
                                      </div>
                                      
                                      {account.followerCount && (
                                        <div className="flex items-center justify-between text-xs">
                                          <span className="text-muted-foreground">Followers</span>
                                          <span className="flex items-center gap-1">
                                            <Users className="w-3 h-3" />
                                            {account.followerCount.toLocaleString()}
                                          </span>
                                        </div>
                                      )}
                                      
                                      {account.engagementRate && (
                                        <div className="flex items-center justify-between text-xs">
                                          <span className="text-muted-foreground">Engagement</span>
                                          <span className="flex items-center gap-1">
                                            <TrendingUp className="w-3 h-3" />
                                            {account.engagementRate}%
                                          </span>
                                        </div>
                                      )}

                                      {account.lastSync && (
                                        <div className="flex items-center justify-between text-xs">
                                          <span className="text-muted-foreground">Last Sync</span>
                                          <span>{account.lastSync}</span>
                                        </div>
                                      )}
                                    </div>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            ))}
                          </div>
                          
                          {connection.totalConnected < connection.maxAllowed && (
                            <div className="pt-2">
                              <Button
                                variant="outline"
                                onClick={() => handleConnect(platform.id)}
                                disabled={connectAccount.isPending}
                                className="w-full border-dashed"
                              >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Another {platform.name} Account
                              </Button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                          <div className={`w-16 h-16 mx-auto mb-4 rounded-xl ${platform.color} flex items-center justify-center text-white text-2xl opacity-50`}>
                            {platform.icon}
                          </div>
                          <h3 className="text-lg font-semibold mb-2">No {platform.name} accounts connected</h3>
                          <p className="text-muted-foreground mb-4">
                            Connect your {platform.name} account to start scheduling posts
                          </p>
                          <Button
                            onClick={() => handleConnect(platform.id)}
                            disabled={connectAccount.isPending}
                            className="btn-hero"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Connect {platform.name}
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {filteredConnections.length === 0 && (
            <Card className="card-elevated">
              <CardContent className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No platforms found</h3>
                <p className="text-muted-foreground mb-4">
                  {filter === 'connected' 
                    ? "You haven't connected any accounts yet." 
                    : "No available platforms to connect."
                  }
                </p>
                {filter === 'connected' && (
                  <Button onClick={() => setFilter('available')}>
                    Browse Available Platforms
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}