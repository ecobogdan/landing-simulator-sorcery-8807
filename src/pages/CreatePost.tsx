import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { FileText, Image, Video, Calendar, Clock, Hash, Link2, Save, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

const socialPlatforms = [
  { id: 'instagram', name: 'Instagram', icon: '📷', connected: true, charLimit: 2200 },
  { id: 'twitter', name: 'Twitter', icon: '🐦', connected: true, charLimit: 280 },
  { id: 'facebook', name: 'Facebook', icon: '👤', connected: false, charLimit: 63206 },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼', connected: true, charLimit: 3000 },
]

export default function CreatePost() {
  const [searchParams] = useSearchParams()
  const defaultType = searchParams.get('type') || 'text'
  
  const [postType, setPostType] = useState(defaultType)
  const [selectedPlatforms, setSelectedPlatforms] = useState(['instagram', 'linkedin'])
  const [caption, setCaption] = useState("")
  const [scheduledFor, setScheduledFor] = useState("")
  const [postNow, setPostNow] = useState(true)
  
  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    )
  }

  const getCharacterLimit = () => {
    if (selectedPlatforms.length === 0) return 0
    const limits = selectedPlatforms.map(id => 
      socialPlatforms.find(p => p.id === id)?.charLimit || 0
    )
    return Math.min(...limits)
  }

  const charLimit = getCharacterLimit()
  const charCount = caption.length
  const isOverLimit = charCount > charLimit

  return (
    <div className="max-w-7xl mx-auto space-y-8 fade-in">
      {/* Premium Header with Gradient */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-subtle opacity-50 rounded-2xl"></div>
        <div className="relative p-8 rounded-2xl border bg-background/95 backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Create Post
              </h1>
              <p className="text-lg text-muted-foreground">
                Craft premium content that engages your audience across all platforms
              </p>
            </div>
            <div className="flex gap-3">
              <Button size="lg" className="btn-hero shadow-glow">
                <Send className="w-4 h-4 mr-2" />
                {postNow ? 'Publish Now' : 'Schedule Post'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Composer */}
        <div className="lg:col-span-2 space-y-8">
          {/* Post Type Selection */}
          <Card className="card-elevated shadow-elegant border-0">
            <CardHeader className="pb-6">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-primary"></div>
                Content Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={postType} onValueChange={setPostType}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="text">
                    <FileText className="w-4 h-4 mr-2" />
                    Text
                  </TabsTrigger>
                  <TabsTrigger value="image">
                    <Image className="w-4 h-4 mr-2" />
                    Image
                  </TabsTrigger>
                  <TabsTrigger value="video">
                    <Video className="w-4 h-4 mr-2" />
                    Video
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="text" className="mt-6 space-y-4">
                  <div>
                    <Label htmlFor="caption">Caption</Label>
                    <Textarea
                      id="caption"
                      placeholder="What's on your mind?"
                      className="min-h-32 mt-2"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                    />
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-sm text-muted-foreground">
                        {charCount} / {charLimit} characters
                      </div>
                      {isOverLimit && (
                        <Badge variant="destructive">Over limit</Badge>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="image" className="mt-6 space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <Image className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop images here, or click to browse
                    </p>
                    <Button variant="outline" size="sm">
                      Browse Files
                    </Button>
                  </div>
                  
                  <div>
                    <Label htmlFor="image-caption">Caption</Label>
                    <Textarea
                      id="image-caption"
                      placeholder="Add a caption to your image..."
                      className="min-h-24 mt-2"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="video" className="mt-6 space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <Video className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload your video content
                    </p>
                    <Button variant="outline" size="sm">
                      Browse Videos
                    </Button>
                  </div>
                  
                  <div>
                    <Label htmlFor="video-caption">Caption</Label>
                    <Textarea
                      id="video-caption"
                      placeholder="Describe your video..."
                      className="min-h-24 mt-2"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Enhanced Additional Options */}
          <Card className="card-elevated shadow-elegant border-0">
            <CardHeader className="pb-6">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-primary"></div>
                Enhancement Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="hashtags" className="flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  Hashtags
                </Label>
                <Input
                  id="hashtags"
                  placeholder="#social #media #marketing"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="link" className="flex items-center gap-2">
                  <Link2 className="w-4 h-4" />
                  Link
                </Label>
                <Input
                  id="link"
                  placeholder="https://example.com"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="first-comment">First Comment (Instagram)</Label>
                <Textarea
                  id="first-comment"
                  placeholder="Add a first comment..."
                  className="min-h-20 mt-2"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Premium Sidebar */}
        <div className="space-y-8">
          {/* Platform Selection */}
          <Card className="card-elevated shadow-elegant border-0 bg-gradient-subtle">
            <CardHeader className="pb-6">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-primary"></div>
                Publishing Platforms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {socialPlatforms.map((platform) => (
                <div key={platform.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{platform.icon}</span>
                    <div>
                      <span className="font-medium">{platform.name}</span>
                      {!platform.connected && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          Not connected
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Switch
                    checked={selectedPlatforms.includes(platform.id)}
                    onCheckedChange={() => handlePlatformToggle(platform.id)}
                    disabled={!platform.connected}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Scheduling */}
          <Card className="card-elevated shadow-elegant border-0">
            <CardHeader className="pb-6">
              <CardTitle className="text-xl font-semibold flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-primary">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                Smart Scheduling
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="post-now">Post now</Label>
                <Switch
                  id="post-now"
                  checked={postNow}
                  onCheckedChange={setPostNow}
                />
              </div>

              {!postNow && (
                <>
                  <Separator />
                  <div>
                    <Label htmlFor="schedule-date">Date & Time</Label>
                    <Input
                      id="schedule-date"
                      type="datetime-local"
                      className="mt-2"
                      value={scheduledFor}
                      onChange={(e) => setScheduledFor(e.target.value)}
                    />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Timezone: UTC-8 (PST)
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Live Preview */}
          <Card className="card-elevated shadow-elegant border-0">
            <CardHeader className="pb-6">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-primary animate-pulse"></div>
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-muted/30">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">📷</span>
                  <span className="font-medium text-sm">Instagram</span>
                </div>
                <div className="text-sm">
                  {caption || "Your caption will appear here..."}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}