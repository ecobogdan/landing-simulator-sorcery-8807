import { Plus, Calendar, FileText, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NavLink } from "react-router-dom"

const stats = [
  {
    title: "Posts Scheduled",
    value: "12",
    change: "+3 from last week",
    icon: Calendar,
    trend: "up"
  },
  {
    title: "Posts Published",
    value: "8",
    change: "3 ready to schedule",
    icon: FileText,
    trend: "up"
  },
  {
    title: "Total Posts",
    value: "4.2%",
    change: "+0.8% from last week",
    icon: TrendingUp,
    trend: "up"
  },
  {
    title: "Connected Accounts",
    value: "0",
    change: "Connect your first account",
    icon: Users,
    trend: "down"
  }
]

const recentActivity = [
  {
    id: 1,
    action: "Post scheduled",
    content: "New product launch announcement",
    time: "2 hours ago",
    status: "scheduled"
  },
  {
    id: 2,
    action: "Draft saved",
    content: "Weekly team update post",
    time: "4 hours ago",
    status: "draft"
  },
  {
    id: 3,
    action: "Post published",
    content: "Behind the scenes content",
    time: "1 day ago",
    status: "published"
  }
]

export default function Dashboard() {
  const hasConnectedAccounts = false // This would come from your state/API

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your social media.</p>
        </div>
        <Button asChild className="btn-hero">
          <NavLink to="/app/create">
            <Plus className="w-4 h-4 mr-2" />
            Create Post
          </NavLink>
        </Button>
      </div>

      {/* No Accounts Connected State */}
      {!hasConnectedAccounts && (
        <Card className="card-elevated border-primary/20">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-xl">Connect Your Social Accounts</CardTitle>
            <CardDescription className="text-base">
              Get started by connecting your social media accounts to begin scheduling and managing your content.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild className="btn-hero" size="lg">
              <NavLink to="/app/accounts">
                Connect Accounts
              </NavLink>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="card-elevated">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${
                stat.trend === 'up' ? 'text-success' : 
                stat.trend === 'down' ? 'text-destructive' : 
                'text-muted-foreground'
              }`}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to get you started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild variant="outline" className="w-full justify-start">
              <NavLink to="/app/create?type=text">
                <FileText className="w-4 h-4 mr-2" />
                New Text Post
              </NavLink>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <NavLink to="/app/create?type=image">
                <Plus className="w-4 h-4 mr-2" />
                New Image Post
              </NavLink>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <NavLink to="/app/posts/all">
                <FileText className="w-4 h-4 mr-2" />
                All Posts
              </NavLink>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <NavLink to="/app/posts/calendar">
                <Calendar className="w-4 h-4 mr-2" />
                View Calendar
              </NavLink>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="card-elevated lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-4 rounded-lg bg-muted/30">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{activity.action}</span>
                      <Badge 
                        variant={
                          activity.status === 'published' ? 'default' :
                          activity.status === 'scheduled' ? 'secondary' :
                          'outline'
                        }
                        className="text-xs"
                      >
                        {activity.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.content}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}