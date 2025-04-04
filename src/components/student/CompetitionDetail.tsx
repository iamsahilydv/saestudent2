"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  FileText,
  MapPin,
  Users,
  CheckCircle2,
  CircleDashed,
  ArrowUpFromLine,
  MessageCircle,
  Lightbulb
} from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

interface Submission {
  id: number;
  title: string;
  date: string;
  status: "pending" | "approved" | "rejected" | "draft";
  downloadUrl?: string;
}

interface Phase {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "completed" | "current" | "upcoming";
}

interface CompetitionDetailProps {
  competition: {
    id: number;
    title: string;
    description: string;
    image: string;
    startDate: string;
    endDate: string;
    location: string;
    currentPhase: string;
    progress: number;
    teamName: string;
    phases: Phase[];
    teamMembers: TeamMember[];
    submissions: Submission[];
  };
}

export default function CompetitionDetail({ competition }: CompetitionDetailProps) {
  return (
    <div className="space-y-6">
      <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
        <Image
          src={competition.image}
          alt={competition.title}
          fill
          style={{ objectFit: "cover" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{competition.title}</h1>
          <div className="flex flex-wrap gap-3 items-center">
            <Badge variant="secondary" className="bg-primary/80 text-white border-0">{competition.currentPhase}</Badge>
            <div className="flex items-center gap-1 text-sm">
              <Calendar className="h-4 w-4" />
              <span>{competition.startDate} - {competition.endDate}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <MapPin className="h-4 w-4" />
              <span>{competition.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column - Team and Progress */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Information</CardTitle>
              <CardDescription>
                {competition.teamName}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Team Members</h3>
                <div className="space-y-3">
                  {competition.teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src={member.avatar}
                          alt={member.name}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="text-sm font-medium mb-2">Progress</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{competition.currentPhase}</span>
                    <span className="text-sm font-medium">{competition.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${competition.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href={`/dashboard/student/team/${competition.id}`}>
                  Team Dashboard
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
              <CardDescription>
                Reach out to your mentors or event coordinators
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/student/support">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contact Support
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/resources">
                  <Lightbulb className="mr-2 h-4 w-4" />
                  View Resources
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Tabs */}
        <div className="md:col-span-2">
          <Tabs defaultValue="phases">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="phases">Phases & Deadlines</TabsTrigger>
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
              <TabsTrigger value="rules">Rules & Guidelines</TabsTrigger>
            </TabsList>

            {/* Phases Tab */}
            <TabsContent value="phases" className="space-y-4 mt-6">
              <div className="space-y-6">
                {competition.phases.map((phase) => (
                  <div key={phase.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {phase.status === "completed" ? (
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                        ) : phase.status === "current" ? (
                          <CircleDashed className="h-5 w-5 text-accent mt-0.5" />
                        ) : (
                          <CircleDashed className="h-5 w-5 text-muted-foreground mt-0.5" />
                        )}
                        <div>
                          <h3 className={`text-lg font-medium ${
                            phase.status === "completed" ? "text-muted-foreground" :
                            phase.status === "current" ? "text-primary" : ""
                          }`}>{phase.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{phase.description}</p>
                          <div className="flex items-center gap-3 mt-3">
                            <div className="flex items-center gap-1 text-xs">
                              <Calendar className="h-3 w-3" />
                              <span>{phase.startDate} - {phase.endDate}</span>
                            </div>
                            <Badge variant={
                              phase.status === "completed" ? "outline" :
                              phase.status === "current" ? "default" : "secondary"
                            }>
                              {phase.status === "completed" ? "Completed" :
                               phase.status === "current" ? "Current" : "Upcoming"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Submissions Tab */}
            <TabsContent value="submissions" className="space-y-4 mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Your Submissions</h3>
                <Button>
                  <ArrowUpFromLine className="h-4 w-4 mr-2" />
                  New Submission
                </Button>
              </div>

              <div className="space-y-4">
                {competition.submissions.map((submission) => (
                  <Card key={submission.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium">{submission.title}</h4>
                            <p className="text-sm text-muted-foreground">{submission.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {submission.downloadUrl && (
                            <Button variant="outline" size="sm" asChild>
                              <Link href={submission.downloadUrl}>
                                Download
                              </Link>
                            </Button>
                          )}
                          <Badge variant={
                            submission.status === "approved" ? "default" :
                            submission.status === "rejected" ? "destructive" :
                            submission.status === "draft" ? "outline" : "secondary"
                          }>
                            {submission.status === "approved" ? "Approved" :
                             submission.status === "rejected" ? "Rejected" :
                             submission.status === "draft" ? "Draft" : "Pending Review"}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Rules Tab */}
            <TabsContent value="rules" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Competition Rules & Guidelines</CardTitle>
                  <CardDescription>
                    Please review all rules carefully before participating
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Eligibility</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>All team members must be currently enrolled students at a recognized educational institution.</li>
                      <li>Each participant must have a valid SAE membership.</li>
                      <li>Teams must consist of 3-10 members.</li>
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-2">Submission Requirements</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>All submissions must be in PDF format, not exceeding 20MB.</li>
                      <li>Technical reports must follow the provided template.</li>
                      <li>CAD models should be submitted in both native and STEP formats.</li>
                      <li>All submissions are final. No modifications will be accepted after the deadline.</li>
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-2">Judging Criteria</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Technical innovation and creativity (30%)</li>
                      <li>Engineering design and analysis (25%)</li>
                      <li>Manufacturability and cost effectiveness (20%)</li>
                      <li>Sustainability and environmental considerations (15%)</li>
                      <li>Presentation and documentation quality (10%)</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Download Complete Rulebook
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
