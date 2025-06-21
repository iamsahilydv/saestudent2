import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowRight,
  Calendar,
  Clock,
  Star,
  Trophy,
  User,
  Users,
  Clock3,
  FileText,
  Medal,
  Gift,
  Target,
  Zap,
  Crown,
  Award,
  BookOpen,
  TrendingUp,
  Coins,
} from "lucide-react";

export default function DashboardPage() {
  // Current user data
  const currentUser = {
    rank: 12,
    name: "You",
    avatar: "/avatars/current-user.jpg",
    points: 1850,
    badge: "Intermediate",
    competitions: 4,
    wins: 1,
  };

  // Leaderboard data
  const leaderboardData = [
    {
      rank: 1,
      name: "Arjun Sharma",
      avatar: "/avatars/arjun.jpg",
      points: 2850,
      badge: "Champion",
      competitions: 8,
      wins: 5,
    },
    {
      rank: 2,
      name: "Priya Patel",
      avatar: "/avatars/priya.jpg",
      points: 2720,
      badge: "Expert",
      competitions: 7,
      wins: 4,
    },
    {
      rank: 3,
      name: "Rohit Kumar",
      avatar: "/avatars/rohit.jpg",
      points: 2680,
      badge: "Expert",
      competitions: 6,
      wins: 3,
    },
    {
      rank: 4,
      name: "Sneha Reddy",
      avatar: "/avatars/sneha.jpg",
      points: 2450,
      badge: "Advanced",
      competitions: 5,
      wins: 2,
    },
    {
      rank: 5,
      name: "Vikram Singh",
      avatar: "/avatars/vikram.jpg",
      points: 2380,
      badge: "Advanced",
      competitions: 6,
      wins: 2,
    },
    {
      rank: 11,
      name: "Rahul Gupta",
      avatar: "/avatars/rahul.jpg",
      points: 1920,
      badge: "Intermediate",
      competitions: 4,
      wins: 1,
    },
    // Current user position
    currentUser,
    {
      rank: 13,
      name: "Anita Verma",
      avatar: "/avatars/anita.jpg",
      points: 1780,
      badge: "Intermediate",
      competitions: 3,
      wins: 1,
    },
  ];

  // User's achievements/awards
  const achievements = [
    {
      id: 1,
      title: "BAJA SAE Winner 2024",
      description: "First place in BAJA SAE India competition",
      icon: <Trophy className="h-6 w-6 text-yellow-500" />,
      date: "March 2024",
      points: 500,
      category: "Competition",
    },
    {
      id: 2,
      title: "Innovation Excellence",
      description: "Best innovative design in Electric Vehicle Challenge",
      icon: <Zap className="h-6 w-6 text-blue-500" />,
      date: "February 2024",
      points: 300,
      category: "Innovation",
    },
    {
      id: 3,
      title: "Team Leadership",
      description: "Outstanding team leadership in Drone Competition",
      icon: <Crown className="h-6 w-6 text-purple-500" />,
      date: "January 2024",
      points: 250,
      category: "Leadership",
    },
    {
      id: 4,
      title: "Workshop Completion",
      description: "Completed 10+ technical workshops",
      icon: <BookOpen className="h-6 w-6 text-green-500" />,
      date: "December 2023",
      points: 200,
      category: "Learning",
    },
  ];

  // Available rewards
  const rewards = [
    {
      id: 1,
      title: "Premium Workshop Access",
      description: "Unlock access to exclusive advanced workshops",
      cost: 500,
      icon: <BookOpen className="h-6 w-6 text-blue-500" />,
      available: true,
    },
    {
      id: 2,
      title: "Mentorship Session",
      description: "One-on-one session with industry expert",
      cost: 800,
      icon: <User className="h-6 w-6 text-purple-500" />,
      available: true,
    },
    {
      id: 3,
      title: "SAE Merchandise Kit",
      description: "Official SAE branded merchandise package",
      cost: 300,
      icon: <Gift className="h-6 w-6 text-red-500" />,
      available: true,
    },
    {
      id: 4,
      title: "Competition Fee Waiver",
      description: "Waive registration fee for next competition",
      cost: 1000,
      icon: <Medal className="h-6 w-6 text-gold-500" />,
      available: false,
    },
  ];

  // Upcoming events mock data
  const upcomingEvents = [
    {
      id: 1,
      title: "BAJA SAE Design Phase",
      date: "April 15, 2025",
      time: "Submission Deadline: 11:59 PM",
      status: "Registered",
      priority: "high",
      type: "competition",
      image: "/images/baja-sae.jpg",
    },
    {
      id: 2,
      title: "Drone Design Workshop",
      date: "April 10, 2025",
      time: "10:00 AM - 2:00 PM",
      status: "Registered",
      priority: "medium",
      type: "workshop",
      image: "/images/drone-workshop.jpg",
    },
  ];

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      action: "Earned 250 points for",
      target: "Team Leadership Award",
      time: "2 hours ago",
      icon: <Crown className="h-4 w-4" />,
      points: "+250",
    },
    {
      id: 2,
      action: "Completed",
      target: "Electric Drivetrain Workshop",
      time: "1 day ago",
      icon: <BookOpen className="h-4 w-4" />,
      points: "+100",
    },
    {
      id: 3,
      action: "Submitted",
      target: "BAJA SAE Preliminary Design",
      time: "2 days ago",
      icon: <FileText className="h-4 w-4" />,
      points: "+150",
    },
    {
      id: 4,
      action: "Joined team",
      target: "Aero Innovators",
      time: "1 week ago",
      icon: <Users className="h-4 w-4" />,
      points: "+50",
    },
  ];

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Champion":
        return "bg-yellow-500 text-white";
      case "Expert":
        return "bg-blue-500 text-white";
      case "Advanced":
        return "bg-green-500 text-white";
      case "Intermediate":
        return "bg-orange-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getPointsToNextRank = (currentRank: number) => {
    const nextRankStudent = leaderboardData.find(
      (student) => student.rank === currentRank - 1
    );
    if (nextRankStudent) {
      return nextRankStudent.points - currentUser.points;
    }
    return 0;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Student Portal</h2>
          <p className="text-muted-foreground">
            Welcome back! Track your progress, compete with peers, and earn
            rewards.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/profile">My Profile</Link>
          </Button>
          <Button asChild>
            <Link href="/competitions">Browse Events</Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="sae-card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <Coins className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">1,850</div>
            <p className="text-xs text-muted-foreground">+250 this week</p>
          </CardContent>
        </Card>
        <Card className="sae-card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Current Rank</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">#12</div>
            <p className="text-xs text-muted-foreground">↑ 3 positions</p>
          </CardContent>
        </Card>
        <Card className="sae-card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Events</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 competitions</p>
          </CardContent>
        </Card>
        <Card className="sae-card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Awards Won</CardTitle>
            <Trophy className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">This academic year</p>
          </CardContent>
        </Card>
        <Card className="sae-card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Completion Rate
            </CardTitle>
            <Target className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">Events completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <div className="grid gap-4 md:grid-cols-7">
        <div className="col-span-7 md:col-span-4">
          <Tabs defaultValue="leaderboard">
            <div className="flex items-center justify-between">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                <TabsTrigger value="achievements">Awards</TabsTrigger>
                <TabsTrigger value="rewards">Rewards</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
              </TabsList>
            </div>

            {/* Leaderboard Tab */}
            <TabsContent value="leaderboard" className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Top Performers</h3>
                <Badge variant="secondary">Monthly Rankings</Badge>
              </div>

              {/* Current User Position Card */}
              <Card className="sae-card-hover border-2 border-primary/50 bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">
                          #{currentUser.rank}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          YOU
                        </Badge>
                      </div>
                      <Avatar className="h-12 w-12 border-2 border-primary">
                        <AvatarImage
                          src={currentUser.avatar}
                          alt="Your Avatar"
                        />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          YOU
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">Your Position</h4>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={getBadgeColor(currentUser.badge)}
                            variant="secondary"
                          >
                            {currentUser.badge}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {currentUser.competitions} events •{" "}
                            {currentUser.wins} wins
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {currentUser.points}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        points
                      </div>
                      {getPointsToNextRank(currentUser.rank) > 0 && (
                        <div className="text-xs text-orange-600 mt-1">
                          {getPointsToNextRank(currentUser.rank)} points to rank
                          #{currentUser.rank - 1}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {leaderboardData
                .filter((student) => student !== currentUser)
                .map((student, index) => (
                  <Card
                    key={student.rank}
                    className={`sae-card-hover ${
                      index < 3 ? "border-2 border-yellow-200" : ""
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-2xl font-bold ${
                                index === 0
                                  ? "text-yellow-500"
                                  : index === 1
                                  ? "text-gray-400"
                                  : index === 2
                                  ? "text-amber-600"
                                  : "text-muted-foreground"
                              }`}
                            >
                              #{student.rank}
                            </span>
                            {index < 3 && (
                              <Crown
                                className={`h-6 w-6 ${
                                  index === 0
                                    ? "text-yellow-500"
                                    : index === 1
                                    ? "text-gray-400"
                                    : "text-amber-600"
                                }`}
                              />
                            )}
                          </div>
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={student.avatar}
                              alt={student.name}
                            />
                            <AvatarFallback>
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{student.name}</h4>
                            <div className="flex items-center gap-2">
                              <Badge
                                className={getBadgeColor(student.badge)}
                                variant="secondary"
                              >
                                {student.badge}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {student.competitions} events • {student.wins}{" "}
                                wins
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            {student.points}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            points
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Your Achievements</h3>
                <Badge variant="secondary">
                  Total: {achievements.reduce((sum, a) => sum + a.points, 0)}{" "}
                  points
                </Badge>
              </div>
              {achievements.map((achievement) => (
                <Card key={achievement.id} className="sae-card-hover">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-background p-3 border">
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">
                            {achievement.title}
                          </h4>
                          <p className="text-muted-foreground mb-2">
                            {achievement.description}
                          </p>
                          <div className="flex items-center gap-4">
                            <Badge variant="outline">
                              {achievement.category}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {achievement.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          +{achievement.points}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          points
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Rewards Tab */}
            <TabsContent value="rewards" className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Redeem Rewards</h3>
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4 text-yellow-500" />
                  <span className="font-semibold">1,850 points available</span>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {rewards.map((reward) => (
                  <Card
                    key={reward.id}
                    className={`sae-card-hover ${
                      !reward.available ? "opacity-60" : ""
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-background p-3 border">
                          {reward.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{reward.title}</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            {reward.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Coins className="h-4 w-4 text-yellow-500" />
                              <span className="font-semibold">
                                {reward.cost} points
                              </span>
                            </div>
                            <Button
                              size="sm"
                              disabled={!reward.available || reward.cost > 1850}
                              variant={
                                reward.available && reward.cost <= 1850
                                  ? "default"
                                  : "outline"
                              }
                            >
                              {reward.available
                                ? reward.cost <= 1850
                                  ? "Redeem"
                                  : "Insufficient Points"
                                : "Coming Soon"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events" className="space-y-4 mt-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden sae-card-hover">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full h-48 md:w-1/3 md:h-auto">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold mb-1">
                            {event.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                            <Clock className="h-4 w-4" />
                            <span>{event.time}</span>
                          </div>
                        </div>
                        <Badge
                          variant={
                            event.status === "Registered"
                              ? "default"
                              : "outline"
                          }
                          className={
                            event.priority === "high"
                              ? "bg-accent text-accent-foreground"
                              : ""
                          }
                        >
                          {event.status}
                        </Badge>
                      </div>
                      <div className="flex justify-end mt-4">
                        <Button variant="outline" size="sm" className="mr-2">
                          Details
                        </Button>
                        <Button size="sm">
                          {event.type === "competition"
                            ? "Submit Work"
                            : "Join Event"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Recent Activity Sidebar */}
        <div className="col-span-7 md:col-span-3">
          <Card className="h-full sae-card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Your latest achievements and activities
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 border-b pb-4 last:border-0"
                  >
                    <div className="rounded-full bg-primary/10 p-2">
                      {activity.icon}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {activity.action}{" "}
                        <span className="font-bold">{activity.target}</span>
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                          {activity.time}
                        </p>
                        {activity.points && (
                          <Badge variant="secondary" className="text-xs">
                            {activity.points}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View All Activity
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Progress Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Your Progress</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="sae-card-hover">
            <CardHeader className="pb-3">
              <CardTitle className="text-md flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-500" />
                Skill Development
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Technical Skills</span>
                  <span>85%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Leadership</span>
                  <span>72%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "72%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Innovation</span>
                  <span>68%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: "68%" }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="sae-card-hover">
            <CardHeader className="pb-3">
              <CardTitle className="text-md flex items-center gap-2">
                <Target className="h-5 w-5 text-green-500" />
                Monthly Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Complete 3 Workshops</span>
                  <span>2/3</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full"
                    style={{ width: "67%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Earn 500 Points</span>
                  <span>350/500</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: "70%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Submit 2 Projects</span>
                  <span>1/2</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: "50%" }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
