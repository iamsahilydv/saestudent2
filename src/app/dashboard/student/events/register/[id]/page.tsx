"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import EventRegistration from "@/components/student/EventRegistration";

export default function EventRegistrationPage({
  params,
}: {
  params: { id: string };
}) {
  // Mock event data - in a real app, fetch this based on the ID
  const event = {
    id: parseInt(params.id),
    title: "Electric Vehicle Symposium 2025",
    image: "/images/ev-symposium.jpg",
    date: "May 5, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Bengaluru, India",
    registrationFee: 1500,
    registrationDeadline: "April 25, 2025",
    description:
      "Join industry experts and academic researchers for a day of discussions on the latest electric vehicle technologies and sustainable mobility solutions. This symposium brings together leading professionals from the automotive sector, researchers, and students to explore innovations in electric vehicle design, battery technology, charging infrastructure, and policy frameworks.",
    requirements: [
      "Valid SAE Membership ID",
      "College/University ID",
      "Basic understanding of automotive engineering concepts",
      "Registration fee payment",
    ],
    tags: [
      "Electric Vehicles",
      "Symposium",
      "Sustainable Mobility",
      "Networking",
      "Industry Experts",
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/events">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-2xl font-bold tracking-tight">
          Event Registration
        </h2>
      </div>

      <EventRegistration event={event} />
    </div>
  );
}
