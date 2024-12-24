'use client'

import { useState } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import Sidebar from './components/Sidebar'
import Editor from './components/Editor'
import KanbanBoard from './components/KanbanBoard'
import Calendar from './components/Calendar'
import SearchBar from './components/SearchBar'
import { Note, Column, Template } from './types'

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', title: 'Welcome', content: 'Welcome to your new Notion-like app!', status: 'to-do', tags: ['welcome'], template: 'default', parentId: null },
  ])
  const [activeNoteId, setActiveNoteId] = useState<string | null>('1')
  const [view, setView] = useState<'editor' | 'kanban' | 'calendar'>('editor')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchFilters, setSearchFilters] = useState<{tags: string[], template: string | null}>({ tags: [], template: null })

  const columns: Column[] = [
    { id: 'to-do', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'done', title: 'Done' },
  ]

  const templates: Template[] = [
    { id: 'default', name: 'Default', content: '' },
    { id: 'meeting', name: 'Meeting Notes', content: '# Meeting Notes\n\n## Attendees\n\n## Agenda\n\n## Action Items\n' },
    { id: 'project', name: 'Project Plan', content: '# Project Plan\n\n## Objectives\n\n## Timeline\n\n## Resources\n' },
    { id: 'documentation', name: 'Documentation', content: '# Documentation\n\n## Overview\n\n## Usage\n\n## API Reference\n' },
  ]

  const addNote = (parentId: string | null = null, template: string = 'default') => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'New Note',
      content: templates.find(t => t.id === template)?.content || '',
      status: 'to-do',
      tags: [],
      template,
      parentId,
    }
    setNotes([...notes, newNote])
    setActiveNoteId(newNote.id)
    setView('editor')
  }

  const updateNote = (updatedNote: Note) => {
    setNotes(notes.map(note => note.id === updatedNote.id ? updatedNote : note))
  }

  const deleteNote = (id: string) => {
    const noteToDelete = notes.find(note => note.id === id)
    if (noteToDelete) {
      // Delete the note and all
