"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Ruler, Trees } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Garden {
  id: string
  number: string
  size: string
  features: string[]
  available: boolean
  image: string
  description: string
}

export default function GardensPage() {
  const [gardens, setGardens] = useState<Garden[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sizeFilter, setSizeFilter] = useState("all")

  useEffect(() => {
    const getGardens = async () => {
      try {
        // In a real implementation, this would fetch from Contentful
        // const gardensData = await fetchGardens()
        // For demo purposes, we'll use mock data
        const mockGardens = [
          {
            id: "1",
            number: "A-15",
            size: "250 m²",
            features: ["Laube", "Wasseranschluss", "Obstbäume"],
            available: true,
            image: "/placeholder.svg?height=200&width=300",
            description:
              "Schöner Garten mit altem Baumbestand und einer gut erhaltenen Laube. Der Garten verfügt über einen eigenen Wasseranschluss und ist teilweise mit Obstbäumen bepflanzt.",
          },
          {
            id: "2",
            number: "B-07",
            size: "300 m²",
            features: ["Gartenhaus", "Stromanschluss", "Gewächshaus"],
            available: true,
            image: "/placeholder.svg?height=200&width=300",
            description:
              "Großzügiger Garten mit solidem Gartenhaus (20m²), Stromanschluss und einem kleinen Gewächshaus. Ideal für ambitionierte Hobbygärtner.",
          },
          {
            id: "3",
            number: "C-22",
            size: "280 m²",
            features: ["Laube", "Wasseranschluss", "Beerensträucher"],
            available: true,
            image: "/placeholder.svg?height=200&width=300",
            description:
              "Gepflegter Garten mit vielen Beerensträuchern und einer einfachen Laube. Der Garten hat einen eigenen Wasseranschluss und bietet viel Potenzial für Gestaltung.",
          },
          {
            id: "4",
            number: "D-05",
            size: "320 m²",
            features: ["Gartenhaus", "Stromanschluss", "Wasseranschluss", "Teich"],
            available: true,
            image: "/placeholder.svg?height=200&width=300",
            description:
              "Besonders schöner Garten mit einem kleinen Teich, Gartenhaus mit Strom- und Wasseranschluss. Der Garten ist teilweise mit Zierpflanzen gestaltet.",
          },
          {
            id: "5",
            number: "E-11",
            size: "200 m²",
            features: ["Laube", "Wasseranschluss"],
            available: true,
            image: "/placeholder.svg?height=200&width=300",
            description:
              "Kleiner, überschaubarer Garten mit einfacher Laube und Wasseranschluss. Ideal für Einsteiger oder Personen mit wenig Zeit.",
          },
        ]
        setGardens(mockGardens)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching gardens:", error)
        setLoading(false)
      }
    }

    getGardens()
  }, [])

  const getSizeInSquareMeters = (sizeString: string) => {
    return Number.parseInt(sizeString.replace(/\D/g, ""))
  }

  const filteredGardens = gardens.filter((garden) => {
    const matchesSearch =
      garden.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      garden.features.some((feature) => feature.toLowerCase().includes(searchTerm.toLowerCase())) ||
      garden.description.toLowerCase().includes(searchTerm.toLowerCase())

    let matchesSize = true
    if (sizeFilter === "small") {
      matchesSize = getSizeInSquareMeters(garden.size) < 250
    } else if (sizeFilter === "medium") {
      const size = getSizeInSquareMeters(garden.size)
      matchesSize = size >= 250 && size < 300
    } else if (sizeFilter === "large") {
      matchesSize = getSizeInSquareMeters(garden.size) >= 300
    }

    return garden.available && matchesSearch && matchesSize
  })

  if (loading) {
    return (
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-600">Freie Gärten</h1>
        <p className="mt-4 text-gray-500 md:text-xl">
          Entdecken Sie unsere verfügbaren Gärten und finden Sie Ihren grünen Rückzugsort.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="w-full md:w-2/3">
          <Label htmlFor="search" className="sr-only">
            Suche
          </Label>
          <Input
            id="search"
            placeholder="Suche nach Gartennummer oder Ausstattung..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/3">
          <Select value={sizeFilter} onValueChange={setSizeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Gartengröße" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Größen</SelectItem>
              <SelectItem value="small">Klein (unter 250m²)</SelectItem>
              <SelectItem value="medium">Mittel (250-300m²)</SelectItem>
              <SelectItem value="large">Groß (über 300m²)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredGardens.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredGardens.map((garden) => (
            <Card key={garden.id} className="overflow-hidden flex flex-col">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={garden.image || "/placeholder.svg"}
                  alt={`Garten ${garden.number}`}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Garten {garden.number}</CardTitle>
                  <Badge className="bg-green-600">Verfügbar</Badge>
                </div>
                <CardDescription className="flex items-center gap-1">
                  <Ruler className="h-4 w-4 text-green-600" />
                  {garden.size}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2 mb-4">
                  {garden.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      <Trees className="h-3 w-3" />
                      {feature}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-gray-500 line-clamp-3">{garden.description}</p>
              </CardContent>
              <CardFooter>
                <Link href={`/gardens/${garden.id}`} className="w-full">
                  <Button variant="outline" className="w-full flex items-center justify-between">
                    <span>Details ansehen</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Keine Gärten gefunden, die Ihren Suchkriterien entsprechen.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchTerm("")
              setSizeFilter("all")
            }}
          >
            Suche zurücksetzen
          </Button>
        </div>
      )}

      <div className="mt-12 bg-green-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-green-600 mb-4">Interesse an einem Garten?</h2>
        <p className="mb-4">
          Wenn Sie Interesse an einem unserer Gärten haben, kontaktieren Sie uns bitte über unser Kontaktformular oder
          besuchen Sie uns während der Öffnungszeiten im Vereinsbüro.
        </p>
        <Link href="/contact">
          <Button className="bg-green-600 hover:bg-green-700">Kontakt aufnehmen</Button>
        </Link>
      </div>
    </div>
  )
}
