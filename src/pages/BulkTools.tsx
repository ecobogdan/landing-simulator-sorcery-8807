import { useState } from "react"
import { Upload, Download, Calendar, Edit, Search, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function BulkTools() {
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setCsvFile(file)
    }
  }

  const simulateProcessing = async () => {
    setIsProcessing(true)
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i)
      await new Promise(resolve => setTimeout(resolve, 200))
    }
    setIsProcessing(false)
  }

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Bulk Tools</h1>
          <p className="text-muted-foreground">Import, export, and manage posts in bulk</p>
        </div>
      </div>

      <Tabs defaultValue="import" className="space-y-6">
        <TabsList>
          <TabsTrigger value="import">CSV Import</TabsTrigger>
          <TabsTrigger value="actions">Bulk Actions</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
        </TabsList>

        {/* CSV Import */}
        <TabsContent value="import" className="space-y-6">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Import Posts from CSV</CardTitle>
              <CardDescription>
                Upload a CSV file to create multiple posts at once. Download our template to get started.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Template Download */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">CSV Template</h4>
                  <p className="text-sm text-muted-foreground">
                    Download our template with all required columns and sample data
                  </p>
                </div>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Template
                </Button>
              </div>

              {/* File Upload */}
              <div className="space-y-4">
                <Label htmlFor="csv-upload">Upload CSV File</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  {csvFile ? (
                    <div className="space-y-2">
                      <CheckCircle2 className="w-8 h-8 mx-auto text-success" />
                      <p className="font-medium">{csvFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(csvFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag and drop your CSV file here, or click to browse
                      </p>
                    </>
                  )}
                  <input
                    id="csv-upload"
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('csv-upload')?.click()}
                  >
                    Browse Files
                  </Button>
                </div>
              </div>

              {/* Processing */}
              {isProcessing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Processing CSV...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <Button 
                  onClick={simulateProcessing}
                  disabled={!csvFile || isProcessing}
                  className="btn-hero"
                >
                  Process File
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setCsvFile(null)
                    setUploadProgress(0)
                  }}
                >
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Column Mapping */}
          {csvFile && !isProcessing && (
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Column Mapping</CardTitle>
                <CardDescription>
                  Map your CSV columns to the correct post fields
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Date Column</Label>
                    <Input defaultValue="date" className="mt-1" />
                  </div>
                  <div>
                    <Label>Time Column</Label>
                    <Input defaultValue="time" className="mt-1" />
                  </div>
                  <div>
                    <Label>Caption Column</Label>
                    <Input defaultValue="caption" className="mt-1" />
                  </div>
                  <div>
                    <Label>Networks Column</Label>
                    <Input defaultValue="networks" className="mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Bulk Actions */}
        <TabsContent value="actions" className="space-y-6">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Bulk Edit Posts</CardTitle>
              <CardDescription>
                Select multiple posts and edit them all at once
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search posts to edit..." className="pl-10" />
              </div>

              {/* Actions */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Reschedule Posts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Change the scheduling time for multiple posts
                    </p>
                    <Button variant="outline" className="w-full">
                      Select Posts to Reschedule
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Edit className="w-5 h-5" />
                      Find & Replace
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Replace text across multiple post captions
                    </p>
                    <Button variant="outline" className="w-full">
                      Start Find & Replace
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Find & Replace Text</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="find-text">Find</Label>
                    <Input id="find-text" placeholder="Text to find..." className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="replace-text">Replace with</Label>
                    <Input id="replace-text" placeholder="Replacement text..." className="mt-1" />
                  </div>
                  <Button className="w-full">
                    Preview Changes
                  </Button>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Export */}
        <TabsContent value="export" className="space-y-6">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Export Posts</CardTitle>
              <CardDescription>
                Download your posts data in various formats
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Export to CSV</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Download all your posts in CSV format for backup or analysis
                    </p>
                    <Button variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Export CSV
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Analytics Report</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Export post performance data and engagement metrics
                    </p>
                    <Button variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Export Report
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Export Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Export Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>Date Range</Label>
                      <Input type="date" className="mt-1" />
                    </div>
                    <div>
                      <Label>End Date</Label>
                      <Input type="date" className="mt-1" />
                    </div>
                  </div>
                  
                  <div>
                    <Label>Status Filter</Label>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline">All</Badge>
                      <Badge variant="outline">Published</Badge>
                      <Badge variant="outline">Scheduled</Badge>
                      <Badge variant="outline">Drafts</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}