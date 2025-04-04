"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  UserPlus,
  Send,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Trophy,
  Calendar,
  AlertCircle
} from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "pending" | "left";
  avatar: string;
  joinedDate: string;
}

interface TeamInvite {
  id: number;
  name: string;
  email: string;
  role: string;
  sentDate: string;
  status: "pending" | "accepted" | "declined" | "expired";
}

interface Team {
  id: number;
  name: string;
  competition: string;
  description: string;
  createdDate: string;
  members: TeamMember[];
  invites: TeamInvite[];
  isLeader: boolean;
}

export default function TeamManagementPage() {
  // Mock team data
  const [teams, setTeams] = useState<Team[]>([
    {
      id: 1,
      name: "Team Invincible",
      competition: "BAJA SAE 2025",
      description: "Designing and building an off-road vehicle for the BAJA SAE competition with focus on sustainability and performance.",
      createdDate: "January 15, 2025",
      isLeader: true,
      members: [
        {
          id: 1,
          name: "Rahul Kumar",
          email: "rahul.kumar@example.com",
          role: "Team Lead",
          status: "active",
          avatar: "/images/avatar.png",
          joinedDate: "January 15, 2025"
        },
        {
          id: 2,
          name: "Priya Sharma",
          email: "priya.sharma@example.com",
          role: "Suspension Designer",
          status: "active",
          avatar: "/images/avatar.png",
          joinedDate: "January 20, 2025"
        },
        {
          id: 3,
          name: "Aditya Singh",
          email: "aditya.singh@example.com",
          role: "Powertrain Engineer",
          status: "active",
          avatar: "/images/avatar.png",
          joinedDate: "January 22, 2025"
        },
      ],
      invites: [
        {
          id: 1,
          name: "Vikram Mehta",
          email: "vikram.mehta@example.com",
          role: "Electronics Engineer",
          sentDate: "April 1, 2025",
          status: "pending"
        }
      ]
    },
    {
      id: 2,
      name: "Aero Innovators",
      competition: "Drone Design Challenge 2025",
      description: "Creating an autonomous drone for agricultural monitoring and surveillance applications.",
      createdDate: "February 10, 2025",
      isLeader: false,
      members: [
        {
          id: 4,
          name: "Neha Reddy",
          email: "neha.reddy@example.com",
          role: "Team Lead",
          status: "active",
          avatar: "/images/avatar.png",
          joinedDate: "February 10, 2025"
        },
        {
          id: 1,
          name: "Rahul Kumar",
          email: "rahul.kumar@example.com",
          role: "Controls Engineer",
          status: "active",
          avatar: "/images/avatar.png",
          joinedDate: "February 12, 2025"
        },
        {
          id: 5,
          name: "Suraj Patel",
          email: "suraj.patel@example.com",
          role: "Aerodynamics Specialist",
          status: "active",
          avatar: "/images/avatar.png",
          joinedDate: "February 15, 2025"
        },
      ],
      invites: []
    }
  ]);

  const [selectedTeam, setSelectedTeam] = useState<Team | null>(teams[0]);
  const [newInvite, setNewInvite] = useState({
    name: "",
    email: "",
    role: ""
  });
  const [editingMember, setEditingMember] = useState<{
    id: number,
    role: string
  } | null>(null);

  const handleInviteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewInvite(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendInvite = () => {
    if (!selectedTeam) return;

    // Validate form
    if (!newInvite.email || !newInvite.name || !newInvite.role) {
      // Show error notification
      return;
    }

    // Create new invite
    const invite: TeamInvite = {
      id: Date.now(),
      name: newInvite.name,
      email: newInvite.email,
      role: newInvite.role,
      sentDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: "pending"
    };

    // Update teams state
    setTeams(teams.map(team => {
      if (team.id === selectedTeam.id) {
        return {
          ...team,
          invites: [...team.invites, invite]
        };
      }
      return team;
    }));

    // Update selected team
    setSelectedTeam({
      ...selectedTeam,
      invites: [...selectedTeam.invites, invite]
    });

    // Reset form
    setNewInvite({
      name: "",
      email: "",
      role: ""
    });
  };

  const handleCancelInvite = (inviteId: number) => {
    if (!selectedTeam) return;

    // Update teams state
    setTeams(teams.map(team => {
      if (team.id === selectedTeam.id) {
        return {
          ...team,
          invites: team.invites.filter(invite => invite.id !== inviteId)
        };
      }
      return team;
    }));

    // Update selected team
    setSelectedTeam({
      ...selectedTeam,
      invites: selectedTeam.invites.filter(invite => invite.id !== inviteId)
    });
  };

  const handleUpdateMemberRole = (memberId: number, newRole: string) => {
    if (!selectedTeam) return;

    // Update teams state
    setTeams(teams.map(team => {
      if (team.id === selectedTeam.id) {
        return {
          ...team,
          members: team.members.map(member => {
            if (member.id === memberId) {
              return {
                ...member,
                role: newRole
              };
            }
            return member;
          })
        };
      }
      return team;
    }));

    // Update selected team
    setSelectedTeam({
      ...selectedTeam,
      members: selectedTeam.members.map(member => {
        if (member.id === memberId) {
          return {
            ...member,
            role: newRole
          };
        }
        return member;
      })
    });

    // Reset editing state
    setEditingMember(null);
  };

  const handleRemoveMember = (memberId: number) => {
    if (!selectedTeam) return;

    // Update teams state
    setTeams(teams.map(team => {
      if (team.id === selectedTeam.id) {
        return {
          ...team,
          members: team.members.filter(member => member.id !== memberId)
        };
      }
      return team;
    }));

    // Update selected team
    setSelectedTeam({
      ...selectedTeam,
      members: selectedTeam.members.filter(member => member.id !== memberId)
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Team Management</h2>
          <p className="text-muted-foreground">
            Manage your competition teams, members, and invitations
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/student/team/create">
            <Users className="mr-2 h-4 w-4" />
            Create New Team
          </Link>
        </Button>
      </div>

      {teams.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-30" />
            <h3 className="text-lg font-medium mb-2">No Teams Yet</h3>
            <p className="text-sm text-muted-foreground mb-6">
              You haven't created or joined any teams yet.
              Create a team to participate in competitions together.
            </p>
            <Button asChild>
              <Link href="/dashboard/student/team/create">
                <Users className="mr-2 h-4 w-4" />
                Create Your First Team
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Team Selection Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Your Teams</CardTitle>
                <CardDescription>
                  Select a team to manage
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="space-y-2">
                  {teams.map(team => (
                    <div
                      key={team.id}
                      className={`p-2 rounded-md cursor-pointer transition-colors ${
                        selectedTeam?.id === team.id ?
                        'bg-primary text-primary-foreground' :
                        'hover:bg-muted'
                      }`}
                      onClick={() => setSelectedTeam(team)}
                    >
                      <div className="font-medium truncate">{team.name}</div>
                      <div className="text-xs truncate">
                        {selectedTeam?.id === team.id ?
                          team.competition :
                          <span className="text-muted-foreground">{team.competition}</span>
                        }
                      </div>
                      {team.isLeader && (
                        <Badge
                          variant={selectedTeam?.id === team.id ? "outline" : "secondary"}
                          className={selectedTeam?.id === team.id ?
                            "border-primary-foreground/50 text-primary-foreground mt-1" :
                            "mt-1"
                          }
                        >
                          Team Leader
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Management Main Content */}
          <div className="md:col-span-3">
            {selectedTeam && (
              <div className="space-y-4">
                {/* Team Details Card */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{selectedTeam.name}</CardTitle>
                        <CardDescription>
                          {selectedTeam.competition}
                        </CardDescription>
                      </div>
                      {selectedTeam.isLeader && (
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/student/team/${selectedTeam.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Team
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">
                      {selectedTeam.description}
                    </p>
                    <div className="text-sm text-muted-foreground">
                      Created on {selectedTeam.createdDate} • {selectedTeam.members.length} members
                    </div>
                  </CardContent>
                </Card>

                {/* Tabs for Members and Invites */}
                <Tabs defaultValue="members">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="members">
                      Team Members ({selectedTeam.members.length})
                    </TabsTrigger>
                    {selectedTeam.isLeader && (
                      <TabsTrigger value="invites">
                        Invitations ({selectedTeam.invites.filter(i => i.status === "pending").length})
                      </TabsTrigger>
                    )}
                  </TabsList>

                  <TabsContent value="members" className="space-y-4 mt-4">
                    {selectedTeam.members.map(member => (
                      <Card key={member.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={member.avatar} alt={member.name} />
                                <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{member.name}</div>
                                <div className="text-sm text-muted-foreground">{member.email}</div>
                                {editingMember?.id === member.id ? (
                                  <div className="flex items-center gap-2 mt-1">
                                    <Input
                                      value={editingMember.role}
                                      onChange={(e) => setEditingMember({...editingMember, role: e.target.value})}
                                      className="h-8 w-48"
                                    />
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => handleUpdateMemberRole(member.id, editingMember.role)}
                                    >
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => setEditingMember(null)}
                                    >
                                      <XCircle className="h-4 w-4 text-red-500" />
                                    </Button>
                                  </div>
                                ) : (
                                  <Badge variant="outline" className="mt-1">
                                    {member.role}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-sm text-muted-foreground text-right">
                                Joined {member.joinedDate}
                              </div>
                              {selectedTeam.isLeader && member.id !== 1 && (
                                <div className="flex gap-1">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => setEditingMember({ id: member.id, role: member.role })}
                                  >
                                    <Edit className="h-4 w-4 text-muted-foreground" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleRemoveMember(member.id)}
                                  >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {selectedTeam.isLeader && (
                      <Card className="border-dashed">
                        <CardContent className="p-4">
                          <Link href="#invite-members" className="flex items-center justify-center text-center h-20 text-muted-foreground hover:text-foreground transition-colors">
                            <div>
                              <UserPlus className="h-8 w-8 mx-auto mb-1" />
                              <span>Invite New Member</span>
                            </div>
                          </Link>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  {selectedTeam.isLeader && (
                    <TabsContent value="invites" className="space-y-4 mt-4">
                      <Card id="invite-members">
                        <CardHeader>
                          <CardTitle>Invite Team Members</CardTitle>
                          <CardDescription>
                            Send invitations to join your team
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Name</label>
                              <Input
                                name="name"
                                value={newInvite.name}
                                onChange={handleInviteChange}
                                placeholder="Enter full name"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Email</label>
                              <Input
                                name="email"
                                type="email"
                                value={newInvite.email}
                                onChange={handleInviteChange}
                                placeholder="Enter email address"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Role</label>
                              <Input
                                name="role"
                                value={newInvite.role}
                                onChange={handleInviteChange}
                                placeholder="E.g., Designer, Engineer"
                              />
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t px-6 py-4">
                          <div className="text-sm text-muted-foreground">
                            <AlertCircle className="h-4 w-4 inline-block mr-1" />
                            Invitees must have SAE membership
                          </div>
                          <Button onClick={handleSendInvite}>
                            <Send className="mr-2 h-4 w-4" />
                            Send Invite
                          </Button>
                        </CardFooter>
                      </Card>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Pending Invitations</h3>
                        {selectedTeam.invites.length === 0 ? (
                          <div className="text-center py-8 bg-muted/40 rounded-lg">
                            <Clock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-muted-foreground">No pending invitations</p>
                          </div>
                        ) : (
                          selectedTeam.invites.map(invite => (
                            <Card key={invite.id}>
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="font-medium">{invite.name}</div>
                                    <div className="text-sm text-muted-foreground">{invite.email}</div>
                                    <div className="flex items-center gap-2 mt-1">
                                      <Badge variant="outline">{invite.role}</Badge>
                                      <span className="text-xs text-muted-foreground">Sent on {invite.sentDate}</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge
                                      variant={invite.status === "pending" ? "outline" :
                                             invite.status === "accepted" ? "default" : "secondary"}
                                      className={invite.status === "accepted" ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-300" :
                                               invite.status === "declined" ? "bg-red-100 text-red-800 hover:bg-red-100 border-red-300" : ""}
                                    >
                                      {invite.status.charAt(0).toUpperCase() + invite.status.slice(1)}
                                    </Badge>
                                    {invite.status === "pending" && (
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleCancelInvite(invite.id)}
                                      >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        )}
                      </div>
                    </TabsContent>
                  )}
                </Tabs>

                {/* Competition Details Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Competition Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-primary" />
                        <div className="font-medium">{selectedTeam.competition}</div>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/dashboard/student/competitions/1`}>
                          Competition Details
                        </Link>
                      </Button>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Upcoming Deadlines</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Technical Report Submission</span>
                          </div>
                          <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-300">
                            10 days left
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">CAD Model Submission</span>
                          </div>
                          <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-300">
                            15 days left
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/dashboard/student/submissions/create">
                        Submit Competition Entry
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
