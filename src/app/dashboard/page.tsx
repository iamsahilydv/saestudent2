import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Calendar, Clock, Star, Trophy, User, Users, Clock3, FileText } from "lucide-react";

export default function DashboardPage() {
  // Upcoming events mock data
  const upcomingEvents = [
    {
      id: 1,
      title: "BAJA SAE Design Phase",
      date: "April 15, 2025",
      time: "Submission Deadline: 11:59 PM",
      status: "Registered",
      priority: "high",
      type: "competition",
      image: "/images/baja-sae.jpg",
    },
    {
      id: 2,
      title: "Drone Design Workshop",
      date: "April 10, 2025",
      time: "10:00 AM - 2:00 PM",
      status: "Registered",
      priority: "medium",
      type: "workshop",
      image: "/images/drone-workshop.jpg",
    },
    {
      id: 3,
      title: "Electric Vehicle Symposium",
      date: "May 5, 2025",
      time: "9:00 AM - 5:00 PM",
      status: "Open",
      priority: "low",
      type: "event",
      image: "/images/ev-symposium.jpg",
    },
  ];

  // My competitions mock data
  const myCompetitions = [
    {
      id: 1,
      title: "BAJA SAE India 2025",
      progress: 40,
      phase: "Design Phase",
      team: "Team Invincible",
      deadline: "April 15, 2025",
      image: "/images/baja-sae.jpg",
    },
    {
      id: 2,
      title: "Drone Design Challenge",
      progress: 25,
      phase: "Concept Submission",
      team: "Aero Innovators",
      deadline: "May 10, 2025",
      image: "/images/drone-competition.jpg",
    },
  ];

  // Recent activities mock data
  const recentActivities = [
    {
      id: 1,
      action: "Registered for",
      target: "Electric Vehicle Symposium",
      time: "2 hours ago",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      id: 2,
      action: "Submitted",
      target: "BAJA SAE Preliminary Design",
      time: "1 day ago",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      id: 3,
      action: "Completed",
      target: "Electric Drivetrain Workshop",
      time: "3 days ago",
      icon: <Trophy className="h-4 w-4" />,
    },
    {
      id: 4,
      action: "Joined team",
      target: "Aero Innovators",
      time: "1 week ago",
      icon: <Users className="h-4 w-4" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your SAE activities.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/dashboard/events">View All Events</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/competitions">My Competitions</Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="sae-card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Competitions</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>
        <Card className="sae-card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Upcoming Workshops</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Next: April 10, 2025</p>
          </CardContent>
        </Card>
        <Card className="sae-card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Across 2 teams</p>
          </CardContent>
        </Card>
        <Card className="sae-card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Certificates</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Earned this year</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-4 md:grid-cols-7">
        <div className="col-span-7 md:col-span-4">
          <Tabs defaultValue="upcoming">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="competitions">My Competitions</TabsTrigger>
              </TabsList>
              <Link
                href="/dashboard/events"
                className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
              >
                View all
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <TabsContent value="upcoming" className="space-y-4 mt-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden sae-card-hover">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full h-48 md:w-1/3 md:h-auto">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                            <Clock className="h-4 w-4" />
                            <span>{event.time}</span>
                          </div>
                        </div>
                        <Badge
                          variant={event.status === "Registered" ? "default" : "outline"}
                          className={event.priority === "high" ? "bg-accent text-accent-foreground" : ""}
                        >
                          {event.status}
                        </Badge>
                      </div>
                      <div className="flex justify-end mt-4">
                        <Button variant="outline" size="sm" className="mr-2">
                          Details
                        </Button>
                        {event.type === "competition" && (
                          <Button size="sm">Submit Work</Button>
                        )}
                        {event.type === "workshop" && (
                          <Button size="sm">Join Workshop</Button>
                        )}
                        {event.type === "event" && (
                          <Button size="sm">Register</Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="competitions" className="space-y-4 mt-6">
              {myCompetitions.map((competition) => (
                <Card key={competition.id} className="overflow-hidden sae-card-hover">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full h-48 md:w-1/3 md:h-auto">
                      <Image
                        src={competition.image}
                        alt={competition.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div>
                        <h3 className="text-lg font-semibold">{competition.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1 mb-2">
                          <Users className="h-4 w-4" />
                          <span>Team: {competition.team}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Clock3 className="h-4 w-4" />
                          <span>Deadline: {competition.deadline}</span>
                        </div>
                        <div className="mt-2 mb-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">{competition.phase}</span>
                            <span className="text-sm text-muted-foreground">{competition.progress}%</span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{ width: `${competition.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end mt-4">
                        <Button variant="outline" size="sm" className="mr-2">
                          Team Dashboard
                        </Button>
                        <Button size="sm">Continue Work</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
        <div className="col-span-7 md:col-span-3">
          <Card className="h-full sae-card-hover">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest SAE activities and updates</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 border-b pb-4 last:border-0">
                    <div className="rounded-full bg-primary/10 p-2">
                      {activity.icon}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {activity.action}{" "}
                        <span className="font-bold">{activity.target}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View All Activity
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Additional section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Recommended Resources</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="sae-card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-md">Electric Drivetrain Design</CardTitle>
              <CardDescription>Technical Workshop</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-muted-foreground">
                Learn the fundamentals of designing efficient electric drivetrains for automotive applications.
              </p>
            </CardContent>
            <CardFooter className="pt-2">
              <Button variant="outline" size="sm" className="w-full">View Resource</Button>
            </CardFooter>
          </Card>
          <Card className="sae-card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-md">CAD Modeling Advanced Techniques</CardTitle>
              <CardDescription>Video Tutorial Series</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-muted-foreground">
                Master advanced CAD modeling techniques for complex automotive components.
              </p>
            </CardContent>
            <CardFooter className="pt-2">
              <Button variant="outline" size="sm" className="w-full">View Resource</Button>
            </CardFooter>
          </Card>
          <Card className="sae-card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-md">Project Management for Engineering Teams</CardTitle>
              <CardDescription>Skill Development</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-muted-foreground">
                Effective project management strategies for engineering competition teams.
              </p>
            </CardContent>
            <CardFooter className="pt-2">
              <Button variant="outline" size="sm" className="w-full">View Resource</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
