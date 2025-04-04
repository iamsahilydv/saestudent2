"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import CompetitionDetail from "@/components/student/CompetitionDetail";

export default function CompetitionDetailsPage({ params }: { params: { id: string } }) {
  // Mock competition data - in a real app, fetch this based on the ID
  const competition = {
    id: parseInt(params.id),
    title: "BAJA SAE Design Phase 2025",
    description: "The BAJA SAE competition challenges engineering students to design, build, and race off-road vehicles. This phase focuses on the initial design and engineering documentation.",
    image: "/images/baja-sae.jpg",
    startDate: "Jan 15, 2025",
    endDate: "Apr 30, 2025",
    location: "Multiple Locations (Hybrid)",
    currentPhase: "Design Phase",
    progress: 65,
    teamName: "Team Invincible",
    phases: [
      {
        id: 1,
        title: "Registration Phase",
        description: "Team registration and payment of entry fees",
        startDate: "Jan 15, 2025",
        endDate: "Feb 10, 2025",
        status: "completed",
      },
      {
        id: 2,
        title: "Design Phase",
        description: "Conceptualization and technical design documentation",
        startDate: "Feb 11, 2025",
        endDate: "Apr 30, 2025",
        status: "current",
      },
      {
        id: 3,
        title: "Prototype Development",
        description: "Building and testing the vehicle prototype",
        startDate: "May 1, 2025",
        endDate: "Aug 15, 2025",
        status: "upcoming",
      },
      {
        id: 4,
        title: "Final Competition",
        description: "On-site evaluation and racing event",
        startDate: "Sep 10, 2025",
        endDate: "Sep 15, 2025",
        status: "upcoming",
      }
    ],
    teamMembers: [
      {
        id: 1,
        name: "Rahul Kumar",
        role: "Team Lead",
        avatar: "/images/avatar.png",
      },
      {
        id: 2,
        name: "Priya Sharma",
        role: "Suspension Designer",
        avatar: "/images/avatar.png",
      },
      {
        id: 3,
        name: "Aditya Singh",
        role: "Powertrain Engineer",
        avatar: "/images/avatar.png",
      },
      {
        id: 4,
        name: "Ananya Patel",
        role: "Electronics Lead",
        avatar: "/images/avatar.png",
      },
    ],
    submissions: [
      {
        id: 1,
        title: "Initial Design Concept",
        date: "February 25, 2025",
        status: "approved",
        downloadUrl: "#",
      },
      {
        id: 2,
        title: "CAD Models - Suspension System",
        date: "March 15, 2025",
        status: "approved",
        downloadUrl: "#",
      },
      {
        id: 3,
        title: "Technical Specifications Document",
        date: "April 1, 2025",
        status: "pending",
      },
      {
        id: 4,
        title: "Cost Report - Draft",
        date: "April 10, 2025",
        status: "draft",
      },
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/student">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-2xl font-bold tracking-tight">Competition Details</h2>
      </div>

      <CompetitionDetail competition={competition} />
    </div>
  );
}
