"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Search, MapPin, Users, Star } from "lucide-react";

export default function WorkshopsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Workshop-specific data
  const workshops = [
    {
      id: 1,
      title: "Drone Design Workshop",
      date: "April 10, 2025",
      time: "10:00 AM - 2:00 PM",
      duration: "4 hours",
      status: "Registered",
      category: "Workshop",
      level: "Intermediate",
      location: "Chennai",
      instructor: "Dr. Rajesh Kumar",
      capacity: 30,
      enrolled: 18,
      rating: 4.8,
      price: "₹2,500",
      description:
        "Learn practical techniques for designing efficient drone structures and control systems. Hands-on CAD modeling session included with real-world case studies.",
      topics: [
        "CAD Modeling",
        "Flight Dynamics",
        "Control Systems",
        "Materials Selection",
      ],
      prerequisites: ["Basic CAD knowledge", "Understanding of physics"],
      image: "/api/placeholder/400/250",
    },
    {
      id: 2,
      title: "Advanced CFD Simulation Workshop",
      date: "April 22, 2025",
      time: "2:00 PM - 5:00 PM",
      duration: "3 hours",
      status: "Open",
      category: "Workshop",
      level: "Advanced",
      location: "Online",
      instructor: "Prof. Anita Sharma",
      capacity: 50,
      enrolled: 35,
      rating: 4.9,
      price: "₹3,000",
      description:
        "Master computational fluid dynamics techniques for automotive and aerospace applications using industry-standard software tools like ANSYS Fluent.",
      topics: [
        "ANSYS Fluent",
        "Mesh Generation",
        "Turbulence Modeling",
        "Post-processing",
      ],
      prerequisites: ["Fluid Mechanics knowledge", "Basic CFD concepts"],
      image: "/api/placeholder/400/250",
    },
    {
      id: 3,
      title: "Automotive Electronics Masterclass",
      date: "June 10, 2025",
      time: "10:00 AM - 4:00 PM",
      duration: "6 hours",
      status: "Coming Soon",
      category: "Masterclass",
      level: "Advanced",
      location: "Hyderabad",
      instructor: "Mr. Vikram Patel",
      capacity: 25,
      enrolled: 0,
      rating: 4.7,
      price: "₹4,500",
      description:
        "Comprehensive training on automotive electronics, control systems, and sensor integration for modern vehicles including hands-on lab work.",
      topics: [
        "ECU Programming",
        "CAN Bus",
        "Sensor Integration",
        "Vehicle Diagnostics",
      ],
      prerequisites: ["Electronics fundamentals", "Programming basics"],
      image: "/api/placeholder/400/250",
    },
    {
      id: 4,
      title: "3D Printing for Automotive Parts",
      date: "May 15, 2025",
      time: "9:00 AM - 1:00 PM",
      duration: "4 hours",
      status: "Open",
      category: "Workshop",
      level: "Beginner",
      location: "Pune",
      instructor: "Ms. Priya Nair",
      capacity: 20,
      enrolled: 12,
      rating: 4.6,
      price: "₹2,000",
      description:
        "Introduction to 3D printing technologies for rapid prototyping of automotive components. Learn design considerations and material selection.",
      topics: [
        "3D Design",
        "Print Technologies",
        "Material Properties",
        "Post-processing",
      ],
      prerequisites: ["Basic CAD knowledge"],
      image: "/api/placeholder/400/250",
    },
    {
      id: 5,
      title: "Engine Performance Tuning Workshop",
      date: "May 28, 2025",
      time: "10:00 AM - 3:00 PM",
      duration: "5 hours",
      status: "Open",
      category: "Workshop",
      level: "Intermediate",
      location: "Mumbai",
      instructor: "Er. Suresh Reddy",
      capacity: 15,
      enrolled: 8,
      rating: 4.9,
      price: "₹3,500",
      description:
        "Hands-on workshop on engine performance optimization, dyno testing, and tuning strategies for maximum power and efficiency.",
      topics: [
        "Dyno Testing",
        "Fuel Systems",
        "ECU Tuning",
        "Performance Metrics",
      ],
      prerequisites: ["Basic engine knowledge", "Automotive fundamentals"],
      image: "/api/placeholder/400/250",
    },
    {
      id: 6,
      title: "Hybrid Vehicle Technology Seminar",
      date: "April 18, 2025",
      time: "11:00 AM - 4:00 PM",
      duration: "5 hours",
      status: "Open",
      category: "Masterclass",
      level: "Advanced",
      location: "Online",
      instructor: "Dr. Meera Joshi",
      capacity: 100,
      enrolled: 67,
      rating: 4.8,
      price: "₹2,800",
      description:
        "Comprehensive overview of hybrid vehicle technologies, battery management systems, and energy optimization strategies.",
      topics: [
        "Battery Technology",
        "Power Electronics",
        "Energy Management",
        "System Integration",
      ],
      prerequisites: [
        "Electrical engineering background",
        "Automotive systems knowledge",
      ],
      image: "/api/placeholder/400/250",
    },
  ];

  const filteredWorkshops = workshops.filter(
    (workshop) =>
      workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workshop.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workshop.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workshop.topics.some((topic) =>
        topic.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Registered":
        return "default";
      case "Open":
        return "outline";
      case "Coming Soon":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">SAE Workshops</h1>
          <p className="text-lg text-gray-600 mt-2">
            Enhance your skills with hands-on workshops and masterclasses
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            My Schedule
          </Button>
          <Button>View Certificates</Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          type="search"
          placeholder="Search workshops, instructors, or topics..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Workshop tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="all">All Workshops</TabsTrigger>
          <TabsTrigger value="registered">My Registrations</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="online">Online</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredWorkshops.map((workshop) => (
              <Card
                key={workshop.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={workshop.image}
                    alt={workshop.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge
                    className="absolute top-3 right-3"
                    variant={getStatusColor(workshop.status)}
                  >
                    {workshop.status}
                  </Badge>
                  <div
                    className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(
                      workshop.level
                    )}`}
                  >
                    {workshop.level}
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg line-clamp-2">
                      {workshop.title}
                    </CardTitle>
                    <div className="flex items-center gap-1 text-sm text-yellow-600">
                      <Star className="h-3 w-3 fill-current" />
                      <span>{workshop.rating}</span>
                    </div>
                  </div>
                  <CardDescription className="text-sm">
                    by {workshop.instructor}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{workshop.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>
                      {workshop.time} ({workshop.duration})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{workshop.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>
                      {workshop.enrolled}/{workshop.capacity} enrolled
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {workshop.topics.slice(0, 2).map((topic, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {topic}
                      </Badge>
                    ))}
                    {workshop.topics.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{workshop.topics.length - 2} more
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2 mt-2">
                    {workshop.description}
                  </p>
                </CardContent>

                <CardFooter className="flex justify-between items-center pt-4">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-blue-600">
                      {workshop.price}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                    {workshop.status === "Registered" ? (
                      <Button size="sm" variant="secondary">
                        Registered
                      </Button>
                    ) : workshop.status === "Open" ? (
                      <Button size="sm">Register</Button>
                    ) : (
                      <Button size="sm" variant="outline" disabled>
                        Coming Soon
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="registered" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredWorkshops
              .filter((workshop) => workshop.status === "Registered")
              .map((workshop) => (
                <Card
                  key={workshop.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative">
                    <img
                      src={workshop.image}
                      alt={workshop.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-3 right-3" variant="default">
                      Registered
                    </Badge>
                    <div
                      className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(
                        workshop.level
                      )}`}
                    >
                      {workshop.level}
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{workshop.title}</CardTitle>
                    <CardDescription className="text-sm">
                      by {workshop.instructor}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{workshop.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{workshop.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{workshop.location}</span>
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button size="sm" variant="secondary">
                      Registered
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredWorkshops
              .filter((workshop) => workshop.status === "Open")
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((workshop) => (
                <Card
                  key={workshop.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative">
                    <img
                      src={workshop.image}
                      alt={workshop.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-3 right-3" variant="outline">
                      {workshop.status}
                    </Badge>
                    <div
                      className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(
                        workshop.level
                      )}`}
                    >
                      {workshop.level}
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{workshop.title}</CardTitle>
                    <CardDescription className="text-sm">
                      by {workshop.instructor}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{workshop.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{workshop.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{workshop.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>
                        {workshop.enrolled}/{workshop.capacity} enrolled
                      </span>
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-600">
                      {workshop.price}
                    </span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                      <Button size="sm">Register</Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="online" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredWorkshops
              .filter((workshop) => workshop.location === "Online")
              .map((workshop) => (
                <Card
                  key={workshop.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative">
                    <img
                      src={workshop.image}
                      alt={workshop.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge
                      className="absolute top-3 right-3"
                      variant={getStatusColor(workshop.status)}
                    >
                      {workshop.status}
                    </Badge>
                    <div
                      className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(
                        workshop.level
                      )}`}
                    >
                      {workshop.level}
                    </div>
                    <Badge className="absolute bottom-3 left-3 bg-blue-600 text-white">
                      Online
                    </Badge>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{workshop.title}</CardTitle>
                    <CardDescription className="text-sm">
                      by {workshop.instructor}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{workshop.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{workshop.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>
                        {workshop.enrolled}/{workshop.capacity} enrolled
                      </span>
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-600">
                      {workshop.price}
                    </span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                      {workshop.status === "Registered" ? (
                        <Button size="sm" variant="secondary">
                          Registered
                        </Button>
                      ) : workshop.status === "Open" ? (
                        <Button size="sm">Register</Button>
                      ) : (
                        <Button size="sm" variant="outline" disabled>
                          Coming Soon
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
