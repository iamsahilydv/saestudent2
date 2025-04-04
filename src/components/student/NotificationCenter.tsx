"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Bell,
  Calendar,
  Clock,
  FileText,
  MessageSquare,
  Trophy,
  X,
  CheckCircle,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "deadline" | "announcement" | "reminder" | "feedback";
  status: "unread" | "read";
  date: string;
  time: string;
  link?: string;
  linkText?: string;
}

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Technical Report Deadline Approaching",
      message: "The deadline for submitting the Technical Report for BAJA SAE 2025 is in 10 days.",
      type: "deadline",
      status: "unread",
      date: "Apr 3, 2025",
      time: "09:15 AM",
      link: "/dashboard/student/submissions/create",
      linkText: "Submit Now"
    },
    {
      id: 2,
      title: "New Feedback Received",
      message: "You have received feedback on your Drone Design Concept submission.",
      type: "feedback",
      status: "unread",
      date: "Apr 2, 2025",
      time: "02:45 PM",
      link: "/dashboard/student/submissions/123",
      linkText: "View Feedback"
    },
    {
      id: 3,
      title: "Workshop Registration Confirmed",
      message: "Your registration for 'Electric Drivetrain Design Workshop' has been confirmed.",
      type: "announcement",
      status: "read",
      date: "Mar 30, 2025",
      time: "11:20 AM",
      link: "/dashboard/events/456",
      linkText: "View Details"
    },
    {
      id: 4,
      title: "Team Invitation Accepted",
      message: "Vikram Mehta has accepted your invitation to join Team Invincible.",
      type: "announcement",
      status: "read",
      date: "Mar 28, 2025",
      time: "04:10 PM",
      link: "/dashboard/student/team",
      linkText: "View Team"
    },
    {
      id: 5,
      title: "CAD Models Submission Reminder",
      message: "Don't forget to submit your CAD models by April 30, 2025.",
      type: "reminder",
      status: "unread",
      date: "Mar 25, 2025",
      time: "10:00 AM",
      link: "/dashboard/student/submissions/create",
      linkText: "Submit Now"
    }
  ]);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const unreadCount = notifications.filter(n => n.status === "unread").length;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-dropdown]') && dropdownOpen) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, status: "read" })));
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, status: "read" } : n
    ));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  // Get notifications for the dropdown preview (max 3)
  const previewNotifications = notifications
    .filter(n => n.status === "unread")
    .slice(0, 3);

  // Filter notifications by type for the tabs
  const deadlineNotifications = notifications.filter(n => n.type === "deadline" || n.type === "reminder");
  const announcementNotifications = notifications.filter(n => n.type === "announcement" || n.type === "feedback");

  const getIcon = (type: string) => {
    switch(type) {
      case "deadline":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "reminder":
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case "announcement":
        return <Info className="h-5 w-5 text-indigo-500" />;
      case "feedback":
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      default:
        return <Info className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div data-dropdown>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-96 p-0" align="end">
          <div className="flex items-center justify-between p-4 border-b">
            <div>
              <DropdownMenuLabel className="text-base font-semibold">Notifications</DropdownMenuLabel>
              <p className="text-xs text-muted-foreground">
                You have {unreadCount} unread notifications
              </p>
            </div>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-8"
                onClick={markAllAsRead}
              >
                Mark all as read
              </Button>
            )}
          </div>

          <div className="max-h-[350px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="h-8 w-8 mx-auto mb-2 text-muted-foreground opacity-50" />
                <p className="text-sm font-medium mb-1">No notifications</p>
                <p className="text-xs text-muted-foreground">
                  You're all caught up!
                </p>
              </div>
            ) : (
              <>
                {previewNotifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="px-4 py-3 cursor-default">
                    <div className="flex gap-3 w-full">
                      <div className="flex-shrink-0 mt-1">
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <p className="text-sm font-medium truncate pr-2">{notification.title}</p>
                          <p className="text-xs text-muted-foreground whitespace-nowrap">{notification.date}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{notification.message}</p>
                        {notification.link && (
                          <Link
                            href={notification.link}
                            className="text-xs text-primary hover:underline mt-1 block"
                            onClick={() => {
                              markAsRead(notification.id);
                              setDropdownOpen(false);
                            }}
                          >
                            {notification.linkText || "View Details"}
                          </Link>
                        )}
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}

                {unreadCount > 3 && (
                  <div className="px-4 py-2 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-xs"
                      onClick={() => {
                        setIsOpen(true);
                        setDropdownOpen(false);
                      }}
                    >
                      View all notifications
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="p-2 text-center cursor-pointer"
            onClick={() => {
              setIsOpen(true);
              setDropdownOpen(false);
            }}
          >
            View All Notifications
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Full Notification Center Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <Card className="w-full max-w-3xl h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Notification Center</CardTitle>
                  <CardDescription>
                    Stay updated on deadlines, announcements, and feedback
                  </CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <Tabs defaultValue="all" className="flex-1 flex flex-col">
              <div className="px-6 pt-6 space-y-1">
                <div className="flex justify-between items-center">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
                    <TabsTrigger value="announcements">Announcements</TabsTrigger>
                  </TabsList>
                  {unreadCount > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={markAllAsRead}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark all as read
                    </Button>
                  )}
                </div>
              </div>

              <TabsContent value="all" className="flex-1 overflow-auto p-6">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <Bell className="h-12 w-12 text-muted-foreground opacity-20 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No notifications</h3>
                    <p className="text-muted-foreground text-center max-w-sm">
                      You're all caught up! Notifications about deadlines, announcements, and feedback will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-lg border ${notification.status === 'unread' ? 'bg-muted/50 border-primary/10' : 'bg-background'}`}
                      >
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 mt-1">
                            {getIcon(notification.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="text-base font-medium">
                                {notification.title}
                                {notification.status === 'unread' && (
                                  <Badge variant="outline" className="ml-2 bg-primary/10 text-primary border-transparent">
                                    New
                                  </Badge>
                                )}
                              </h3>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <span>{notification.date} • {notification.time}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => deleteNotification(notification.id)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-sm mt-1 mb-3">{notification.message}</p>
                            {notification.link && (
                              <Button
                                variant="outline"
                                size="sm"
                                asChild
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Link href={notification.link}>
                                  {notification.linkText || "View Details"}
                                </Link>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="deadlines" className="flex-1 overflow-auto p-6">
                {deadlineNotifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <Calendar className="h-12 w-12 text-muted-foreground opacity-20 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No deadline notifications</h3>
                    <p className="text-muted-foreground text-center max-w-sm">
                      You don't have any deadlines or reminders at the moment.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {deadlineNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-lg border ${notification.status === 'unread' ? 'bg-muted/50 border-primary/10' : 'bg-background'}`}
                      >
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 mt-1">
                            {getIcon(notification.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="text-base font-medium">
                                {notification.title}
                                {notification.status === 'unread' && (
                                  <Badge variant="outline" className="ml-2 bg-primary/10 text-primary border-transparent">
                                    New
                                  </Badge>
                                )}
                              </h3>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <span>{notification.date} • {notification.time}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => deleteNotification(notification.id)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-sm mt-1 mb-3">{notification.message}</p>
                            {notification.link && (
                              <Button
                                variant="outline"
                                size="sm"
                                asChild
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Link href={notification.link}>
                                  {notification.linkText || "View Details"}
                                </Link>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="announcements" className="flex-1 overflow-auto p-6">
                {announcementNotifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <MessageSquare className="h-12 w-12 text-muted-foreground opacity-20 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No announcements</h3>
                    <p className="text-muted-foreground text-center max-w-sm">
                      You don't have any announcements or feedback notifications at the moment.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {announcementNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-lg border ${notification.status === 'unread' ? 'bg-muted/50 border-primary/10' : 'bg-background'}`}
                      >
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 mt-1">
                            {getIcon(notification.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="text-base font-medium">
                                {notification.title}
                                {notification.status === 'unread' && (
                                  <Badge variant="outline" className="ml-2 bg-primary/10 text-primary border-transparent">
                                    New
                                  </Badge>
                                )}
                              </h3>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <span>{notification.date} • {notification.time}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => deleteNotification(notification.id)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-sm mt-1 mb-3">{notification.message}</p>
                            {notification.link && (
                              <Button
                                variant="outline"
                                size="sm"
                                asChild
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Link href={notification.link}>
                                  {notification.linkText || "View Details"}
                                </Link>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      )}
    </div>
  );
}
