import { useState, useEffect } from 'react'
import { TimeTracking } from '../types'
import { Button } from "@/components/ui/button"

interface TimeTrackerProps {
  timeTracking: TimeTracking
  onUpdate: (timeTracking: TimeTracking) => void
}

export default function TimeTracker({ timeTracking, onUpdate }: TimeTrackerProps) {
  const [elapsedTime, setElapsedTime] = useState(timeTracking.totalTime)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timeTracking.isRunning) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1000)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timeTracking.isRunning])

  const toggleTimer = () => {
    if (timeTracking.isRunning) {
      onUpdate({
        ...timeTracking,
        isRunning: false,
        totalTime: elapsedTime
      })
    } else {
      onUpdate({
        ...timeTracking,
        isRunning: true,
        startTime: Date.now()
      })
    }
  }

  const resetTimer = () => {
    onUpdate({
      totalTime: 0,
      isRunning: false
    })
    setElapsedTime(0)
  }

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000) % 60
    const minutes = Math.floor(ms / (1000 * 60)) % 60
    const hours = Math.floor(ms / (1000 * 60 * 60))
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-2">
      <div className="text-2xl font-mono">{formatTime(elapsedTime)}</div>
      <div className="space-x-2">
        <Button onClick={toggleTimer}>
          {timeTracking.isRunning ? 'Stop' : 'Start'}
        </Button>
        <Button onClick={resetTimer} variant="outline">Reset</Button>
      </div>
    </div>
  )
}
