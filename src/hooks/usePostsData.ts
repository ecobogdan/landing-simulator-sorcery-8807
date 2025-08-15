import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from '@/hooks/use-toast'

// Mock data types
export interface Post {
  id: number
  title: string
  content: string
  platforms: string[]
  status: 'draft' | 'scheduled' | 'published' | 'failed'
  scheduledDate?: string
  scheduledTime?: string
  publishedDate?: string
  publishedTime?: string
  author: string
  lastEdited: string
  engagement?: {
    likes: number
    comments: number
    shares: number
    reach?: number
  }
  thumbnail?: string
}

// Mock API functions
const mockApi = {
  async getPosts(): Promise<Post[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return [
      {
        id: 1,
        title: "Product launch announcement",
        content: "🚀 Exciting news! We're launching our new product...",
        platforms: ['instagram', 'linkedin'],
        status: 'scheduled',
        scheduledDate: '2025-08-15',
        scheduledTime: '10:00',
        author: 'John Doe',
        lastEdited: '2025-01-10',
        engagement: { likes: 45, comments: 12, shares: 8, reach: 1240 }
      },
      {
        id: 2,
        title: "Behind the scenes content",
        content: "Take a peek behind the curtain! 👀",
        platforms: ['twitter', 'instagram'],
        status: 'published',
        publishedDate: '2025-08-15',
        publishedTime: '14:30',
        author: 'Jane Smith',
        lastEdited: '2025-01-12',
        engagement: { likes: 123, comments: 34, shares: 19, reach: 2100 }
      },
      {
        id: 3,
        title: "Weekly team update",
        content: "Here's what our amazing team has been working on...",
        platforms: ['linkedin'],
        status: 'draft',
        author: 'Mike Johnson',
        lastEdited: '2024-01-13',
      }
    ]
  },

  async createPost(postData: Partial<Post>): Promise<Post> {
    await new Promise(resolve => setTimeout(resolve, 800))
    
    return {
      id: Date.now(),
      title: postData.title || 'Untitled Post',
      content: postData.content || '',
      platforms: postData.platforms || [],
      status: 'draft',
      author: 'Current User',
      lastEdited: new Date().toISOString().split('T')[0],
      ...postData
    } as Post
  },

  async updatePost(id: number, updates: Partial<Post>): Promise<Post> {
    await new Promise(resolve => setTimeout(resolve, 600))
    
    // In real app, this would update the backend
    const posts = await this.getPosts()
    const post = posts.find(p => p.id === id)
    
    if (!post) throw new Error('Post not found')
    
    return {
      ...post,
      ...updates,
      lastEdited: new Date().toISOString().split('T')[0]
    }
  },

  async deletePost(id: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 400))
    // In real app, this would delete from backend
  },

  async schedulePost(id: number, scheduledDate: string, scheduledTime: string): Promise<Post> {
    return this.updatePost(id, {
      status: 'scheduled',
      scheduledDate,
      scheduledTime
    })
  }
}

// Custom hooks
export function usePosts(filters?: { status?: string; search?: string }) {
  return useQuery({
    queryKey: ['posts', filters],
    queryFn: async () => {
      const posts = await mockApi.getPosts()
      
      if (!filters) return posts
      
      return posts.filter(post => {
        const matchesStatus = !filters.status || filters.status === 'all' || post.status === filters.status
        const matchesSearch = !filters.search || 
          post.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          post.content.toLowerCase().includes(filters.search.toLowerCase())
        
        return matchesStatus && matchesSearch
      })
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useCreatePost() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: mockApi.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      toast({
        title: "Post created successfully",
        description: "Your post has been saved as a draft."
      })
    },
    onError: (error) => {
      toast({
        title: "Failed to create post",
        description: error.message,
        variant: "destructive"
      })
    }
  })
}

export function useUpdatePost() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<Post> }) => 
      mockApi.updatePost(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      toast({
        title: "Post updated successfully"
      })
    },
    onError: (error) => {
      toast({
        title: "Failed to update post",
        description: error.message,
        variant: "destructive"
      })
    }
  })
}

export function useDeletePost() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: mockApi.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      toast({
        title: "Post deleted successfully"
      })
    },
    onError: (error) => {
      toast({
        title: "Failed to delete post",
        description: error.message,
        variant: "destructive"
      })
    }
  })
}

export function useSchedulePost() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, scheduledDate, scheduledTime }: { 
      id: number
      scheduledDate: string
      scheduledTime: string 
    }) => mockApi.schedulePost(id, scheduledDate, scheduledTime),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      toast({
        title: "Post scheduled successfully"
      })
    },
    onError: (error) => {
      toast({
        title: "Failed to schedule post",
        description: error.message,
        variant: "destructive"
      })
    }
  })
}