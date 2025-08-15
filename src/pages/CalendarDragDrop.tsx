import { useState, useCallback } from "react"
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
import { 
  ReactFlow,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Background,
  Controls,
  MiniMap,
  NodeTypes
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

// Calendar-specific node component for posts
function PostNode({ data }: { data: any }) {
  return (
    <div className="bg-gradient-subtle border rounded-lg p-3 shadow-sm min-w-[200px]">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-1">
          <Badge 
            variant={data.status === 'scheduled' ? 'default' : 'secondary'}
            className="text-xs"
          >
            {data.status}
          </Badge>
          <span className="text-xs text-muted-foreground">{data.time}</span>
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
      
      <p className="text-sm font-medium line-clamp-2 mb-2">{data.title}</p>
      
      <div className="flex items-center gap-1">
        {data.platforms?.map((platform: string) => (
          <span key={platform} className="text-xs">
            {platform === 'instagram' ? '📷' : 
             platform === 'twitter' ? '🐦' : 
             platform === 'facebook' ? '👤' : 
             platform === 'linkedin' ? '💼' : '📱'}
          </span>
        ))}
      </div>
    </div>
  )
}

// Time slot node for the calendar grid
function TimeSlotNode({ data }: { data: any }) {
  return (
    <div className="w-full h-16 border-2 border-dashed border-muted rounded-lg bg-muted/10 flex items-center justify-center">
      <span className="text-xs text-muted-foreground">{data.time}</span>
    </div>
  )
}

const nodeTypes: NodeTypes = {
  post: PostNode,
  timeSlot: TimeSlotNode,
}

const mockPosts = [
  {
    id: 1,
    title: "Product launch announcement",
    platforms: ['instagram', 'linkedin'],
    status: 'scheduled',
    time: '10:00',
    date: '2025-08-15',
  },
  {
    id: 2,
    title: "Behind the scenes content",
    platforms: ['twitter', 'instagram'],
    status: 'scheduled',
    time: '14:30',
    date: '2025-08-14',
  },
  {
    id: 3,
    title: "Weekly team update",
    platforms: ['linkedin'],
    status: 'draft',
    time: '09:00',
    date: '2025-08-16',
  }
]

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

// Generate initial nodes for the calendar flow
const generateCalendarNodes = (currentDate: Date): Node[] => {
  const nodes: Node[] = []
  const weekDays = getWeekDays(currentDate)
  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']
  
  // Create time slot nodes
  weekDays.forEach((day, dayIndex) => {
    timeSlots.forEach((time, timeIndex) => {
      const nodeId = `timeslot-${dayIndex}-${timeIndex}`
      nodes.push({
        id: nodeId,
        type: 'timeSlot',
        position: { x: dayIndex * 220 + 100, y: timeIndex * 80 + 100 },
        data: { 
          time,
          date: day.toISOString().split('T')[0],
          dayIndex,
          timeIndex 
        },
        draggable: false,
      })
    })
  })
  
  // Create post nodes
  mockPosts.forEach((post, index) => {
    const postDate = new Date(post.date)
    const dayIndex = weekDays.findIndex(day => 
      day.toISOString().split('T')[0] === post.date
    )
    
    if (dayIndex !== -1) {
      const timeIndex = timeSlots.findIndex(slot => slot === post.time)
      if (timeIndex !== -1) {
        nodes.push({
          id: `post-${post.id}`,
          type: 'post',
          position: { x: dayIndex * 220 + 100, y: timeIndex * 80 + 100 },
          data: post,
          draggable: true,
        })
      }
    }
  })
  
  return nodes
}

export default function CalendarDragDrop() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [nodes, setNodes, onNodesChange] = useNodesState(generateCalendarNodes(currentDate))
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7))
    setCurrentDate(newDate)
    setNodes(generateCalendarNodes(newDate))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
    setNodes(generateCalendarNodes(new Date()))
  }

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  // Handle drag end to snap posts to time slots
  const handleNodeDragStop = useCallback((event: any, node: Node) => {
    if (node.type !== 'post') return

    const weekDays = getWeekDays(currentDate)
    const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']
    
    // Find the closest time slot based on position
    const dayIndex = Math.round((node.position.x - 100) / 220)
    const timeIndex = Math.round((node.position.y - 100) / 80)
    
    // Ensure indices are within bounds
    if (dayIndex >= 0 && dayIndex < 7 && timeIndex >= 0 && timeIndex < timeSlots.length) {
      const newDate = weekDays[dayIndex].toISOString().split('T')[0]
      const newTime = timeSlots[timeIndex]
      
      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === node.id) {
            return {
              ...n,
              position: { x: dayIndex * 220 + 100, y: timeIndex * 80 + 100 },
              data: {
                ...n.data,
                date: newDate,
                time: newTime,
              },
            }
          }
          return n
        })
      )
    }
  }, [currentDate, setNodes])

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const weekDays = getWeekDays(currentDate)

  return (
    <div className="space-y-8 fade-in">
      {/* Premium Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-subtle opacity-50 rounded-2xl"></div>
        <div className="relative p-8 rounded-2xl border bg-background/95 backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Interactive Calendar
              </h1>
              <p className="text-lg text-muted-foreground">
                Drag and drop posts to reschedule with visual precision
              </p>
            </div>
            <Button size="lg" className="btn-hero shadow-glow">
              <Plus className="w-5 h-5 mr-2" />
              Quick Post
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar Controls */}
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
          </div>
        </CardHeader>
      </Card>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-3 px-6">
        {weekDays.map((day, index) => (
          <div key={index} className={`text-center p-3 rounded-xl transition-all ${
            isToday(day) 
              ? 'bg-gradient-primary text-white shadow-glow' 
              : 'bg-gradient-subtle border hover:shadow-sm'
          }`}>
            <div className="text-xs font-medium opacity-90">
              {day.toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <div className="text-lg font-bold">
              {day.getDate()}
            </div>
          </div>
        ))}
      </div>

      {/* React Flow Calendar */}
      <Card className="card-elevated h-[600px]">
        <CardContent className="p-0 h-full">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeDragStop={handleNodeDragStop}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{
              padding: 0.1,
              includeHiddenNodes: false,
            }}
            style={{ backgroundColor: 'transparent' }}
            proOptions={{ hideAttribution: true }}
          >
            <Background color="#e2e8f0" gap={20} />
            <Controls />
            <MiniMap 
              style={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
              }}
            />
          </ReactFlow>
        </CardContent>
      </Card>

      <div className="bg-muted/30 rounded-lg p-4 text-sm text-muted-foreground">
        <p className="font-medium mb-2">How to use:</p>
        <ul className="space-y-1 text-xs">
          <li>• Drag posts between time slots to reschedule</li>
          <li>• Use the minimap to navigate quickly</li>
          <li>• Zoom and pan to focus on specific time periods</li>
          <li>• Right-click posts for quick actions</li>
        </ul>
      </div>
    </div>
  )
}