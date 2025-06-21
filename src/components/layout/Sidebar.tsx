"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  User,
  CalendarDays,
  Award,
  Lightbulb,
  BookOpen,
  FileText,
  Users,
  Settings,
  HelpCircle,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

interface SidebarNavProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarNavProps) {
  const pathname = usePathname();

  const routes = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
      variant: "default",
    },
    {
      title: "Student Dashboard",
      href: "/dashboard/student",
      icon: <User className="mr-2 h-4 w-4" />,
      variant: "default",
      badge: "New",
    },
    {
      title: "All Events",
      href: "/dashboard/events",
      icon: <CalendarDays className="mr-2 h-4 w-4" />,
      variant: "default",
      badge: 2, // Number of active events
    },
    {
      title: "Awareness Sessions",
      href: "/dashboard/awareness-sessions",
      icon: <Award className="mr-2 h-4 w-4" />,
      variant: "default",
    },
    {
      title: "Workshops",
      href: "/dashboard/workshops",
      icon: <Lightbulb className="mr-2 h-4 w-4" />,
      variant: "default",
      badge: "New", // New workshops available
    },
    {
      title: "Opportunities",
      href: "/dashboard/opportunities",
      icon: <Lightbulb className="mr-2 h-4 w-4" />,
      variant: "default",
      badge: "New", // New opportunities available
    },
    {
      title: "Learning Resources",
      href: "/dashboard/resources",
      icon: <BookOpen className="mr-2 h-4 w-4" />,
      variant: "default",
    },
    {
      title: "My Documents",
      href: "/dashboard/documents",
      icon: <FileText className="mr-2 h-4 w-4" />,
      variant: "default",
    },
  ];

  const secondaryRoutes = [
    {
      title: "My Team",
      href: "/dashboard/team",
      icon: <Users className="mr-2 h-4 w-4" />,
      variant: "ghost",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
      variant: "ghost",
    },
    {
      title: "Help & Support",
      href: "/dashboard/support",
      icon: <HelpCircle className="mr-2 h-4 w-4" />,
      variant: "ghost",
    },
    {
      title: "Feedback",
      href: "/dashboard/feedback",
      icon: <MessageSquare className="mr-2 h-4 w-4" />,
      variant: "ghost",
    },
  ];

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Main Navigation
          </h2>
          <ScrollArea className="h-[calc(100vh-14rem)]">
            <div className="space-y-1">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    pathname === route.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span className="flex items-center">
                    {route.icon}
                    {route.title}
                  </span>
                  {route.badge && (
                    <Badge
                      variant="outline"
                      className={cn(
                        pathname === route.href
                          ? "bg-primary-foreground text-primary border-primary-foreground"
                          : "bg-background"
                      )}
                    >
                      {route.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="px-2">
              <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                Other
              </h2>
              <div className="space-y-1">
                {secondaryRoutes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      pathname === route.href
                        ? "bg-muted text-foreground"
                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {route.icon}
                    {route.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-8 px-6 py-4 bg-muted rounded-lg">
              <h3 className="text-sm font-medium">Upcoming deadlines</h3>
              <p className="text-xs text-muted-foreground mt-1">
                BAJA SAE design submission: 28 days left
              </p>
              <div className="w-full h-2 bg-background rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-accent w-[60%]" />
              </div>
            </div>

            <div className="mt-4 px-6 py-4 bg-accent/10 text-accent-foreground rounded-lg">
              <h3 className="text-sm font-medium">Need help?</h3>
              <p className="text-xs mt-1">
                Contact your SAE coordinator or visit the help center.
              </p>
              <Link
                href="/dashboard/support"
                className="inline-flex items-center text-xs font-medium mt-2 text-accent hover:underline"
              >
                Get support
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
