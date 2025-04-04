import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Filter, Search } from "lucide-react";

export default function EventsPage() {
  // All events mock data
  const allEvents = [
    {
      id: 1,
      title: "BAJA SAE Design Phase",
      date: "April 15, 2025",
      time: "Submission Deadline: 11:59 PM",
      status: "Registered",
      category: "Competition",
      phase: "Design",
      location: "Online",
      priority: "high",
      description: "Submit your preliminary design for the BAJA SAE off-road vehicle competition. This includes CAD models, technical specifications, and simulation results.",
      image: "/images/baja-sae.jpg",
    },
    {
      id: 2,
      title: "Drone Design Workshop",
      date: "April 10, 2025",
      time: "10:00 AM - 2:00 PM",
      status: "Registered",
      category: "Workshop",
      phase: "Learning",
      location: "Chennai",
      priority: "medium",
      description: "Learn practical techniques for designing efficient drone structures and control systems. Hands-on CAD modeling session included.",
      image: "/images/drone-workshop.jpg",
    },
    {
      id: 3,
      title: "Electric Vehicle Symposium",
      date: "May 5, 2025",
      time: "9:00 AM - 5:00 PM",
      status: "Open",
      category: "Conference",
      phase: "Registration",
      location: "Bengaluru",
      priority: "low",
      description: "Join industry experts and academic researchers for a day of discussions on the latest electric vehicle technologies and sustainable mobility solutions.",
      image: "/images/ev-symposium.jpg",
    },
    {
      id: 4,
      title: "Bicycle Design Competition",
      date: "May 20, 2025",
      time: "Registration Deadline: April 25, 2025",
      status: "Open",
      category: "Competition",
      phase: "Registration",
      location: "Hybrid",
      priority: "medium",
      description: "Design an innovative bicycle that addresses urban mobility challenges. Focus on sustainability, practicality, and cost-effectiveness.",
      image: "/images/bicycle-competition.jpg",
    },
    {
      id: 5,
      title: "Advanced CFD Simulation Workshop",
      date: "April 22, 2025",
      time: "2:00 PM - 5:00 PM",
      status: "Open",
      category: "Workshop",
      phase: "Registration",
      location: "Online",
      priority: "medium",
      description: "Master computational fluid dynamics techniques for automotive and aerospace applications using industry-standard software tools.",
      image: "/images/cfd-workshop.jpg",
    },
    {
      id: 6,
      title: "Automotive Electronics Masterclass",
      date: "June 10, 2025",
      time: "10:00 AM - 4:00 PM",
      status: "Coming Soon",
      category: "Masterclass",
      phase: "Announcement",
      location: "Hyderabad",
      priority: "low",
      description: "Comprehensive training on automotive electronics, control systems, and sensor integration for modern vehicles.",
      image: "/images/electronics-class.jpg",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Events</h2>
          <p className="text-muted-foreground">
            Browse and register for upcoming SAE events and competitions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Calendar View
          </Button>
          <Button>
            My Registrations
          </Button>
        </div>
      </div>

      {/* Search and filter */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="md:col-span-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search events by name, location, or category..."
              className="pl-8 w-full"
            />
          </div>
        </div>
        <div>
          <Button variant="outline" className="w-full">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Event tabs */}
      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-5 md:w-auto">
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="competitions">Competitions</TabsTrigger>
          <TabsTrigger value="workshops">Workshops</TabsTrigger>
          <TabsTrigger value="conferences">Conferences</TabsTrigger>
          <TabsTrigger value="registered">Registered</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden sae-card-hover">
                <div className="relative aspect-video w-full">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <Badge
                    className="absolute top-2 right-2"
                    variant={event.status === "Registered" ? "default" :
                           event.status === "Open" ? "outline" : "secondary"}
                  >
                    {event.status}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>{event.category}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{event.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                    {event.description}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/events/${event.id}`}>Details</Link>
                  </Button>
                  {event.status === "Registered" ? (
                    <Button size="sm" variant="secondary">
                      Registered
                    </Button>
                  ) : event.status === "Open" ? (
                    <Button size="sm">
                      Register
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" disabled>
                      Coming Soon
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="competitions" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allEvents
              .filter(event => event.category === "Competition")
              .map((event) => (
                <Card key={event.id} className="overflow-hidden sae-card-hover">
                  <div className="relative aspect-video w-full">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <Badge
                      className="absolute top-2 right-2"
                      variant={event.status === "Registered" ? "default" :
                             event.status === "Open" ? "outline" : "secondary"}
                    >
                      {event.status}
                    </Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription>{event.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{event.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                      {event.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/events/${event.id}`}>Details</Link>
                    </Button>
                    {event.status === "Registered" ? (
                      <Button size="sm" variant="secondary">
                        Registered
                      </Button>
                    ) : event.status === "Open" ? (
                      <Button size="sm">
                        Register
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" disabled>
                        Coming Soon
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        {/* You can implement the other tabs similarly */}
        <TabsContent value="workshops" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allEvents
              .filter(event => event.category === "Workshop" || event.category === "Masterclass")
              .map((event) => (
                <Card key={event.id} className="overflow-hidden sae-card-hover">
                  {/* Card contents similar to above */}
                  <div className="relative aspect-video w-full">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <Badge
                      className="absolute top-2 right-2"
                      variant={event.status === "Registered" ? "default" :
                             event.status === "Open" ? "outline" : "secondary"}
                    >
                      {event.status}
                    </Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription>{event.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{event.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                      {event.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/events/${event.id}`}>Details</Link>
                    </Button>
                    {event.status === "Registered" ? (
                      <Button size="sm" variant="secondary">
                        Registered
                      </Button>
                    ) : event.status === "Open" ? (
                      <Button size="sm">
                        Register
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" disabled>
                        Coming Soon
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="conferences" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allEvents
              .filter(event => event.category === "Conference")
              .map((event) => (
                <Card key={event.id} className="overflow-hidden sae-card-hover">
                  {/* Card contents similar to above */}
                  <div className="relative aspect-video w-full">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <Badge
                      className="absolute top-2 right-2"
                      variant={event.status === "Registered" ? "default" :
                             event.status === "Open" ? "outline" : "secondary"}
                    >
                      {event.status}
                    </Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription>{event.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{event.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                      {event.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/events/${event.id}`}>Details</Link>
                    </Button>
                    {event.status === "Registered" ? (
                      <Button size="sm" variant="secondary">
                        Registered
                      </Button>
                    ) : event.status === "Open" ? (
                      <Button size="sm">
                        Register
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" disabled>
                        Coming Soon
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="registered" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allEvents
              .filter(event => event.status === "Registered")
              .map((event) => (
                <Card key={event.id} className="overflow-hidden sae-card-hover">
                  {/* Card contents similar to above */}
                  <div className="relative aspect-video w-full">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <Badge
                      className="absolute top-2 right-2"
                      variant="default"
                    >
                      {event.status}
                    </Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription>{event.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{event.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                      {event.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/events/${event.id}`}>Details</Link>
                    </Button>
                    <Button size="sm" variant="secondary">
                      Registered
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
