export interface Note {
  id: string
  title: string
  content: string
  status: string
  tags: string[]
  template: string
  parentId: string | null
  dueDate?: string
  checklist?: ChecklistItem[]
  timeTracking?: TimeTracking
  attachments?: Attachment[]
  links?: Link[]
}

export interface Column {
  id: string
  title: string
}

export interface Template {
  id: string
  name: string
  content: string
}

export interface ChecklistItem {
  id: string
  text: string
  completed: boolean
}

export interface TimeTracking {
  totalTime: number
  isRunning: boolean
  startTime?: number
}

export interface Attachment {
  id: string
  name: string
  url: string
  type: 'image' | 'file'
}

export interface Link {
  id: string
  url: string
  title: string
  description: string
  image: string
}
