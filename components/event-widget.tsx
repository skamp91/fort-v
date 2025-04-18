"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CalendarDays, Clock, MapPin } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
}

export default function EventWidget() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getEvents = async () => {
      try {
        // In a real implementation, this would fetch from Contentful
        // const eventsData = await fetchEvents()
        // For demo purposes, we'll use mock data

        // Get current month and year for sample data
        const currentDate = new Date()
        const currentMonth = currentDate.getMonth() + 1 // JavaScript months are 0-indexed
        const currentYear = currentDate.getFullYear()
        const formattedCurrentMonth = currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`

        const mockEvents = [
          {
            id: "1",
            title: "Frühlingsfest",
            date: `${currentYear}-${formattedCurrentMonth}-15`, // Current month, day 15
            time: "14:00 - 18:00",
            location: "Vereinshaus",
            description: "Unser jährliches Frühlingsfest mit Pflanzentauschbörse und Kaffee & Kuchen.",
          },
          {
            id: "2",
            title: "Workshop: Biologisches Gärtnern",
            date: `${currentYear}-${formattedCurrentMonth}-20`, // Current month, day 20
            time: "16:00 - 18:00",
            location: "Gemeinschaftsgarten",
            description: "Lernen Sie die Grundlagen des biologischen Gärtnerns ohne chemische Pestizide.",
          },
          {
            id: "3",
            title: "Sommerfest",
            date: `${currentYear}-${formattedCurrentMonth}-25`, // Current month, day 25
            time: "15:00 - 22:00",
            location: "Festwiese",
            description: "Großes Sommerfest mit Grillen, Musik und Spielen für die ganze Familie.",
          },
        ]
        setEvents(mockEvents)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching events:", error)
        setLoading(false)
      }
    }

    getEvents()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Card key={event.id} className="flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle>{event.title}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4 text-green-600" />
              {formatDate(event.date)}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-600" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-green-600" />
                <span>{event.location}</span>
              </div>
              <p className="text-gray-500 mt-2">{event.description}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Link href={`/events/${event.id}`} className="w-full">
              <Button variant="outline" className="w-full">
                Details
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
