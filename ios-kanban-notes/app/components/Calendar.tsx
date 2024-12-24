import { useState } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Note } from '../types'
import { Button } from "@/components/ui/button"

interface CalendarProps {
  notes: Note[]
  onSelectDate: (date: Date) => void
}

export default function Calendar({ notes, onSelectDate }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(monthStart)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const prevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Button onClick={prevMonth} variant="outline" size="icon">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-bold">{format(currentMonth, 'MMMM yyyy')}</h2>
        <Button onClick={nextMonth} variant="outline" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-bold">{day}</div>
        ))}
        {monthDays.map(day => {
          const notesForDay = notes.filter(note => note.dueDate && isSameDay(new Date(note.dueDate), day))
          return (
            <Button
              key={day.toString()}
              onClick={() => onSelectDate(day)}
              variant={isSameMonth(day, currentMonth) ? 'outline' : 'ghost'}
              className={`h-20 ${notesForDay.length > 0 ? 'bg-blue-100 dark:bg-blue-900' : ''}`}
            >
              <div className="flex flex-col items-center">
                <span>{format(day, 'd')}</span>
                {notesForDay.length > 0 && (
                  <span className="text-xs mt-1">{notesForDay.length} note(s)</span>
                )}
              </div>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
