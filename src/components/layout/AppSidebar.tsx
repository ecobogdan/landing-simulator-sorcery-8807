import { NavLink, useLocation } from "react-router-dom"
import { 
  Calendar, 
  PlusCircle, 
  FileText, 
  Users,
  Home,
  Zap,
  ArrowUp,
  TrendingUp,
  FileEdit
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const menuItems = [
  { title: "Dashboard", url: "/app/dashboard", icon: Home },
  { title: "Create Post", url: "/app/create", icon: PlusCircle },
  { title: "Calendar", url: "/app/posts/calendar", icon: Calendar },
  { title: "All Posts", url: "/app/posts/all", icon: FileText },
  //{ title: "Analytics", url: "/app/analytics", icon: TrendingUp },
  //{ title: "Templates", url: "/app/templates", icon: FileEdit },
  { title: "Accounts", url: "/app/accounts", icon: Users },
]

export function AppSidebar() {
  const location = useLocation()

  const isActiveRoute = (url: string) => {
    if (url === "/app/dashboard") return location.pathname === "/app" || location.pathname === "/app/dashboard"
    return location.pathname.startsWith(url)
  }

  const getNavClassName = (url: string) => {
    return cn(
      "w-full justify-start gap-3 font-medium transition-all duration-200",
      isActiveRoute(url)
        ? "bg-primary text-primary-foreground shadow-md"
        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
    )
  }

  return (
    <div className="flex h-dvh w-sidebar flex-col bg-gradient-subtle border-r border-border sticky top-0">

      {/* Header with Create CTA */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">SocialGlide</h2>
            <p className="text-xs text-muted-foreground">Workspace</p>
          </div>
        </div>
        
        <Button asChild className="w-full btn-hero">
          <NavLink to="/app/create">
            <PlusCircle className="w-4 h-4 mr-2" />
            Create Post
          </NavLink>
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {menuItems.map((item) => (
          <Button
            key={item.url}
            asChild
            variant="ghost"
            className={getNavClassName(item.url)}
          >
            <NavLink to={item.url}>
              <item.icon className="w-4 h-4" />
              {item.title}
            </NavLink>
          </Button>
        ))}
      </div>

      {/* Profile Section */}
      <div className="p-4 border-t border-border space-y-3">
        <Button asChild variant="outline" className="w-full" size="sm">
          <NavLink to="/app/upgrade">
            <ArrowUp className="w-4 h-4 mr-2" />
            Upgrade Plan
          </NavLink>
        </Button>
        
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <Badge variant="secondary" className="text-xs">
              Free Plan
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}