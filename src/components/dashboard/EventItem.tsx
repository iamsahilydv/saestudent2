import React from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface EventItemProps {
  event: {
    id: number;
    title: string;
    date: string;
    time: string;
    location?: string;
    status: "Registered" | "Open" | "Closed" | "Coming Soon";
    priority?: "high" | "medium" | "low";
    type: "competition" | "workshop" | "conference" | "event";
    image: string;
    deadline?: string;
  };
}

export default function EventItem({ event }: EventItemProps) {
  const getStatusColor = (status: string, priority?: string) => {
    if (status === "Registered") return "default";
    if (status === "Open") {
      if (priority === "high") return "accent";
      return "outline";
    }
    if (status === "Closed") return "secondary";
    return "secondary";
  };

  const getActionButton = (eventType: string, status: string) => {
    if (status === "Registered") {
      if (eventType === "competition") {
        return <Button size="sm">Continue Work</Button>;
      }
      return <Button size="sm">View Details</Button>;
    }

    if (status === "Open") {
      if (eventType === "competition") {
        return <Button size="sm">Register Team</Button>;
      }
      return <Button size="sm">Register</Button>;
    }

    if (status === "Coming Soon") {
      return <Button size="sm" variant="outline" disabled>Coming Soon</Button>;
    }

    return <Button size="sm" variant="outline" disabled>Closed</Button>;
  };

  return (
    <Card className="overflow-hidden sae-card-hover">
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full h-48 sm:w-1/3 sm:h-auto">
          <Image
            src={event.image}
            alt={event.title}
            fill
            style={{ objectFit: "cover" }}
          />
          <Badge
            className="absolute top-2 right-2"
            variant={getStatusColor(event.status, event.priority)}
          >
            {event.status}
          </Badge>
        </div>
        <div className="flex-1 p-4">
          <CardContent className="p-0 pb-4">
            <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{event.time}</span>
              </div>
              {event.location && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              )}
              {event.deadline && (
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <Clock className="h-4 w-4" />
                  <span>Deadline: {event.deadline}</span>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="p-0 pt-2 flex gap-2 justify-end">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/events/${event.id}`}>Details</Link>
            </Button>
            {getActionButton(event.type, event.status)}
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
