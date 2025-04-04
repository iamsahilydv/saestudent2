import React from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ProfileCardProps {
  student: {
    name: string;
    membershipId: string;
    college: string;
    branch: string;
    membershipStatus: string;
    membershipLevel: string;
    avatarUrl?: string;
    completedEvents: number;
    activeCompetitions: number;
    certifications: number;
  };
}

export default function ProfileCard({ student }: ProfileCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-primary via-primary/80 to-secondary" />
      <CardHeader className="relative pt-0 -mt-12 flex justify-center items-center">
        <Avatar className="h-24 w-24 border-4 border-background">
          <AvatarImage src={student.avatarUrl} alt={student.name} />
          <AvatarFallback className="text-xl font-semibold bg-accent text-accent-foreground">
            {getInitials(student.name)}
          </AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="text-center">
        <CardTitle className="text-xl mb-1">{student.name}</CardTitle>
        <CardDescription className="mb-4">
          {student.college} • {student.branch}
        </CardDescription>

        <div className="flex items-center justify-center gap-2 mb-4">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            {student.membershipLevel}
          </Badge>
          <Badge variant={student.membershipStatus === "Active" ? "default" : "secondary"}>
            {student.membershipStatus}
          </Badge>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>Membership ID: {student.membershipId}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center">
            <div className="font-semibold text-xl">{student.completedEvents}</div>
            <div className="text-xs text-muted-foreground">Events</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-xl">{student.activeCompetitions}</div>
            <div className="text-xs text-muted-foreground">Competitions</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-xl">{student.certifications}</div>
            <div className="text-xs text-muted-foreground">Certificates</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
