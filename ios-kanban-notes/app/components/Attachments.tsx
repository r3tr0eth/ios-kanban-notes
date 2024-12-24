import { useState } from 'react'
import { Attachment } from '../types'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AttachmentsProps {
  attachments: Attachment[]
  onUpdate: (attachments: Attachment[]) => void
}

export default function Attachments({ attachments, onUpdate }: AttachmentsProps) {
  const [newAttachmentUrl, setNewAttachmentUrl] = useState('')

  const addAttachment = () => {
    if (newAttachmentUrl.trim()) {
      const newAttachment: Attachment = {
        id: Date.now().toString(),
        name: new URL(newAttachmentUrl).pathname.split('/').pop() || 'Untitled',
        url: newAttachmentUrl,
        type: newAttachmentUrl.match(/\.(jpeg|jpg|gif|png)$/) ? 'image' : 'file'
      }
      onUpdate([...attachments, newAttachment])
      setNewAttachmentUrl('')
    }
  }

  const removeAttachment = (id: string) => {
    const updatedAttachments = attachments.filter(attachment => attachment.id !== id)
    onUpdate(updatedAttachments)
  }

  return (
    <div className="space-y-2">
      {attachments.map(attachment => (
        <div key={attachment.id} className="flex items-center space-x-2">
          {attachment.type === 'image' ? (
            <img src={attachment.url} alt={attachment.name} className="w-8 h-8 object-cover" />
          ) : (
            <div className="w-8 h-8 bg-gray-200 flex items-center justify-center">📎</div>
          )}
          <a href={attachment.url} target="_blank" rel="noopener noreferrer" className="flex-grow">
            {attachment.name}
          </a>
          <Button variant="ghost" size="sm" onClick={() => removeAttachment(attachment.id)}>&times;</Button>
        </div>
      ))}
      <div className="flex space-x-2">
        <Input
          type="text"
          value={newAttachmentUrl}
          onChange={(e) => setNewAttachmentUrl(e.target.value)}
          placeholder="Enter file or image URL"
        />
        <Button onClick={addAttachment}>Add</Button>
      </div>
    </div>
  )
}
