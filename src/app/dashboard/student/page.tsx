import React from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { ArrowRight, Calendar, Clock, Download, FileText, Filter, Lightbulb, Search, Star, Trophy, User, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function StudentDashboardPage() {
  // Mock data for the student dashboard
  const enrolledEvents = [
    {
      id: 1,
      title: "BAJA SAE Design Phase",
      date: "April 15, 2025",
      time: "Submission Deadline: 11:59 PM",
      status: "In Progress",
      priority: "high",
      type: "competition",
      progress: 65,
      image: "/images/baja-sae.jpg",
    },
    {
      id: 2,
      title: "Drone Design Workshop",
      date: "April 10, 2025",
      time: "10:00 AM - 2:00 PM",
      status: "Upcoming",
      priority: "medium",
      type: "workshop",
      progress: 0,
      image: "/images/drone-workshop.jpg",
    },
  ];

  // Upcoming deadlines
  const upcomingDeadlines = [
    {
      id: 1,
      title: "BAJA SAE Technical Report",
      due: "April 15, 2025",
      type: "submission",
      daysLeft: 10,
    },
    {
      id: 2,
      title: "Drone Design Concept",
      due: "April 20, 2025",
      type: "submission",
      daysLeft: 15,
    },
    {
      id: 3,
      title: "Team Registration - Electric Vehicle Challenge",
      due: "May 5, 2025",
      type: "registration",
      daysLeft: 30,
    },
  ];

  // Student certificates and achievements
  const achievements = [
    {
      id: 1,
      title: "Electric Drivetrain Workshop",
      date: "January 15, 2025",
      type: "workshop",
      certificate: true,
    },
    {
      id: 2,
      title: "BAJA SAE 2024 Participation",
      date: "November 10, 2024",
      type: "competition",
      certificate: true,
    },
    {
      id: 3,
      title: "CAD Modeling Mastery",
      date: "February 5, 2025",
      type: "course",
      certificate: true,
    },
  ];

  // Recommended events based on student interests
  const recommendedEvents = [
    {
      id: 1,
      title: "Electric Vehicle Symposium",
      date: "May 5, 2025",
      category: "Conference",
      image: "/images/ev-symposium.jpg",
      matchPercent: 95,
    },
    {
      id: 2,
      title: "Bicycle Design Competition",
      date: "May 20, 2025",
      category: "Competition",
      image: "/images/bicycle-competition.jpg",
      matchPercent: 85,
    },
    {
      id: 3,
      title: "Advanced CFD Simulation Workshop",
      date: "April 22, 2025",
      category: "Workshop",
      image: "/images/cfd-workshop.jpg",
      matchPercent: 75,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Student Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Track your events, submissions, and achievements.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/dashboard/events">Browse Events</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/profile">My Profile</Link>
          </Button>
        </div>
      </div>

      {/* Student Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="sae-card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Enrollments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">1 Competition, 1 Workshop</p>
          </CardContent>
        </Card>
        <Card className="sae-card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Next: In 10 days</p>
          </CardContent>
        </Card>
        <Card className="sae-card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Certificates</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">View all certificates</p>
          </CardContent>
        </Card>
        <Card className="sae-card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">SAE Membership</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active</div>
            <p className="text-xs text-muted-foreground">Expires: Dec 31, 2025</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-7">
        <div className="col-span-7 md:col-span-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">My Enrollments</h3>
            <Link
              href="/dashboard/events"
              className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
            >
              View all
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-4">
            {enrolledEvents.map((event) => (
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
                        variant={event.status === "In Progress" ? "default" : "outline"}
                        className={event.priority === "high" ? "bg-accent text-accent-foreground" : ""}
                      >
                        {event.status}
                      </Badge>
                    </div>

                    {event.progress > 0 && (
                      <div className="mt-2 mb-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm text-muted-foreground">{event.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${event.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end mt-4">
                      <Button variant="outline" size="sm" className="mr-2">
                        Details
                      </Button>
                      {event.type === "competition" && (
                        <Button size="sm">Continue Work</Button>
                      )}
                      {event.type === "workshop" && (
                        <Button size="sm">Join Workshop</Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Recommended For You</h3>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {recommendedEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden sae-card-hover relative">
                    <div className="absolute top-2 right-2 z-10">
                      <Badge variant="outline" className="bg-accent/90 text-accent-foreground border-0">
                        {event.matchPercent}% match
                      </Badge>
                    </div>
                    <div className="relative aspect-video w-full">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{event.title}</CardTitle>
                      <CardDescription>{event.category}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{event.date}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm" variant="outline" className="w-full">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-7 md:col-span-3 space-y-6">
          <Card className="sae-card-hover">
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>Track your upcoming submissions and registrations</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className="flex items-start gap-4 border-b pb-4 last:border-0">
                    <div className={`rounded-full p-2 ${
                      deadline.daysLeft < 15
                        ? "bg-destructive/10 text-destructive"
                        : "bg-primary/10 text-primary"
                    }`}>
                      {deadline.type === "submission"
                        ? <FileText className="h-4 w-4" />
                        : <Calendar className="h-4 w-4" />
                      }
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {deadline.title}
                      </p>
                      <p className="text-sm text-muted-foreground">Due: {deadline.due}</p>
                      <p className={`text-sm font-medium ${
                        deadline.daysLeft < 15 ? "text-destructive" : "text-primary"
                      }`}>
                        {deadline.daysLeft} days remaining
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View All Deadlines
              </Button>
            </CardFooter>
          </Card>

          <Card className="sae-card-hover">
            <CardHeader>
              <CardTitle>Certificates & Achievements</CardTitle>
              <CardDescription>Your earned certificates and competition results</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-start gap-4 border-b pb-4 last:border-0">
                    <div className="rounded-full bg-accent/10 p-2 text-accent">
                      {achievement.type === "workshop" ? (
                        <Lightbulb className="h-4 w-4" />
                      ) : achievement.type === "competition" ? (
                        <Trophy className="h-4 w-4" />
                      ) : (
                        <Star className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium leading-none">
                          {achievement.title}
                        </p>
                        {achievement.certificate && (
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Download className="h-3 w-3" />
                            <span className="sr-only">Download Certificate</span>
                          </Button>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View All Certificates
              </Button>
            </CardFooter>
          </Card>

          <Card className="sae-card-hover bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">Membership Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium">SAE ID: 1234567</p>
                  <p className="text-sm text-muted-foreground">Membership Type: Student</p>
                </div>
                <Badge variant="outline" className="bg-accent/20 text-accent-foreground border-accent/30">
                  Active
                </Badge>
              </div>
              <Separator className="my-2" />
              <div className="mt-2">
                <p className="text-sm">Membership valid until: <span className="font-medium">December 31, 2025</span></p>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    View Membership Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
