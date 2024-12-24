import { useState } from 'react'
import { ChecklistItem } from '../types'
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface ChecklistProps {
  items: ChecklistItem[]
  onUpdate: (items: ChecklistItem[]) => void
}

export default function Checklist({ items, onUpdate }: ChecklistProps) {
  const [newItemText, setNewItemText] = useState('')

  const toggleItem = (id: string) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    )
    onUpdate(updatedItems)
  }

  const addItem = () => {
    if (newItemText.trim()) {
      const newItem: ChecklistItem = {
        id: Date.now().toString(),
        text: newItemText.trim(),
        completed: false
      }
      onUpdate([...items, newItem])
      setNewItemText('')
    }
  }

  const removeItem = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id)
    onUpdate(updatedItems)
  }

  return (
    <div className="space-y-2">
      {items.map(item => (
        <div key={item.id} className="flex items-center space-x-2">
          <Checkbox
            checked={item.completed}
            onCheckedChange={() => toggleItem(item.id)}
          />
          <span className={item.completed ? 'line-through' : ''}>{item.text}</span>
          <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)}>&times;</Button>
        </div>
      ))}
      <div className="flex space-x-2">
        <Input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="Add new item"
        />
        <Button onClick={addItem}>Add</Button>
      </div>
    </div>
  )
}
