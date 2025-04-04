"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronDown,
  UploadCloud,
  File,
  X,
  CheckCircle,
  Calendar,
  Lightbulb,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface UploadedFile {
  id: number;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: "uploading" | "complete" | "error";
  url?: string;
}

export default function CreateSubmissionPage() {
  const [selectedCompetition, setSelectedCompetition] = useState("BAJA SAE 2025");
  const [selectedTeam, setSelectedTeam] = useState("Team Invincible");
  const [submissionTitle, setSubmissionTitle] = useState("");
  const [submissionDescription, setSubmissionDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock deadlines for the selected competition
  const deadlines = [
    {
      id: 1,
      title: "Technical Report",
      due: "April 15, 2025",
      status: "active",
      requiredFiles: ["PDF", "DOCX"],
      maxSize: 20, // in MB
    },
    {
      id: 2,
      title: "CAD Models",
      due: "April 30, 2025",
      status: "upcoming",
      requiredFiles: ["STEP", "STP", "SLDPRT", "ZIP"],
      maxSize: 100, // in MB
    },
    {
      id: 3,
      title: "Cost Report",
      due: "May 15, 2025",
      status: "upcoming",
      requiredFiles: ["PDF", "XLSX"],
      maxSize: 10, // in MB
    }
  ];

  const [selectedDeadline, setSelectedDeadline] = useState(deadlines[0]);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
  };

  const validateFile = (file: File) => {
    // Check file size
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > selectedDeadline.maxSize) {
      return `File size exceeds the maximum allowed (${selectedDeadline.maxSize} MB)`;
    }

    // Check file type
    const fileExtension = file.name.split('.').pop()?.toUpperCase() || '';
    if (!selectedDeadline.requiredFiles.includes(fileExtension)) {
      return `File type not allowed. Accepted formats: ${selectedDeadline.requiredFiles.join(', ')}`;
    }

    return null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Process each file
    Array.from(files).forEach(file => {
      // Validate the file
      const error = validateFile(file);
      if (error) {
        // Show error notification
        alert(error);
        return;
      }

      // Create a new file object
      const newFile: UploadedFile = {
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: "uploading"
      };

      // Add to the list
      setUploadedFiles(prev => [...prev, newFile]);

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress <= 100) {
          setUploadedFiles(prev => prev.map(f =>
            f.id === newFile.id ? {...f, progress} : f
          ));
        } else {
          clearInterval(interval);
          setUploadedFiles(prev => prev.map(f =>
            f.id === newFile.id ? {...f, status: "complete", progress: 100} : f
          ));
        }
      }, 300);
    });

    // Reset the file input
    e.target.value = '';
  };

  const handleRemoveFile = (id: number) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!submissionTitle.trim()) {
      newErrors.title = "Please enter a submission title";
    }

    if (!submissionDescription.trim()) {
      newErrors.description = "Please enter a submission description";
    }

    if (uploadedFiles.length === 0) {
      newErrors.files = "Please upload at least one file";
    } else {
      // Check if all files are uploaded successfully
      const uploadingFiles = uploadedFiles.filter(file => file.status === "uploading");
      if (uploadingFiles.length > 0) {
        newErrors.files = "Please wait for all files to finish uploading";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/student/team">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h2 className="text-2xl font-bold tracking-tight">Create Submission</h2>
        </div>

        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="text-center pb-2">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-2" />
            <CardTitle className="text-xl">Submission Complete!</CardTitle>
            <CardDescription>
              Your competition submission has been successfully received
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-background rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4">Submission Details</h3>
              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <div className="text-muted-foreground">Submission ID:</div>
                <div className="font-medium">SUB-{Math.floor(100000 + Math.random() * 900000)}</div>

                <div className="text-muted-foreground">Competition:</div>
                <div className="font-medium">{selectedCompetition}</div>

                <div className="text-muted-foreground">Team:</div>
                <div className="font-medium">{selectedTeam}</div>

                <div className="text-muted-foreground">Submission Type:</div>
                <div className="font-medium">{selectedDeadline.title}</div>

                <div className="text-muted-foreground">Date Submitted:</div>
                <div className="font-medium">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>

                <div className="text-muted-foreground">Status:</div>
                <div className="text-primary font-medium">Under Review</div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-medium">What's Next?</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-1" />
                  <span>Your submission will be reviewed by the competition judges.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-1" />
                  <span>You will receive feedback within 7-10 working days.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-1" />
                  <span>You can view the status of your submission in the "My Submissions" section.</span>
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button className="w-full" asChild>
              <Link href="/dashboard/student/submissions">
                View My Submissions
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/student/team">
                Return to Team Dashboard
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/student/team">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-2xl font-bold tracking-tight">Create Submission</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Submission Form */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Submission Details</CardTitle>
                <CardDescription>
                  Enter the details for your competition submission
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Competition</label>
                  <div className="relative">
                    <select
                      value={selectedCompetition}
                      onChange={(e) => setSelectedCompetition(e.target.value)}
                      className="w-full p-2 pr-8 border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="BAJA SAE 2025">BAJA SAE 2025</option>
                      <option value="Drone Design Challenge 2025">Drone Design Challenge 2025</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Team</label>
                  <div className="relative">
                    <select
                      value={selectedTeam}
                      onChange={(e) => setSelectedTeam(e.target.value)}
                      className="w-full p-2 pr-8 border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="Team Invincible">Team Invincible</option>
                      <option value="Aero Innovators">Aero Innovators</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Submission Type</label>
                  <div className="relative">
                    <select
                      value={selectedDeadline.id}
                      onChange={(e) => setSelectedDeadline(deadlines.find(d => d.id === Number(e.target.value)) || deadlines[0])}
                      className="w-full p-2 pr-8 border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {deadlines.map(deadline => (
                        <option key={deadline.id} value={deadline.id}>
                          {deadline.title} (Due: {deadline.due})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Submission Title *</label>
                  <Input
                    value={submissionTitle}
                    onChange={(e) => setSubmissionTitle(e.target.value)}
                    placeholder="Enter a clear title for your submission"
                    className={errors.title ? "border-destructive" : ""}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">{errors.title}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description *</label>
                  <textarea
                    value={submissionDescription}
                    onChange={(e) => setSubmissionDescription(e.target.value)}
                    placeholder="Provide a brief description of your submission"
                    rows={4}
                    className={`w-full p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary ${errors.description ? "border-destructive" : ""}`}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive">{errors.description}</p>
                  )}
                </div>

                <Separator />

                <div className="space-y-2">
                  <label className="text-sm font-medium">Upload Files *</label>
                  <div className={`border-2 border-dashed rounded-lg p-6 text-center ${errors.files ? "border-destructive" : "border-muted-foreground/20"}`}>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      multiple
                      className="hidden"
                    />
                    <UploadCloud className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm font-medium mb-1">Drag and drop files here, or click to browse</p>
                    <p className="text-xs text-muted-foreground mb-3">
                      Allowed formats: {selectedDeadline.requiredFiles.join(', ')} - Max {selectedDeadline.maxSize} MB per file
                    </p>
                    <Button type="button" variant="outline" onClick={handleFileClick}>
                      Select Files
                    </Button>
                    {errors.files && (
                      <p className="text-sm text-destructive mt-2">{errors.files}</p>
                    )}
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="space-y-3 mt-4">
                      <h3 className="text-sm font-medium">Uploaded Files</h3>
                      {uploadedFiles.map(file => (
                        <div key={file.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                          <div className="flex items-center gap-3">
                            <File className="h-6 w-6 text-primary" />
                            <div>
                              <p className="text-sm font-medium">{file.name}</p>
                              <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {file.status === "uploading" ? (
                              <div className="flex items-center gap-2">
                                <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-primary transition-all duration-300"
                                    style={{ width: `${file.progress}%` }}
                                  />
                                </div>
                                <span className="text-xs text-muted-foreground">{file.progress}%</span>
                              </div>
                            ) : file.status === "complete" ? (
                              <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 border-green-300">
                                Uploaded
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100 border-red-300">
                                Error
                              </Badge>
                            )}
                            <Button size="sm" variant="ghost" onClick={() => handleRemoveFile(file.id)}>
                              <X className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t px-6 py-4">
                <Button variant="outline" type="button" asChild>
                  <Link href="/dashboard/student/team">Cancel</Link>
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Entry"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>

        {/* Guidelines and Instructions */}
        <div className="md:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Submission Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-1">Deadline</h3>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedDeadline.due}</span>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium mb-2">Required Files</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedDeadline.requiredFiles.map(format => (
                    <Badge key={format} variant="outline">{format}</Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium mb-2">Tips</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-primary mt-1" />
                    <span className="text-sm">Ensure all files follow the naming convention: TeamName_DocumentType_Date</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-primary mt-1" />
                    <span className="text-sm">Make sure all CAD files are exported in the correct format</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-primary mt-1" />
                    <span className="text-sm">Compress large files to optimize upload time</span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-amber-800">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">Important Note</h4>
                    <p className="text-xs mt-1">Once submitted, you cannot edit your submission. Make sure all files are correct before submitting.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                If you encounter any issues with your submission, please contact the competition coordinators.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/student/support">
                  Contact Support
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
