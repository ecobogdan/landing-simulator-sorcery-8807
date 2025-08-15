import { useState } from "react"
import { CheckCircle2, AlertCircle, RefreshCw, Settings, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Social media provider configurations
const providers = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: '📷',
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    connected: false,
    description: 'Share photos and stories'
  },
  {
    id: 'twitter',
    name: 'Twitter / X',
    icon: '🐦',
    color: 'bg-gradient-to-r from-blue-400 to-blue-600',
    connected: false,
    description: 'Share thoughts and engage in conversations'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: '👤',
    color: 'bg-gradient-to-r from-blue-600 to-blue-800',
    connected: false,
    description: 'Connect with friends and communities'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '💼',
    color: 'bg-gradient-to-r from-blue-700 to-blue-900',
    connected: true,
    lastSync: '2 hours ago',
    account: '@johndoe'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: '▶️',
    color: 'bg-gradient-to-r from-red-500 to-red-700',
    connected: false,
    description: 'Share videos and build your channel'
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: '🎵',
    color: 'bg-gradient-to-r from-black to-gray-800',
    connected: false,
    description: 'Create short-form video content'
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    icon: '📌',
    color: 'bg-gradient-to-r from-red-600 to-red-800',
    connected: false,
    description: 'Pin ideas and inspiration'
  },
  {
    id: 'threads',
    name: 'Threads',
    icon: '🧵',
    color: 'bg-gradient-to-r from-gray-800 to-black',
    connected: false,
    description: 'Join conversations and share updates'
  }
]

export default function Accounts() {
  const [filter, setFilter] = useState('all')
  const [connecting, setConnecting] = useState<string | null>(null)

  const handleConnect = async (providerId: string) => {
    setConnecting(providerId)
    // Simulate OAuth flow
    await new Promise(resolve => setTimeout(resolve, 2000))
    setConnecting(null)
    // Here you would handle the actual OAuth flow
  }

  const filteredProviders = providers.filter(provider => {
    if (filter === 'connected') return provider.connected
    if (filter === 'available') return !provider.connected
    return true
  })

  const connectedCount = providers.filter(p => p.connected).length
  const totalCount = providers.length

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
                <span className="font-medium">{connectedCount} of {totalCount} connected</span>
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
            <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">{connectedCount}</div>
          </CardContent>
        </Card>

        <Card className="card-elevated shadow-elegant border-0 bg-gradient-subtle">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              Available Platforms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">{totalCount - connectedCount}</div>
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProviders.map((provider) => (
              <Card key={provider.id} className="card-elevated shadow-elegant border-0 hover:shadow-glow transition-all bg-gradient-subtle">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${provider.color} flex items-center justify-center text-white text-lg`}>
                        {provider.icon}
                      </div>
                      <div>
                        <CardTitle className="text-base">{provider.name}</CardTitle>
                        {provider.connected && provider.account && (
                          <p className="text-sm text-muted-foreground">{provider.account}</p>
                        )}
                      </div>
                    </div>
                    {provider.connected ? (
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    ) : (
                      <Plus className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  
                  {provider.description && (
                    <CardDescription>{provider.description}</CardDescription>
                  )}
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    {provider.connected ? (
                      <>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Status</span>
                          <Badge variant="default" className="bg-success">
                            Connected
                          </Badge>
                        </div>
                        {provider.lastSync && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Last Sync</span>
                            <span>{provider.lastSync}</span>
                          </div>
                        )}
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Refresh
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Settings className="w-4 h-4 mr-2" />
                            Settings
                          </Button>
                        </div>
                        <Button variant="destructive" size="sm" className="w-full">
                          Disconnect
                        </Button>
                      </>
                    ) : (
                      <Button 
                        onClick={() => handleConnect(provider.id)}
                        disabled={connecting === provider.id}
                        className="w-full btn-hero"
                      >
                        {connecting === provider.id ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Connecting...
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 mr-2" />
                            Connect {provider.name}
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProviders.length === 0 && (
            <Card className="card-elevated">
              <CardContent className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No accounts found</h3>
                <p className="text-muted-foreground mb-4">
                  {filter === 'connected' 
                    ? "You haven't connected any accounts yet." 
                    : "No available accounts to connect."
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