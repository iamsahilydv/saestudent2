"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Phone,
  MapPin,
  School,
  Award,
  Settings,
  FileText,
  Key,
  Bell,
  Download,
  Calendar,
  Pencil,
  Save,
  Clock,
  CreditCard
} from "lucide-react";

export default function StudentProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  // Mock student data
  const student = {
    id: "SAEM123456",
    name: "Rahul Kumar",
    email: "rahul.kumar@example.com",
    phone: "+91 9876543210",
    institution: "National Institute of Technology, Trichy",
    department: "Mechanical Engineering",
    year: "3rd Year",
    avatar: "/images/avatar.png",
    membershipStatus: "Active",
    membershipExpiry: "31 December 2025",
    joinDate: "15 January 2023",
    address: {
      street: "123 College Road",
      city: "Trichy",
      state: "Tamil Nadu",
      postalCode: "620015",
      country: "India"
    }
  };

  // Mock certificates data
  const certificates = [
    {
      id: 1,
      title: "Electric Drivetrain Workshop",
      issueDate: "January 15, 2025",
      expiry: null,
      downloadUrl: "#"
    },
    {
      id: 2,
      title: "BAJA SAE 2024 Participation",
      issueDate: "November 10, 2024",
      expiry: null,
      downloadUrl: "#"
    },
    {
      id: 3,
      title: "CAD Modeling Mastery",
      issueDate: "February 5, 2025",
      expiry: "February 5, 2027",
      downloadUrl: "#"
    }
  ];

  // Mock achievements data
  const achievements = [
    {
      id: 1,
      title: "2nd Place - Drone Design Challenge 2024",
      date: "August 15, 2024",
      description: "Recognized for innovative propulsion system and energy-efficient design"
    },
    {
      id: 2,
      title: "Best Technical Report - BAJA SAE 2024",
      date: "November 20, 2024",
      description: "Awarded for comprehensive technical documentation and analysis"
    },
    {
      id: 3,
      title: "Outstanding Team Member",
      date: "December 5, 2024",
      description: "Recognized for exceptional contribution to the Electric Vehicle Challenge team"
    }
  ];

  // Mock event history
  const eventHistory = [
    {
      id: 1,
      title: "BAJA SAE India 2024",
      date: "October 15-20, 2024",
      role: "Team Lead - Suspension Design",
      status: "Completed"
    },
    {
      id: 2,
      title: "Electric Vehicle Symposium",
      date: "May 5, 2024",
      role: "Participant",
      status: "Attended"
    },
    {
      id: 3,
      title: "Drone Design Workshop",
      date: "July 12, 2024",
      role: "Participant",
      status: "Completed"
    },
    {
      id: 4,
      title: "CAD Modeling Masterclass",
      date: "February 2-5, 2025",
      role: "Participant",
      status: "Completed"
    }
  ];

  const [formData, setFormData] = useState({
    name: student.name,
    email: student.email,
    phone: student.phone,
    institution: student.institution,
    department: student.department,
    street: student.address.street,
    city: student.address.city,
    state: student.address.state,
    postalCode: student.address.postalCode
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // In a real app, you would save the data to a backend here
    setIsEditing(false);
    // Show a success notification
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
          <p className="text-muted-foreground">
            Manage your personal information, achievements, and settings
          </p>
        </div>
        <div>
          {isEditing ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <Card className="md:col-span-1">
          <CardHeader className="relative pb-0">
            <div className="absolute top-2 right-2">
              <Badge variant="outline" className={student.membershipStatus === "Active" ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-300" : "bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-300"}>
                {student.membershipStatus} Member
              </Badge>
            </div>
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={student.avatar} alt={student.name} />
                <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-center">{student.name}</CardTitle>
              <CardDescription className="text-center">{student.id}</CardDescription>
              <div className="text-sm text-center mt-1 text-muted-foreground">
                {student.department}
              </div>
              <div className="text-sm text-center text-muted-foreground">
                {student.year}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{student.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{student.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <School className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{student.institution}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{student.address.city}, {student.address.state}</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-3">
              <h3 className="text-sm font-semibold">Membership Information</h3>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">ID: {student.id}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Joined: {student.joinDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Expires: {student.membershipExpiry}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/membership/renew">
                Renew Membership
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Main Content Tabs */}
        <div className="md:col-span-2">
          <Tabs defaultValue="personal">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="events">Event History</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="institution" className="text-sm font-medium">Institution</label>
                      <Input
                        id="institution"
                        name="institution"
                        value={formData.institution}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="department" className="text-sm font-medium">Department</label>
                      <Input
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <Separator className="my-2" />

                  <h3 className="text-sm font-semibold pt-2">Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="street" className="text-sm font-medium">Street Address</label>
                      <Input
                        id="street"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="city" className="text-sm font-medium">City</label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="state" className="text-sm font-medium">State</label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="postalCode" className="text-sm font-medium">Postal Code</label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Certificates</CardTitle>
                  <CardDescription>
                    View and download your certificates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {certificates.map(certificate => (
                      <div key={certificate.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                        <div className="space-y-1">
                          <div className="font-medium">{certificate.title}</div>
                          <div className="text-sm text-muted-foreground">
                            Issued: {certificate.issueDate}
                            {certificate.expiry && ` • Expires: ${certificate.expiry}`}
                          </div>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={certificate.downloadUrl}>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Achievements & Awards</CardTitle>
                  <CardDescription>
                    Your recognitions and accomplishments in SAE events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {achievements.map(achievement => (
                      <div key={achievement.id} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-start gap-4">
                          <Award className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <h3 className="font-medium">{achievement.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{achievement.date}</p>
                            <p className="text-sm">{achievement.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}

                    {achievements.length === 0 && (
                      <div className="text-center py-8">
                        <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-30" />
                        <h3 className="text-lg font-medium mb-2">No achievements yet</h3>
                        <p className="text-sm text-muted-foreground">
                          Participate in SAE events and competitions to earn achievements
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Event History Tab */}
            <TabsContent value="events" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Event History</CardTitle>
                  <CardDescription>
                    Your participation in SAE events and competitions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {eventHistory.map(event => (
                      <div key={event.id} className="flex items-start justify-between py-3 border-b last:border-b-0">
                        <div className="space-y-1">
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-muted-foreground">{event.date}</div>
                          <div className="text-sm">{event.role}</div>
                        </div>
                        <Badge variant={
                          event.status === "Completed" ? "default" :
                          event.status === "Attended" ? "outline" : "secondary"
                        }>
                          {event.status}
                        </Badge>
                      </div>
                    ))}

                    {eventHistory.length === 0 && (
                      <div className="text-center py-8">
                        <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-30" />
                        <h3 className="text-lg font-medium mb-2">No event history</h3>
                        <p className="text-sm text-muted-foreground">
                          Your participation in events will be shown here
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/dashboard/events">
                      Browse Upcoming Events
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account preferences and security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold flex items-center">
                      <Key className="h-4 w-4 mr-2" />
                      Password & Security
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Update your password and security preferences
                    </p>
                    <Button variant="outline" size="sm">Change Password</Button>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold flex items-center">
                      <Bell className="h-4 w-4 mr-2" />
                      Notifications
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Control what notifications you receive
                    </p>

                    <div className="space-y-2 mt-4">
                      <div className="flex items-center justify-between">
                        <label htmlFor="event-notifications" className="text-sm">
                          Event Updates
                        </label>
                        <input
                          type="checkbox"
                          id="event-notifications"
                          defaultChecked
                          className="h-4 w-4"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <label htmlFor="deadline-reminders" className="text-sm">
                          Deadline Reminders
                        </label>
                        <input
                          type="checkbox"
                          id="deadline-reminders"
                          defaultChecked
                          className="h-4 w-4"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <label htmlFor="newsletter" className="text-sm">
                          SAE Newsletter
                        </label>
                        <input
                          type="checkbox"
                          id="newsletter"
                          defaultChecked
                          className="h-4 w-4"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      Privacy & Data
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Manage your data and privacy settings
                    </p>

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">Download My Data</Button>
                      <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive/10">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
