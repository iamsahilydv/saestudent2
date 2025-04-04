import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, Users, FileCheck, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface CompetitionCardProps {
  competition: {
    id: number;
    title: string;
    phase: string;
    deadline: string;
    team: string;
    teamMembers?: number;
    progress: number;
    nextMilestone?: string;
    image: string;
    tasksCompleted?: number;
    totalTasks?: number;
  };
}

export default function CompetitionCard({ competition }: CompetitionCardProps) {
  const getProgressColor = (progress: number) => {
    if (progress < 25) return "bg-red-500";
    if (progress < 50) return "bg-orange-500";
    if (progress < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <Card className="overflow-hidden sae-card-hover">
      <div className="relative w-full aspect-video">
        <Image
          src={competition.image}
          alt={competition.title}
          fill
          style={{ objectFit: "cover" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="text-lg font-bold">{competition.title}</h3>
          <div className="flex items-center gap-1 text-xs opacity-90">
            <Users className="h-3 w-3" />
            <span>{competition.team}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="grid gap-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-1">
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  {competition.phase}
                </Badge>
              </div>
              <span className="text-sm text-muted-foreground">{competition.progress}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full ${getProgressColor(competition.progress)}`}
                style={{ width: `${competition.progress}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Deadline:</span>
            </div>
            <div className="font-medium">{competition.deadline}</div>

            {competition.nextMilestone && (
              <>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Next milestone:</span>
                </div>
                <div className="font-medium">{competition.nextMilestone}</div>
              </>
            )}

            {competition.tasksCompleted !== undefined && competition.totalTasks !== undefined && (
              <>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <FileCheck className="h-4 w-4" />
                  <span>Tasks completed:</span>
                </div>
                <div className="font-medium">
                  {competition.tasksCompleted} / {competition.totalTasks}
                </div>
              </>
            )}

            {competition.teamMembers && (
              <>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Team members:</span>
                </div>
                <div className="font-medium">{competition.teamMembers}</div>
              </>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-4 pb-4 flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/dashboard/competitions/${competition.id}/team`}>
            Team Dashboard
          </Link>
        </Button>
        <Button size="sm" asChild>
          <Link href={`/dashboard/competitions/${competition.id}`}>
            <span>Continue Work</span>
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
