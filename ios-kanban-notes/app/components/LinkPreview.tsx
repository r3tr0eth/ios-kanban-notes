import { useState } from 'react'
import { Link } from '../types'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface LinkPreviewProps {
  links: Link[]
  onUpdate: (links: Link[]) => void
}

export default function LinkPreview({ links, onUpdate }: LinkPreviewProps) {
  const [newLinkUrl, setNewLinkUrl] = useState('')

  const addLink = async () => {
    if (newLinkUrl.trim()) {
      // In a real application, you would use a server-side API to fetch link metadata
      // For this example, we'll simulate it with a timeout
      const newLink: Link = {
        id: Date.now().toString(),
        url: newLinkUrl,
        title: 'Loading...',
        description: 'Fetching link details...',
        image: '/placeholder.svg'
      }
      onUpdate([...links, newLink])
      setNewLinkUrl('')

      // Simulate API call
      setTimeout(() => {
        const updatedLink: Link = {
          ...newLink,
          title: 'Example Website',
          description: 'This is a sample description for the linked website.',
          image: '/placeholder.svg'
        }
        onUpdate(links.map(link => link.id === newLink.id ? updatedLink : link))
      }, 2000)
    }
  }

  const removeLink = (id: string) => {
    const updatedLinks = links.filter(link => link.id !== id)
    onUpdate(updatedLinks)
  }

  return (
    <div className="space-y-4">
      {links.map(link => (
        <Card key={link.id}>
          <CardContent className="p-4 flex">
            <img src={link.image} alt={link.title} className="w-16 h-16 object-cover mr-4" />
            <div className="flex-grow">
              <h3 className="font-bold">{link.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{link.description}</p>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {link.url}
              </a>
            </div>
            <Button variant="ghost" size="sm" onClick={() => removeLink(link.id)}>&times;</Button>
          </CardContent>
        </Card>
      ))}
      <div className="flex space-x-2">
        <Input
          type="text"
          value={newLinkUrl}
          onChange={(e) => setNewLinkUrl(e.target.value)}
          placeholder="Enter URL to bookmark"
        />
        <Button onClick={addLink}>Add</Button>
      </div>
    </div>
  )
}
