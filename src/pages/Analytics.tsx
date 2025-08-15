import { useState } from "react"
import { TrendingUp, Users, Heart, MessageCircle, Share, Eye, Calendar, Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from "recharts"

const engagementData = [
  { date: '2024-01-01', likes: 45, comments: 12, shares: 8, reach: 1240 },
  { date: '2024-01-02', likes: 52, comments: 18, shares: 15, reach: 1580 },
  { date: '2024-01-03', likes: 38, comments: 9, shares: 6, reach: 980 },
  { date: '2024-01-04', likes: 67, comments: 24, shares: 19, reach: 2100 },
  { date: '2024-01-05', likes: 43, comments: 15, shares: 11, reach: 1350 },
  { date: '2024-01-06', likes: 71, comments: 28, shares: 23, reach: 2400 },
  { date: '2024-01-07', likes: 89, comments: 35, shares: 31, reach: 2850 }
]

const platformData = [
  { name: 'Instagram', value: 45, color: '#E4405F' },
  { name: 'Twitter', value: 30, color: '#1DA1F2' },
  { name: 'LinkedIn', value: 20, color: '#0077B5' },
  { name: 'Facebook', value: 5, color: '#1877F2' }
]

const topPosts = [
  {
    id: 1,
    title: "Product launch announcement",
    platform: "Instagram",
    engagement: 89,
    reach: 2850,
    date: "2024-01-07"
  },
  {
    id: 2,
    title: "Behind the scenes content",
    platform: "Twitter",
    engagement: 67,
    reach: 2100,
    date: "2024-01-04"
  },
  {
    id: 3,
    title: "Team collaboration tips",
    platform: "LinkedIn",
    engagement: 52,
    reach: 1580,
    date: "2024-01-02"
  }
]

const stats = [
  {
    title: "Total Reach",
    value: "12.3K",
    change: "+12.5%",
    icon: Eye,
    trend: "up"
  },
  {
    title: "Engagement Rate",
    value: "4.8%",
    change: "+0.8%",
    icon: Heart,
    trend: "up"
  },
  {
    title: "Follower Growth",
    value: "234",
    change: "+15.2%",
    icon: Users,
    trend: "up"
  },
  {
    title: "Best Time",
    value: "3:00 PM",
    change: "Weekdays",
    icon: Calendar,
    trend: "neutral"
  }
]

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("7d")

  return (
    <div className="space-y-8 fade-in">
      {/* Premium Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-subtle opacity-50 rounded-2xl"></div>
        <div className="relative p-8 rounded-2xl border bg-background/95 backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
              <p className="text-lg text-muted-foreground">
                Deep insights into your social media performance
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="px-4 py-2">
                <Target className="w-4 h-4 mr-2" />
                Goal: 5K reach
              </Badge>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="card-elevated">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className={`text-sm ${
                stat.trend === 'up' ? 'text-success' : 'text-muted-foreground'
              }`}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Engagement Trends */}
        <Card className="card-elevated lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Engagement Trends
            </CardTitle>
            <CardDescription>Track your engagement metrics over time</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="engagement" className="space-y-6">
              <TabsList>
                <TabsTrigger value="engagement">Engagement</TabsTrigger>
                <TabsTrigger value="reach">Reach</TabsTrigger>
              </TabsList>
              
              <TabsContent value="engagement" className="space-y-4">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line type="monotone" dataKey="likes" stroke="hsl(var(--primary))" strokeWidth={2} />
                    <Line type="monotone" dataKey="comments" stroke="hsl(var(--success))" strokeWidth={2} />
                    <Line type="monotone" dataKey="shares" stroke="hsl(var(--warning))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="reach" className="space-y-4">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="reach" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Platform Distribution */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Platform Distribution
            </CardTitle>
            <CardDescription>Where your audience engages most</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Posts */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            Top Performing Posts
          </CardTitle>
          <CardDescription>Your most successful content this period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPosts.map((post, index) => (
              <div key={post.id} className="flex items-center gap-4 p-4 rounded-lg bg-gradient-subtle border">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  #{index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{post.title}</h4>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span>{post.platform}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{post.engagement} interactions</div>
                  <div className="text-sm text-muted-foreground">{post.reach} reach</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}