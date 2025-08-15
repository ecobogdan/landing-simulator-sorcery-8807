import { useState } from "react"
import { usePosts, useDeletePost } from "@/hooks/usePostsData"
import { LoadingSkeleton } from "@/components/ui/loading-skeleton"
import { ErrorMessage } from "@/components/ui/error-boundary"
import { Search, Filter, Edit, Copy, Trash2, MoreHorizontal, Calendar, CheckCircle2, Clock, FileEdit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"

interface PostsListProps {
  type: 'all' | 'scheduled' | 'published' | 'drafts'
}

const mockPosts = [
  {
    id: 1,
    title: "Product launch announcement",
    platforms: ['instagram', 'linkedin'],
    status: 'scheduled',
    scheduledDate: '2025-08-15',
    scheduledTime: '10:00',
    author: 'John Doe',
    lastEdited: '2025-01-10',
  },
  {
    id: 2,
    title: "Behind the scenes content",
    platforms: ['twitter', 'instagram'],
    status: 'published',
    publishedDate: '2025-08-16',
    publishedTime: '14:30',
    author: 'Jane Smith',
    lastEdited: '2024-01-12',
  },
  {
    id: 3,
    title: "Weekly team update",
    platforms: ['linkedin'],
    status: 'draft',
    author: 'Mike Johnson',
    lastEdited: '2025-08-17',
  },
  {
    id: 4,
    title: "Holiday greetings post",
    platforms: ['facebook', 'twitter'],
    status: 'scheduled',
    scheduledDate: '2025-08-20',
    scheduledTime: '09:00',
    author: 'Sarah Wilson',
    lastEdited: '2024-01-14',
  }
]

const platformIcons = {
  instagram: '📷',
  twitter: '🐦',
  facebook: '👤',
  linkedin: '💼'
}

const statusConfig = {
  scheduled: { icon: Clock, color: 'default', label: 'Scheduled' },
  published: { icon: CheckCircle2, color: 'default', label: 'Published' },
  draft: { icon: FileEdit, color: 'secondary', label: 'Draft' },
  failed: { icon: Calendar, color: 'destructive', label: 'Failed' }
}

export default function PostsList({ type }: PostsListProps) {
  const [selectedPosts, setSelectedPosts] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  
  const { data: posts = [], isLoading, error, refetch } = usePosts({ 
    status: type === 'all' ? undefined : type,
    search: searchQuery 
  })
  
  const deletePostMutation = useDeletePost()

  const filteredPosts = posts

  const togglePostSelection = (id: number) => {
    setSelectedPosts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    setSelectedPosts(
      selectedPosts.length === filteredPosts.length 
        ? [] 
        : filteredPosts.map(p => p.id)
    )
  }

  const getPageTitle = () => {
    switch (type) {
      case 'scheduled': return 'Scheduled Posts'
      case 'published': return 'Published Posts'
      case 'drafts': return 'Draft Posts'
      default: return 'All Posts'
    }
  }

  const getPageDescription = () => {
    switch (type) {
      case 'scheduled': return 'Posts scheduled for future publication'
      case 'published': return 'Posts that have been published to social media'
      case 'drafts': return 'Draft posts ready for scheduling'
      default: return 'Manage all your social media posts'
    }
  }

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{getPageTitle()}</h1>
          <p className="text-muted-foreground">{getPageDescription()}</p>
        </div>
        <div className="flex items-center gap-2">
          {selectedPosts.length > 0 && (
            <>
              <Badge variant="secondary">{selectedPosts.length} selected</Badge>
              <Button variant="outline" size="sm">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="card-elevated">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search posts..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Posts Table */}
      <Card className="card-elevated">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Posts ({filteredPosts.length})</CardTitle>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
                onCheckedChange={toggleSelectAll}
              />
              <span className="text-sm text-muted-foreground">Select All</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-4">
                  <LoadingSkeleton className="h-10 w-10 rounded" />
                  <div className="flex-1 space-y-2">
                    <LoadingSkeleton className="h-4 w-3/4" />
                    <LoadingSkeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <ErrorMessage 
              message="Failed to load posts" 
              onRetry={() => refetch()} 
            />
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No posts found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery 
                  ? `No posts match "${searchQuery}"`
                  : `No ${type === 'all' ? '' : type + ' '}posts available`
                }
              </p>
              {!searchQuery && (
                <Button>Create Your First Post</Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedPosts.length === filteredPosts.length}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Post</TableHead>
                  <TableHead>Platforms</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.map((post) => {
                  const StatusIcon = statusConfig[post.status as keyof typeof statusConfig]?.icon || Calendar
                  return (
                    <TableRow key={post.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedPosts.includes(post.id)}
                          onCheckedChange={() => togglePostSelection(post.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-muted/30 rounded flex items-center justify-center">
                            📝
                          </div>
                          <div>
                            <p className="font-medium">{post.title}</p>
                            <p className="text-sm text-muted-foreground">
                              Last edited {post.lastEdited}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {post.platforms.map((platform) => (
                            <span key={platform} className="text-lg">
                              {platformIcons[platform as keyof typeof platformIcons]}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={statusConfig[post.status as keyof typeof statusConfig]?.color as any || 'default'}
                          className="flex items-center gap-1 w-fit"
                        >
                          <StatusIcon className="w-3 h-3" />
                          {statusConfig[post.status as keyof typeof statusConfig]?.label || post.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {post.status === 'scheduled' && (
                          <div>
                            <p className="text-sm font-medium">{post.scheduledDate}</p>
                            <p className="text-xs text-muted-foreground">{post.scheduledTime}</p>
                          </div>
                        )}
                        {post.status === 'published' && (
                          <div>
                            <p className="text-sm font-medium">{post.publishedDate}</p>
                            <p className="text-xs text-muted-foreground">{post.publishedTime}</p>
                          </div>
                        )}
                        {post.status === 'draft' && (
                          <span className="text-sm text-muted-foreground">Not scheduled</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{post.author}</span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}