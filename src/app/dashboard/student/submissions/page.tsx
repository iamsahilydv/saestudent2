"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Search,
  Filter,
  Plus,
  Eye,
  Download,
  Clock,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface Submission {
  id: number;
  title: string;
  competition: string;
  team: string;
  submissionType: string;
  submissionDate: string;
  dueDate: string;
  status: "approved" | "rejected" | "pending" | "draft";
  feedback?: string;
  files: {
    name: string;
    size: string;
    type: string;
    url: string;
  }[];
}

export default function SubmissionsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock submissions data
  const submissions: Submission[] = [
    {
      id: 123456,
      title: "BAJA SAE Technical Report",
      competition: "BAJA SAE 2025",
      team: "Team Invincible",
      submissionType: "Technical Report",
      submissionDate: "April 3, 2025",
      dueDate: "April 15, 2025",
      status: "pending",
      files: [
        {
          name: "Technical_Report_TeamInvincible.pdf",
          size: "8.4 MB",
          type: "PDF",
          url: "#"
        },
        {
          name: "Appendix_A_Calculations.xlsx",
          size: "2.1 MB",
          type: "XLSX",
          url: "#"
        }
      ]
    },
    {
      id: 123457,
      title: "Drone Design Concept",
      competition: "Drone Design Challenge 2025",
      team: "Aero Innovators",
      submissionType: "Concept Design",
      submissionDate: "March 25, 2025",
      dueDate: "March 30, 2025",
      status: "approved",
      feedback: "Excellent concept with innovative propulsion system. Consider more detail on control systems in your next submission.",
      files: [
        {
          name: "Drone_Concept_AeroInnovators.pdf",
          size: "5.2 MB",
          type: "PDF",
          url: "#"
        },
        {
          name: "Initial_CAD_Model.stp",
          size: "15.7 MB",
          type: "STP",
          url: "#"
        }
      ]
    },
    {
      id: 123458,
      title: "Preliminary Cost Report",
      competition: "BAJA SAE 2025",
      team: "Team Invincible",
      submissionType: "Cost Report",
      submissionDate: "March 15, 2025",
      dueDate: "March 20, 2025",
      status: "rejected",
      feedback: "Missing critical component cost details. Please review the guidelines and resubmit with complete parts listing and manufacturing costs.",
      files: [
        {
          name: "Cost_Report_Preliminary.xlsx",
          size: "1.8 MB",
          type: "XLSX",
          url: "#"
        }
      ]
    },
    {
      id: 123459,
      title: "Suspension Analysis",
      competition: "BAJA SAE 2025",
      team: "Team Invincible",
      submissionType: "Technical Analysis",
      submissionDate: "February 28, 2025",
      dueDate: "March 5, 2025",
      status: "approved",
      feedback: "Thorough analysis with good simulation results. Well done!",
      files: [
        {
          name: "Suspension_Analysis_Report.pdf",
          size: "7.6 MB",
          type: "PDF",
          url: "#"
        },
        {
          name: "Simulation_Results.zip",
          size: "22.3 MB",
          type: "ZIP",
          url: "#"
        }
      ]
    },
    {
      id: 123460,
      title: "CAD Models - Drone Frame",
      competition: "Drone Design Challenge 2025",
      team: "Aero Innovators",
      submissionType: "CAD Models",
      submissionDate: "",
      dueDate: "April 30, 2025",
      status: "draft",
      files: [
        {
          name: "Frame_Draft_v1.stp",
          size: "18.2 MB",
          type: "STP",
          url: "#"
        }
      ]
    }
  ];

  // Filter submissions based on search
  const filteredSubmissions = submissions.filter(submission => {
    return searchQuery.trim() === "" ||
      submission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.competition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.submissionType.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Group submissions by status for tabs
  const pendingSubmissions = filteredSubmissions.filter(s => s.status === "pending");
  const approvedSubmissions = filteredSubmissions.filter(s => s.status === "approved");
  const rejectedSubmissions = filteredSubmissions.filter(s => s.status === "rejected");
  const draftSubmissions = filteredSubmissions.filter(s => s.status === "draft");

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "draft":
        return <FileText className="h-5 w-5 text-muted-foreground" />;
      default:
        return <AlertCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-300">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-red-300">Rejected</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-300">Pending Review</Badge>;
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Submissions</h2>
          <p className="text-muted-foreground">
            View and manage your competition submissions
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/student/submissions/create">
            <Plus className="mr-2 h-4 w-4" />
            New Submission
          </Link>
        </Button>
      </div>

      {/* Search and filters */}
      <div className="grid grid-cols-1 gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search submissions by title, competition, or team..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Submissions tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">
            All Submissions
            <span className="ml-1 text-xs bg-muted px-1.5 py-0.5 rounded-full">{filteredSubmissions.length}</span>
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending
            <span className="ml-1 text-xs bg-muted px-1.5 py-0.5 rounded-full">{pendingSubmissions.length}</span>
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved
            <span className="ml-1 text-xs bg-muted px-1.5 py-0.5 rounded-full">{approvedSubmissions.length}</span>
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected
            <span className="ml-1 text-xs bg-muted px-1.5 py-0.5 rounded-full">{rejectedSubmissions.length}</span>
          </TabsTrigger>
          <TabsTrigger value="drafts">
            Drafts
            <span className="ml-1 text-xs bg-muted px-1.5 py-0.5 rounded-full">{draftSubmissions.length}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {renderSubmissionList(filteredSubmissions)}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {renderSubmissionList(pendingSubmissions)}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {renderSubmissionList(approvedSubmissions)}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {renderSubmissionList(rejectedSubmissions)}
        </TabsContent>

        <TabsContent value="drafts" className="space-y-4">
          {renderSubmissionList(draftSubmissions)}
        </TabsContent>
      </Tabs>
    </div>
  );

  function renderSubmissionList(submissions: Submission[]) {
    if (submissions.length === 0) {
      return (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-40" />
          <h3 className="text-lg font-medium mb-2">No submissions found</h3>
          <p className="text-muted-foreground">
            {searchQuery
              ? "Try adjusting your search to find what you're looking for."
              : "You don't have any submissions in this category."}
          </p>
          {!searchQuery && (
            <Button className="mt-4" asChild>
              <Link href="/dashboard/student/submissions/create">
                <Plus className="mr-2 h-4 w-4" />
                Create New Submission
              </Link>
            </Button>
          )}
        </div>
      );
    }

    return submissions.map(submission => (
      <Card key={submission.id} className={`sae-card-hover ${submission.status === 'rejected' ? 'border-destructive/30' : ''}`}>
        <CardContent className="p-5">
          <div className="flex flex-col lg:flex-row lg:items-start gap-4">
            <div className="flex-shrink-0 mr-2">
              {getStatusIcon(submission.status)}
            </div>

            <div className="flex-grow">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                <div>
                  <h3 className="text-lg font-medium">{submission.title}</h3>
                  <div className="text-sm text-muted-foreground">{submission.competition} • {submission.team}</div>
                </div>
                {getStatusBadge(submission.status)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <div className="text-sm font-medium">Submission Details</div>
                  <div className="grid grid-cols-2 gap-2 mt-1.5">
                    <div className="text-sm text-muted-foreground">Type:</div>
                    <div className="text-sm">{submission.submissionType}</div>

                    <div className="text-sm text-muted-foreground">Submitted:</div>
                    <div className="text-sm">
                      {submission.submissionDate || "Not submitted yet"}
                    </div>

                    <div className="text-sm text-muted-foreground">Due Date:</div>
                    <div className="text-sm">{submission.dueDate}</div>

                    <div className="text-sm text-muted-foreground">Files:</div>
                    <div className="text-sm">{submission.files.length} file{submission.files.length !== 1 ? 's' : ''}</div>
                  </div>
                </div>

                <div>
                  {submission.feedback && (
                    <>
                      <div className="text-sm font-medium">Feedback</div>
                      <p className="text-sm mt-1.5 line-clamp-3">{submission.feedback}</p>
                    </>
                  )}
                </div>
              </div>

              <Separator className="my-4" />

              <div>
                <div className="text-sm font-medium mb-2">Files</div>
                <div className="space-y-2">
                  {submission.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted/50 py-2 px-3 rounded-md">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">{file.name}</span>
                        <span className="text-xs text-muted-foreground">({file.size})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={file.url}>
                            <Eye className="h-3.5 w-3.5" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={file.url}>
                            <Download className="h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/student/submissions/${submission.id}`}>
                    <Eye className="mr-1 h-3.5 w-3.5" />
                    View Details
                  </Link>
                </Button>

                {submission.status === "draft" && (
                  <Button size="sm" asChild>
                    <Link href={`/dashboard/student/submissions/${submission.id}/edit`}>
                      Continue Editing
                    </Link>
                  </Button>
                )}

                {submission.status === "rejected" && (
                  <Button size="sm" asChild>
                    <Link href={`/dashboard/student/submissions/${submission.id}/resubmit`}>
                      Resubmit
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    ));
  }
}
