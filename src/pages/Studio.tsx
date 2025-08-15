import { useState } from "react"
import { Upload, Search, Filter, Grid, List, Folder, Tag, MoreHorizontal, Download, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

const mockMedia = [
  {
    id: 1,
    type: 'image',
    name: 'product-launch.jpg',
    size: '2.3 MB',
    dimensions: '1080x1080',
    uploadDate: '2025-01-10',
    tags: ['product', 'launch'],
    used: true
  },
  {
    id: 2,
    type: 'video',
    name: 'behind-scenes.mp4',
    size: '15.7 MB',
    duration: '0:45',
    uploadDate: '2025-01-08',
    tags: ['bts', 'team'],
    used: false
  },
  {
    id: 3,
    type: 'image',
    name: 'team-photo.jpg',
    size: '1.8 MB',
    dimensions: '1200x800',
    uploadDate: '2025-01-05',
    tags: ['team', 'office'],
    used: true
  }
]

export default function Studio() {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const toggleSelection = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Studio</h1>
          <p className="text-muted-foreground">Manage your media library and assets</p>
        </div>
        <Button className="btn-hero">
          <Upload className="w-4 h-4 mr-2" />
          Upload Media
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="card-elevated">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Files
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Storage Used
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2 GB</div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Images
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Videos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
          </CardContent>
        </Card>
      </div>

      {/* Media Library */}
      <Card className="card-elevated">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Media Library</CardTitle>
            <div className="flex items-center gap-2">
              {selectedItems.length > 0 && (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{selectedItems.length} selected</Badge>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              )}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
              >
                {view === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search media..." className="pl-10" />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Files</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="folders">Folders</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              {view === 'grid' ? (
                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {mockMedia.map((item) => (
                    <Card 
                      key={item.id} 
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedItems.includes(item.id) ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => toggleSelection(item.id)}
                    >
                      <CardHeader className="p-0">
                        <div className="aspect-square bg-muted/30 rounded-t-lg flex items-center justify-center">
                          {item.type === 'image' ? (
                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg flex items-center justify-center text-white text-2xl">
                              🖼️
                            </div>
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-red-500 to-orange-600 rounded-t-lg flex items-center justify-center text-white text-2xl">
                              🎥
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{item.name}</h4>
                            <p className="text-xs text-muted-foreground">{item.size}</p>
                            {item.dimensions && (
                              <p className="text-xs text-muted-foreground">{item.dimensions}</p>
                            )}
                            {item.duration && (
                              <p className="text-xs text-muted-foreground">{item.duration}</p>
                            )}
                            <div className="flex flex-wrap gap-1 mt-2">
                              {item.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Tag className="w-4 h-4 mr-2" />
                                Edit Tags
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {mockMedia.map((item) => (
                    <Card 
                      key={item.id}
                      className={`cursor-pointer transition-all hover:shadow-sm ${
                        selectedItems.includes(item.id) ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => toggleSelection(item.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-muted/30 rounded flex items-center justify-center">
                            {item.type === 'image' ? '🖼️' : '🎥'}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {item.size} • {item.uploadDate}
                              {item.dimensions && ` • ${item.dimensions}`}
                              {item.duration && ` • ${item.duration}`}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {item.used && (
                              <Badge variant="secondary">Used</Badge>
                            )}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Tag className="w-4 h-4 mr-2" />
                                  Edit Tags
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="images">
              <div className="text-center py-12">
                <p className="text-muted-foreground">Image files will be shown here</p>
              </div>
            </TabsContent>

            <TabsContent value="videos">
              <div className="text-center py-12">
                <p className="text-muted-foreground">Video files will be shown here</p>
              </div>
            </TabsContent>

            <TabsContent value="folders">
              <div className="text-center py-12">
                <Folder className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No folders yet</h3>
                <p className="text-muted-foreground mb-4">Create folders to organize your media</p>
                <Button>Create Folder</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}