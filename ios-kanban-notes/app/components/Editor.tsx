import { useState, useEffect } from 'react'
import { Note, Template, ChecklistItem, TimeTracking, Attachment, Link } from '../types'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Checklist from './Checklist'
import TimeTracker from './TimeTracker'
import Attachments from './Attachments'
import LinkPreview from './LinkPreview'

interface EditorProps {
  note: Note
  onUpdateNote: (note: Note) => void
  templates: Template[]
  allTags: string[]
}

export default function Editor({ note, onUpdateNote, templates, allTags }: EditorProps) {
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [status, setStatus] = useState(note.status)
  const [tags, setTags] = useState(note.tags)
  const [template, setTemplate] = useState(note.template)
  const [newTag, setNewTag] = useState('')
  const [dueDate, setDueDate] = useState(note.dueDate || '')
  const [checklist, setChecklist] = useState(note.checklist || [])
  const [timeTracking, setTimeTracking] = useState(note.timeTracking || { totalTime: 0, isRunning: false })
  const [attachments, setAttachments] = useState(note.attachments || [])
  const [links, setLinks] = useState(note.links || [])

  useEffect(() => {
    setTitle(note.title)
    setContent(note.content)
    setStatus(note.status)
    setTags(note.tags)
    setTemplate(note.template)
    setDueDate(note.dueDate || '')
    setChecklist(note.checklist || [])
    setTimeTracking(note.timeTracking || { totalTime: 0, isRunning: false })
    setAttachments(note.attachments || [])
    setLinks(note.links || [])
  }, [note])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    onUpdateNote({ ...note, title: e.target.value })
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
    onUpdateNote({ ...note, content: e.target.value })
  }

  const handleStatusChange = (value: string) => {
    setStatus(value)
    onUpdateNote({ ...note, status: value })
  }

  const handleTemplateChange = (value: string) => {
    setTemplate(value)
    const selectedTemplate = templates.find(t => t.id === value)
    if (selectedTemplate) {
      setContent(selectedTemplate.content)
      onUpdateNote({ ...note, template: value, content: selectedTemplate.content })
    }
  }

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      const updatedTags = [...tags, newTag]
      setTags(updatedTags)
      onUpdateNote({ ...note, tags: updatedTags })
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove)
    setTags(updatedTags)
    onUpdateNote({ ...note, tags: updatedTags })
  }

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value)
    onUpdateNote({ ...note, dueDate: e.target.value })
  }

  const handleChecklistUpdate = (updatedChecklist: ChecklistItem[]) => {
    setChecklist(updatedChecklist)
    onUpdateNote({ ...note, checklist: updatedChecklist })
  }

  const handleTimeTrackingUpdate = (updatedTimeTracking: TimeTracking) => {
    setTimeTracking(updatedTimeTracking)
    onUpdateNote({ ...note, timeTracking: updatedTimeTracking })
  }

  const handleAttachmentsUpdate = (updatedAttachments: Attachment[]) => {
    setAttachments(updatedAttachments)
    onUpdateNote({ ...note, attachments: updatedAttachments })
  }

  const handleLinksUpdate = (updatedLinks: Link[]) => {
    setLinks(updatedLinks)
    onUpdateNote({ ...note, links: updatedLinks })
  }

  return (
    <div className="p-4 h-full flex flex-col">
      <Input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Note title"
        className="text-2xl font-bold mb-4"
      />
      <div className="flex mb-4 space-x-2">
        <Select value={status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="to-do">To Do</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="done">Done</SelectItem>
          </SelectContent>
        </Select>
        <Select value={template} onValueChange={handleTemplateChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Template" />
          </SelectTrigger>
          <SelectContent>
            {templates.map(t => (
              <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="date"
          value={dueDate}
          onChange={handleDueDateChange}
          className="w-[180px]"
        />
      </div>
      <div className="mb-4">
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map(tag => (
            <Badge key={tag} variant="secondary" className="px-2 py-1">
              {tag}
              <button onClick={() => removeTag(tag)} className="ml-2 text-xs">&times;</button>
            </Badge>
          ))}
        </div>
        <div className="flex">
          <Input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add a tag"
            className="mr-2"
          />
          <Button onClick={addTag}>Add Tag</Button>
        </div>
      </div>
      <Tabs defaultValue="content" className="flex-grow flex flex-col">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="checklist">Checklist</TabsTrigger>
          <TabsTrigger value="time">Time Tracking</TabsTrigger>
          <TabsTrigger value="attachments">Attachments</TabsTrigger>
          <TabsTrigger value="links">Links</TabsTrigger>
        </TabsList>
        <TabsContent value="content" className="flex-grow">
          <Textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Start typing your note here..."
            className="h-full resize-none"
          />
        </TabsContent>
        <TabsContent value="checklist">
          <Checklist items={checklist} onUpdate={handleChecklistUpdate} />
        </TabsContent>
        <TabsContent value="time">
          <TimeTracker timeTracking={timeTracking} onUpdate={handleTimeTrackingUpdate} />
        </TabsContent>
        <TabsContent value="attachments">
          <Attachments attachments={attachments} onUpdate={handleAttachmentsUpdate} />
        </TabsContent>
        <TabsContent value="links">
          <LinkPreview links={links} onUpdate={handleLinksUpdate} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
