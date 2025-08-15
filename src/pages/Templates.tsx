import { useState } from "react"
import { Search, Plus, Heart, MessageCircle, Share, Copy, Edit, Trash2, MoreHorizontal, Filter, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const mockTemplates = [
  {
    id: 1,
    title: "Product Launch",
    content: "🚀 Exciting news! We're thrilled to announce the launch of [PRODUCT NAME]!\n\n✨ Key features:\n• [Feature 1]\n• [Feature 2]\n• [Feature 3]\n\nGet ready to [BENEFIT]. Available now at [LINK]!\n\n#ProductLaunch #Innovation #[YourBrand]",
    category: "announcement",
    platforms: ["instagram", "twitter", "linkedin"],
    usageCount: 24,
    performance: { avgLikes: 45, avgComments: 12, avgShares: 8 }
  },
  {
    id: 2,
    title: "Behind the Scenes",
    content: "Take a peek behind the curtain! 👀\n\nHere's what goes into creating [PRODUCT/SERVICE]:\n\n1. [Process step 1]\n2. [Process step 2]\n3. [Process step 3]\n\nOur team puts their heart into every detail. What would you like to see more of?\n\n#BehindTheScenes #TeamWork #[YourBrand]",
    category: "engagement",
    platforms: ["instagram", "facebook"],
    usageCount: 18,
    performance: { avgLikes: 67, avgComments: 23, avgShares: 12 }
  },
  {
    id: 3,
    title: "Question/Poll",
    content: "Let's settle this once and for all! 🤔\n\n[QUESTION]?\n\nA) [Option A]\nB) [Option B]\nC) [Option C]\n\nDrop your vote in the comments and tell us why!\n\n#Poll #Community #YourOpinion",
    category: "engagement",
    platforms: ["twitter", "instagram", "facebook"],
    usageCount: 31,
    performance: { avgLikes: 52, avgComments: 38, avgShares: 15 }
  },
  {
    id: 4,
    title: "Educational Tip",
    content: "💡 Pro Tip Tuesday!\n\nDid you know that [EDUCATIONAL FACT]?\n\nHere's how you can apply this:\n\n1. [Tip 1]\n2. [Tip 2]\n3. [Tip 3]\n\nTry it out and let us know your results!\n\n#ProTip #Education #Learn #[YourField]",
    category: "educational",
    platforms: ["linkedin", "twitter"],
    usageCount: 15,
    performance: { avgLikes: 38, avgComments: 19, avgShares: 22 }
  },
  {
    id: 5,
    title: "Thank You Post",
    content: "Feeling grateful today! 🙏\n\nA huge thank you to all our amazing [CUSTOMERS/FOLLOWERS] who make what we do possible.\n\nYour support means everything to us. Here's to [SHARED GOAL/FUTURE]!\n\n❤️ Drop a [EMOJI] if you're part of our journey!\n\n#Grateful #Community #ThankYou",
    category: "appreciation",
    platforms: ["instagram", "facebook", "linkedin"],
    usageCount: 9,
    performance: { avgLikes: 89, avgComments: 45, avgShares: 28 }
  }
]

const categories = [
  { id: "all", label: "All Templates", count: mockTemplates.length },
  { id: "announcement", label: "Announcements", count: 1 },
  { id: "engagement", label: "Engagement", count: 2 },
  { id: "educational", label: "Educational", count: 1 },
  { id: "appreciation", label: "Appreciation", count: 1 }
]

const platformIcons = {
  instagram: "📷",
  twitter: "🐦",
  facebook: "👤",
  linkedin: "💼"
}

export default function Templates() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const filteredTemplates = mockTemplates.filter(template => {
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.content.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleUseTemplate = (template: typeof mockTemplates[0]) => {
    // This would integrate with the create post flow
    console.log("Using template:", template.title)
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
                Content Templates
              </h1>
              <p className="text-lg text-muted-foreground">
                Pre-built templates to accelerate your content creation
              </p>
            </div>
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="btn-hero shadow-glow">
                  <Plus className="w-5 h-5 mr-2" />
                  Create Template
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Template</DialogTitle>
                  <DialogDescription>
                    Build a reusable template for your content creation workflow
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="template-title">Template Title</Label>
                    <Input id="template-title" placeholder="e.g., Product Launch Announcement" />
                  </div>
                  <div>
                    <Label htmlFor="template-content">Template Content</Label>
                    <Textarea 
                      id="template-content" 
                      placeholder="Write your template content here. Use [PLACEHOLDER] for dynamic content."
                      rows={8}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsCreateModalOpen(false)}>
                      Create Template
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="card-elevated">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search templates..." 
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

      {/* Categories */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="bg-background border">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="px-6">
              {category.label} ({category.count})
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="space-y-6 mt-6">
          {filteredTemplates.length === 0 ? (
            <Card className="card-elevated">
              <CardContent className="text-center py-12">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No templates found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery 
                    ? `No templates match "${searchQuery}"`
                    : "No templates in this category yet"
                  }
                </p>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                  Create Your First Template
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="card-elevated group cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{template.title}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {template.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Used {template.usageCount} times
                          </span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleUseTemplate(template)}>
                            <Copy className="w-4 h-4 mr-2" />
                            Use Template
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Template
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Template Preview */}
                    <div className="bg-muted/30 rounded-lg p-3 text-sm text-muted-foreground line-clamp-4">
                      {template.content}
                    </div>

                    {/* Platforms */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Platforms:</span>
                      <div className="flex items-center gap-1">
                        {template.platforms.map((platform) => (
                          <span key={platform} className="text-sm">
                            {platformIcons[platform as keyof typeof platformIcons]}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Performance */}
                    <div className="grid grid-cols-3 gap-3 pt-2 border-t">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                          <Heart className="w-3 h-3" />
                          Avg Likes
                        </div>
                        <div className="font-semibold text-sm">{template.performance.avgLikes}</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                          <MessageCircle className="w-3 h-3" />
                          Comments
                        </div>
                        <div className="font-semibold text-sm">{template.performance.avgComments}</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                          <Share className="w-3 h-3" />
                          Shares
                        </div>
                        <div className="font-semibold text-sm">{template.performance.avgShares}</div>
                      </div>
                    </div>

                    {/* Use Template Button */}
                    <Button 
                      className="w-full mt-4" 
                      onClick={() => handleUseTemplate(template)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Use Template
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}