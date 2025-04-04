"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  Search,
  Filter,
  BookOpen,
  Video,
  FileSpreadsheet,
  Download,
  FolderOpen,
  Star,
  ExternalLink,
  Clock,
  Calendar,
  GraduationCap,
  Code
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface Resource {
  id: number;
  title: string;
  description: string;
  type: string; // document, video, template, software, course
  category: string; // technical, design, project management, etc.
  tags: string[];
  downloadUrl?: string;
  externalUrl?: string;
  fileSize?: string;
  fileType?: string;
  uploadDate: string;
  featured?: boolean;
  thumbnail?: string;
}

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock resources data
  const resources: Resource[] = [
    {
      id: 1,
      title: "BAJA SAE Technical Report Template",
      description: "Official template for creating your BAJA SAE technical documentation with proper formatting and section guidelines.",
      type: "document",
      category: "technical",
      tags: ["templates", "baja", "documentation"],
      downloadUrl: "#",
      fileSize: "2.4 MB",
      fileType: "DOCX",
      uploadDate: "February 15, 2025",
      featured: true,
      thumbnail: "/images/baja-sae.jpg"
    },
    {
      id: 2,
      title: "CAD File Standards Guide",
      description: "Comprehensive guide on CAD file naming conventions, folder structures, and best practices for SAE competitions.",
      type: "document",
      category: "design",
      tags: ["CAD", "standards", "organization"],
      downloadUrl: "#",
      fileSize: "3.1 MB",
      fileType: "PDF",
      uploadDate: "January 10, 2025",
      featured: true
    },
    {
      id: 3,
      title: "Vehicle Dynamics Fundamentals",
      description: "Introduction to the principles of vehicle dynamics, suspension systems, and handling characteristics for automotive competitions.",
      type: "video",
      category: "technical",
      tags: ["dynamics", "education", "suspension"],
      externalUrl: "https://www.youtube.com/watch?v=example",
      uploadDate: "March 5, 2025"
    },
    {
      id: 4,
      title: "Competition Cost Report Template",
      description: "Excel template for tracking and reporting all costs associated with your competition vehicle build.",
      type: "template",
      category: "project management",
      tags: ["cost", "budgeting", "reporting"],
      downloadUrl: "#",
      fileSize: "1.8 MB",
      fileType: "XLSX",
      uploadDate: "February 28, 2025"
    },
    {
      id: 5,
      title: "Electric Vehicle Systems Overview",
      description: "Detailed guide covering battery systems, motor selection, control systems, and safety requirements for electric vehicles.",
      type: "document",
      category: "technical",
      tags: ["electric vehicles", "batteries", "motors"],
      downloadUrl: "#",
      fileSize: "8.5 MB",
      fileType: "PDF",
      uploadDate: "March 15, 2025",
      featured: true
    },
    {
      id: 6,
      title: "Material Selection for Lightweight Structures",
      description: "Guide to selecting appropriate materials for competition vehicles with considerations for strength, weight, and manufacturability.",
      type: "document",
      category: "design",
      tags: ["materials", "structures", "optimization"],
      downloadUrl: "#",
      fileSize: "5.2 MB",
      fileType: "PDF",
      uploadDate: "January 25, 2025"
    },
    {
      id: 7,
      title: "Intro to CFD for Automotive Applications",
      description: "Beginner-friendly video course on using Computational Fluid Dynamics for aerodynamic analysis of competition vehicles.",
      type: "video",
      category: "design",
      tags: ["CFD", "aerodynamics", "simulation"],
      externalUrl: "https://www.youtube.com/watch?v=example2",
      uploadDate: "February 10, 2025"
    },
    {
      id: 8,
      title: "Team Project Management Template",
      description: "Gantt chart template for planning and tracking your team's progress throughout the competition cycle.",
      type: "template",
      category: "project management",
      tags: ["planning", "team management", "scheduling"],
      downloadUrl: "#",
      fileSize: "1.2 MB",
      fileType: "XLSX",
      uploadDate: "March 1, 2025"
    },
    {
      id: 9,
      title: "Basic FEA Tutorial for Competition Vehicles",
      description: "Step-by-step guide to performing Finite Element Analysis on critical vehicle components.",
      type: "course",
      category: "technical",
      tags: ["FEA", "simulation", "structural analysis"],
      externalUrl: "https://www.sae.org/learn/courses/example",
      uploadDate: "March 10, 2025"
    }
  ];

  // Categories for filtering
  const categories = [
    { id: "all", label: "All Resources" },
    { id: "technical", label: "Technical Guides" },
    { id: "design", label: "Design Resources" },
    { id: "project management", label: "Project Management" }
  ];

  // Filter resources based on search and category
  const filteredResources = resources.filter(resource => {
    const matchesSearch = searchQuery.trim() === "" ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Group resources by type for the tabs
  const documents = filteredResources.filter(resource => resource.type === "document");
  const templates = filteredResources.filter(resource => resource.type === "template");
  const videos = filteredResources.filter(resource => resource.type === "video" || resource.type === "course");

  // Featured resources
  const featuredResources = resources.filter(resource => resource.featured);

  const getTypeIcon = (type: string) => {
    switch(type) {
      case "document":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "video":
        return <Video className="h-5 w-5 text-red-500" />;
      case "template":
        return <FileSpreadsheet className="h-5 w-5 text-green-500" />;
      case "course":
        return <GraduationCap className="h-5 w-5 text-purple-500" />;
      default:
        return <FolderOpen className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Learning Resources</h2>
          <p className="text-muted-foreground">
            Access guides, templates, videos, and learning materials for your SAE projects
          </p>
        </div>

        <Link href="https://www.sae.org/learn" target="_blank">
          <Button variant="outline">
            <ExternalLink className="mr-2 h-4 w-4" />
            SAE Learning Hub
          </Button>
        </Link>
      </div>

      {/* Search and filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search resources by title, description, or tags..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Featured resources */}
      {searchQuery === "" && selectedCategory === "all" && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Featured Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredResources.map(resource => (
              <Card key={resource.id} className="sae-card-hover overflow-hidden">
                {resource.thumbnail && (
                  <div className="relative h-40 w-full">
                    <Image
                      src={resource.thumbnail}
                      alt={resource.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
                      Featured
                    </Badge>
                  </div>
                )}
                <CardHeader className={resource.thumbnail ? "pt-3" : ""}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(resource.type)}
                      <CardTitle className="text-base">{resource.title}</CardTitle>
                    </div>
                    <Star className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                  </div>
                  <CardDescription className="line-clamp-2">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="text-xs text-muted-foreground">
                    {resource.fileType && resource.fileSize && (
                      <span>{resource.fileType} • {resource.fileSize}</span>
                    )}
                    {!resource.fileType && (
                      <span>{resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</span>
                    )}
                  </div>
                  {resource.downloadUrl && (
                    <Button size="sm" asChild>
                      <Link href={resource.downloadUrl}>
                        <Download className="mr-1 h-3 w-3" />
                        Download
                      </Link>
                    </Button>
                  )}
                  {resource.externalUrl && (
                    <Button size="sm" variant="outline" asChild>
                      <Link href={resource.externalUrl} target="_blank">
                        <ExternalLink className="mr-1 h-3 w-3" />
                        View
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>

          <Separator className="my-6" />
        </div>
      )}

      {/* All resources */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="documents">Guides & Documents</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="videos">Videos & Courses</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {filteredResources.length === 0 ? (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <FolderOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-40" />
              <h3 className="text-lg font-medium mb-2">No resources found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map(resource => (
                <Card key={resource.id} className="sae-card-hover">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 mb-1">
                      {getTypeIcon(resource.type)}
                      <CardTitle className="text-base">{resource.title}</CardTitle>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {resource.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{resource.uploadDate}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <div className="text-xs text-muted-foreground">
                      {resource.fileType && resource.fileSize && (
                        <span>{resource.fileType} • {resource.fileSize}</span>
                      )}
                      {!resource.fileType && (
                        <span>{resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</span>
                      )}
                    </div>
                    {resource.downloadUrl && (
                      <Button size="sm" asChild>
                        <Link href={resource.downloadUrl}>
                          <Download className="mr-1 h-3 w-3" />
                          Download
                        </Link>
                      </Button>
                    )}
                    {resource.externalUrl && (
                      <Button size="sm" variant="outline" asChild>
                        <Link href={resource.externalUrl} target="_blank">
                          <ExternalLink className="mr-1 h-3 w-3" />
                          View
                        </Link>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-muted/30 rounded-lg">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-40" />
                <h3 className="text-lg font-medium mb-2">No documents found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            ) : (
              documents.map(resource => (
                <Card key={resource.id} className="sae-card-hover">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <CardTitle className="text-base">{resource.title}</CardTitle>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {resource.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{resource.uploadDate}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <div className="text-xs text-muted-foreground">
                      {resource.fileType} • {resource.fileSize}
                    </div>
                    <Button size="sm" asChild>
                      <Link href={resource.downloadUrl || "#"}>
                        <Download className="mr-1 h-3 w-3" />
                        Download
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-muted/30 rounded-lg">
                <FileSpreadsheet className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-40" />
                <h3 className="text-lg font-medium mb-2">No templates found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            ) : (
              templates.map(resource => (
                <Card key={resource.id} className="sae-card-hover">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <FileSpreadsheet className="h-5 w-5 text-green-500" />
                      <CardTitle className="text-base">{resource.title}</CardTitle>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {resource.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{resource.uploadDate}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <div className="text-xs text-muted-foreground">
                      {resource.fileType} • {resource.fileSize}
                    </div>
                    <Button size="sm" asChild>
                      <Link href={resource.downloadUrl || "#"}>
                        <Download className="mr-1 h-3 w-3" />
                        Download
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-muted/30 rounded-lg">
                <Video className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-40" />
                <h3 className="text-lg font-medium mb-2">No videos or courses found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            ) : (
              videos.map(resource => (
                <Card key={resource.id} className="sae-card-hover">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 mb-1">
                      {resource.type === "video" ? (
                        <Video className="h-5 w-5 text-red-500" />
                      ) : (
                        <GraduationCap className="h-5 w-5 text-purple-500" />
                      )}
                      <CardTitle className="text-base">{resource.title}</CardTitle>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {resource.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{resource.uploadDate}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <div className="text-xs text-muted-foreground">
                      {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={resource.externalUrl || "#"} target="_blank">
                        <ExternalLink className="mr-1 h-3 w-3" />
                        View
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
