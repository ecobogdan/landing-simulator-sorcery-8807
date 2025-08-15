import { useState } from "react"
import { usePosts } from "@/hooks/usePostsData"
import { LoadingSkeleton, CalendarSkeleton } from "@/components/ui/loading-skeleton"
import { ErrorMessage } from "@/components/ui/error-boundary"
import { NavLink } from "react-router-dom"
import { ChevronLeft, ChevronRight, Plus, Edit, Copy, Trash2, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

const mockPosts = [
  {
    id: 1,
    title: "Product launch announcement",
    platforms: ['instagram', 'linkedin'],
    status: 'scheduled',
    time: '10:00',
    date: '2025-08-14',
    thumbnail: null
  },
  {
    id: 2,
    title: "Behind the scenes content",
    platforms: ['twitter', 'instagram'],
    status: 'scheduled',
    time: '14:30',
    date: '2025-08-15',
    thumbnail: null
  },
  {
    id: 3,
    title: "Weekly team update",
    platforms: ['linkedin'],
    status: 'draft',
    time: '09:00',
    date: '2025-08-16',
    thumbnail: null
  }
]

const platformIcons = {
  instagram: '📷',
  twitter: '🐦',
  facebook: '👤',
  linkedin: '💼'
}

const getWeekDays = (currentDate: Date) => {
  const startOfWeek = new Date(currentDate)
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
  
  const days = []
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek)
    day.setDate(startOfWeek.getDate() + i)
    days.push(day)
  }
  return days
}

const getMonthDays = (currentDate: Date) => {
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())
  
  const days = []
  for (let i = 0; i < 42; i++) {
    const day = new Date(startDate)
    day.setDate(startDate.getDate() + i)
    days.push(day)
  }
  return days
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<'week' | 'month'>('week')
  
  const { data: posts = [], isLoading, error } = usePosts()

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (view === 'week') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7))
    } else {
      newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1))
    }
    setCurrentDate(newDate)
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const getPostsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return posts.filter(post => post.scheduledDate === dateStr || post.publishedDate === dateStr)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth()
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
                Content Calendar
              </h1>
              <p className="text-lg text-muted-foreground">
                Orchestrate your content strategy with precision timing
              </p>
            </div>
            <div className="flex gap-3">
              <Button asChild size="lg" className="btn-hero shadow-glow">
                <NavLink to="/app/create">
                  <Plus className="w-5 h-5 mr-2" />
                  Quick Post
                </NavLink>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Calendar Controls */}
      <Card className="card-elevated shadow-elegant border-0 bg-gradient-subtle">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <Button variant="outline" size="lg" onClick={() => navigateDate('prev')} className="shadow-sm">
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" onClick={goToToday} className="shadow-sm bg-primary/5">
                  Today
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigateDate('next')} className="shadow-sm">
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-primary rounded-full"></div>
                <h2 className="text-2xl font-bold">
                  {currentDate.toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </h2>
              </div>
            </div>

            <Tabs value={view} onValueChange={(v) => setView(v as 'week' | 'month')}>
              <TabsList className="bg-background/50 shadow-sm">
                <TabsTrigger value="week" className="px-6">Week View</TabsTrigger>
                <TabsTrigger value="month" className="px-6">Month View</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <CalendarSkeleton />
          ) : error ? (
            <ErrorMessage message="Failed to load calendar data" />
          ) : (
          <Tabs value={view}>
            {/* Week View */}
            <TabsContent value="week">
              <div className="grid grid-cols-8 gap-4">
                {/* Time Column */}
                <div className="space-y-12 pt-16">
                  {Array.from({ length: 10 }, (_, i) => (
                    <div key={i} className="text-xs text-muted-foreground h-12 flex items-start font-medium">
                      {String(9 + i).padStart(2, '0')}:00
                    </div>
                  ))}
                </div>

                {/* Day Columns */}
                {getWeekDays(currentDate).map((day, dayIndex) => (
                  <div key={dayIndex} className="space-y-3">
                    {/* Premium Day Header */}
                    <Card className={`text-center p-3 border-0 shadow-elegant transition-all ${
                      isToday(day) 
                        ? 'bg-gradient-primary text-white shadow-glow' 
                        : 'bg-gradient-subtle hover:shadow-md'
                    }`}>
                      <div className="text-xs font-medium opacity-90">
                        {day.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="text-lg font-bold">
                        {day.getDate()}
                      </div>
                    </Card>

                    {/* Premium Posts for this day */}
                    <div className="space-y-2 min-h-[320px] relative">
                      {getPostsForDate(day).map((post) => (
                        <Card key={post.id} className="p-3 border-0 shadow-elegant hover:shadow-glow transition-all cursor-pointer bg-gradient-subtle">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1 mb-1">
                                <Badge 
                                  variant={post.status === 'scheduled' ? 'default' : 'secondary'}
                                  className="text-xs px-1.5 py-0.5"
                                >
                                  {post.status}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {post.scheduledTime || post.publishedTime || ''}
                                </span>
                              </div>
                              <p className="text-xs font-medium line-clamp-2 mb-1">{post.title}</p>
                              <div className="flex items-center gap-1">
                                {post.platforms.map((platform) => (
                                  <span key={platform} className="text-xs">
                                    {platformIcons[platform as keyof typeof platformIcons]}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <MoreHorizontal className="w-3 h-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Copy className="w-4 h-4 mr-2" />
                                  Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Month View */}
            <TabsContent value="month">
              <div className="grid grid-cols-7 gap-4">
                {/* Week Headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="p-3 text-center text-sm font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}

                {/* Month Days */}
                {getMonthDays(currentDate).map((day, index) => (
                  <Card 
                    key={index} 
                    className={`min-h-32 p-3 border-0 shadow-elegant hover:shadow-glow transition-all cursor-pointer bg-gradient-subtle ${
                      !isCurrentMonth(day) ? 'opacity-50' : ''
                    } ${isToday(day) ? 'ring-2 ring-primary bg-gradient-primary/5' : ''}`}
                  >
                    <div className={`text-sm font-medium mb-2 ${
                      isToday(day) ? 'text-primary' : 'text-foreground'
                    }`}>
                      {day.getDate()}
                    </div>
                    
                    <div className="space-y-1">
                      {getPostsForDate(day).slice(0, 3).map((post) => (
                        <div 
                          key={post.id} 
                          className="text-xs p-1.5 bg-primary/10 rounded-md truncate border border-primary/20"
                        >
                          {post.scheduledTime || post.publishedTime} {post.title}
                        </div>
                      ))}
                      {getPostsForDate(day).length > 3 && (
                        <div className="text-xs text-muted-foreground font-medium">
                          +{getPostsForDate(day).length - 3} more
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  )
}