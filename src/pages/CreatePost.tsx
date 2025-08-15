import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { FileText, Image, Video, Calendar, Clock, Hash, Link2, Send, Upload, Sparkles, Zap, Users, Eye, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { AccountSelector } from "@/components/AccountSelector"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import type { PostTarget } from "@/types/accounts"

const socialPlatforms = [
  { 
    id: 'instagram', 
    name: 'Instagram', 
    icon: '📷', 
    connected: true, 
    charLimit: 2200,
    color: 'from-pink-500 to-purple-500',
    followers: '12.5K'
  },
  { 
    id: 'twitter', 
    name: 'Twitter', 
    icon: '🐦', 
    connected: true, 
    charLimit: 280,
    color: 'from-blue-400 to-blue-600',
    followers: '8.2K'
  },
  { 
    id: 'facebook', 
    name: 'Facebook', 
    icon: '👤', 
    connected: false, 
    charLimit: 63206,
    color: 'from-blue-600 to-blue-800',
    followers: '0'
  },
  { 
    id: 'linkedin', 
    name: 'LinkedIn', 
    icon: '💼', 
    connected: true, 
    charLimit: 3000,
    color: 'from-blue-700 to-blue-900',
    followers: '5.1K'
  },
]

export default function CreatePost() {
  const [searchParams] = useSearchParams()
  const defaultType = searchParams.get('type') || 'text'
  
  const [postType, setPostType] = useState(defaultType)
  const [selectedPlatforms, setSelectedPlatforms] = useState(['instagram', 'linkedin'])
  const [selectedAccounts, setSelectedAccounts] = useState<PostTarget[]>([])
  const [caption, setCaption] = useState("")
  const [scheduledDate, setScheduledDate] = useState<Date>()
  const [scheduledTime, setScheduledTime] = useState("")
  const [postNow, setPostNow] = useState(true)
  const [hashtags, setHashtags] = useState("")
  const [link, setLink] = useState("")
  const [firstComment, setFirstComment] = useState("")
  
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
  const isOverLimit = charCount > charLimit && charLimit > 0

  const suggestedHashtags = ['#socialmedia', '#marketing', '#content', '#digital', '#brand', '#engagement']

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-7xl mx-auto p-6 space-y-8 fade-in">
        {/* Premium Header with floating elements */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero opacity-5 rounded-3xl blur-3xl transform scale-110"></div>
          <div className="relative bg-gradient-card rounded-3xl border-0 shadow-strong p-8 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-gradient-primary">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    Create Premium Content
                  </h1>
                </div>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Craft engaging content that resonates with your audience across all platforms with AI-powered insights
                </p>
              </div>
              <div className="flex gap-3">
                <Button size="lg" className="premium-button text-white shadow-purple">
                  <Send className="w-5 h-5 mr-2" />
                  {postNow ? 'Publish Now' : 'Schedule Post'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-6">
            {/* Content Type Selector */}
            <Card className="premium-card border-0 overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-primary rounded-full"></div>
                  Content Type
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={postType} onValueChange={setPostType}>
                  <TabsList className="grid w-full grid-cols-3 bg-muted/30 p-1 rounded-2xl">
                    <TabsTrigger value="text" className="content-type-tab">
                      <FileText className="w-5 h-5" />
                      Text Post
                    </TabsTrigger>
                    <TabsTrigger value="image" className="content-type-tab">
                      <Image className="w-5 h-5" />
                      Image Post
                    </TabsTrigger>
                    <TabsTrigger value="video" className="content-type-tab">
                      <Video className="w-5 h-5" />
                      Video Post
                    </TabsTrigger>
                  </TabsList>

                  <div className="mt-8">
                    <TabsContent value="text" className="space-y-6">
                      <div>
                        <Label htmlFor="caption" className="text-base font-medium mb-3 block">
                          Caption
                        </Label>
                        <Textarea
                          id="caption"
                          placeholder="What's on your mind? Share your thoughts with the world..."
                          className="premium-input min-h-40 text-base resize-none"
                          value={caption}
                          onChange={(e) => setCaption(e.target.value)}
                        />
                        <div className="flex justify-between items-center mt-3">
                          <div className="text-sm text-muted-foreground">
                            {charCount} {charLimit > 0 && `/ ${charLimit.toLocaleString()}`} characters
                          </div>
                          {isOverLimit && (
                            <Badge variant="destructive" className="animate-pulse">
                              Over limit
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="image" className="space-y-6">
                      <div className="upload-zone">
                        <div className="relative">
                          <Upload className="w-12 h-12 mx-auto mb-4 text-primary" />
                          <h3 className="text-lg font-semibold mb-2">Upload your images</h3>
                          <p className="text-muted-foreground mb-4">
                            Drag and drop images here, or click to browse
                          </p>
                          <Button className="premium-button text-white">
                            <Upload className="w-4 h-4 mr-2" />
                            Browse Files
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="image-caption" className="text-base font-medium mb-3 block">
                          Caption
                        </Label>
                        <Textarea
                          id="image-caption"
                          placeholder="Add a compelling caption to your image..."
                          className="premium-input min-h-32 resize-none"
                          value={caption}
                          onChange={(e) => setCaption(e.target.value)}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="video" className="space-y-6">
                      <div className="upload-zone">
                        <div className="relative">
                          <Video className="w-12 h-12 mx-auto mb-4 text-primary" />
                          <h3 className="text-lg font-semibold mb-2">Upload your video</h3>
                          <p className="text-muted-foreground mb-4">
                            Upload engaging video content
                          </p>
                          <Button className="premium-button text-white">
                            <Upload className="w-4 h-4 mr-2" />
                            Browse Videos
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="video-caption" className="text-base font-medium mb-3 block">
                          Caption
                        </Label>
                        <Textarea
                          id="video-caption"
                          placeholder="Describe your video and engage your audience..."
                          className="premium-input min-h-32 resize-none"
                          value={caption}
                          onChange={(e) => setCaption(e.target.value)}
                        />
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>

            {/* Live Preview */}
            {caption && (
              <Card className="premium-card border-0 overflow-hidden animate-fadeIn">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-primary rounded-full animate-pulse"></div>
                    <Eye className="w-5 h-5" />
                    Live Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-subtle rounded-2xl p-6 border">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-lg">📷</span>
                      </div>
                      <div>
                        <div className="font-semibold">Your Brand</div>
                        <div className="text-sm text-muted-foreground">Instagram</div>
                      </div>
                    </div>
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                      {caption}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Enhancement Options */}
            <Card className="premium-card border-0">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold flex items-center gap-3">
                  <Zap className="w-5 h-5 text-primary" />
                  Enhancement Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="hashtags" className="text-base font-medium mb-3 flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    Hashtags
                  </Label>
                  <Input
                    id="hashtags"
                    placeholder="#social #media #marketing"
                    className="premium-input"
                    value={hashtags}
                    onChange={(e) => setHashtags(e.target.value)}
                  />
                  <div className="flex flex-wrap gap-2 mt-3">
                    {suggestedHashtags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setHashtags(prev => prev ? `${prev} ${tag}` : tag)}
                        className="text-xs px-3 py-1 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="link" className="text-base font-medium mb-3 flex items-center gap-2">
                    <Link2 className="w-4 h-4" />
                    Link
                  </Label>
                  <Input
                    id="link"
                    placeholder="https://example.com"
                    className="premium-input"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="first-comment" className="text-base font-medium mb-3 block">
                    First Comment (Instagram)
                  </Label>
                  <Textarea
                    id="first-comment"
                    placeholder="Add a first comment to engage your audience..."
                    className="premium-input min-h-24 resize-none"
                    value={firstComment}
                    onChange={(e) => setFirstComment(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Platform Selection */}
            <Card className="premium-card border-0 bg-gradient-subtle">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  Publishing Platforms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {socialPlatforms.map((platform) => (
                  <div 
                    key={platform.id} 
                    className={`platform-card ${selectedPlatforms.includes(platform.id) ? 'selected' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${platform.color} flex items-center justify-center`}>
                        <span className="text-white text-lg">{platform.icon}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{platform.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {platform.connected ? (
                            <span className="flex items-center gap-1">
                              <span className="text-green-500">●</span>
                              {platform.followers} followers
                            </span>
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              Not connected
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={selectedPlatforms.includes(platform.id)}
                      onCheckedChange={() => handlePlatformToggle(platform.id)}
                      disabled={!platform.connected}
                      className="premium-toggle"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Account Selection */}
            {selectedPlatforms.length > 0 && (
              <AccountSelector
                selectedAccounts={selectedAccounts}
                onAccountsChange={setSelectedAccounts}
                selectedPlatforms={selectedPlatforms}
              />
            )}

            {/* Smart Scheduling */}
            <Card className="premium-card border-0">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-primary">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  Smart Scheduling
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="post-now" className="text-base font-medium">
                    Post now
                  </Label>
                  <Switch
                    id="post-now"
                    checked={postNow}
                    onCheckedChange={setPostNow}
                    className="premium-toggle"
                  />
                </div>

                {!postNow && (
                  <>
                    <Separator />
                    <div className="space-y-4">
                      <div>
                        <Label className="text-base font-medium mb-3 block">
                          Schedule Date
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal premium-input p-0 h-auto",
                                !scheduledDate && "text-muted-foreground"
                              )}
                            >
                              <div className="px-4 py-3 flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {scheduledDate ? format(scheduledDate, "PPP") : "Pick a date"}
                              </div>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={scheduledDate}
                              onSelect={setScheduledDate}
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div>
                        <Label htmlFor="schedule-time" className="text-base font-medium mb-3 block">
                          Time
                        </Label>
                        <Input
                          id="schedule-time"
                          type="time"
                          className="premium-input"
                          value={scheduledTime}
                          onChange={(e) => setScheduledTime(e.target.value)}
                        />
                      </div>
                      
                      <div className="text-sm text-muted-foreground flex items-center gap-2 p-3 bg-muted/30 rounded-xl">
                        <Clock className="w-4 h-4" />
                        Timezone: UTC-8 (PST)
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}