"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PollCard } from "@/components/polls/poll-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Poll, User } from "@/types";
import {
  Plus,
  TrendingUp,
  Users,
  Vote,
  Calendar,
  BarChart3,
  Eye,
  Edit,
} from "lucide-react";
import { isPollActive, getPollTotalVotes } from "@/lib/poll-utils";
import { usePollStore } from "@/store/usePollStore";
import { useUserStore } from "@/store/useUserStore";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { user } = useUserStore();
  const { getUserPolls, isLoading } = usePollStore();
  const userPolls = user ? getUserPolls(user.id) : [];

  const [activeTab, setActiveTab] = useState<"all" | "active" | "expired">(
    "all",
  );

  const getFilteredPolls = () => {
    switch (activeTab) {
      case "active":
        return userPolls.filter((poll) => isPollActive(poll));
      case "expired":
        return userPolls.filter((poll) => !isPollActive(poll));
      default:
        return userPolls;
    }
  };

  const getStats = () => {
    const totalPolls = userPolls.length;
    const totalVotes = userPolls.reduce(
      (sum, poll) => sum + getPollTotalVotes(poll),
      0,
    );
    const activePolls = userPolls.filter((poll) => isPollActive(poll)).length;
    const avgVotesPerPoll =
      totalPolls > 0 ? Math.round(totalVotes / totalPolls) : 0;

    return { totalPolls, totalVotes, activePolls, avgVotesPerPoll };
  };

  const handlePollView = (pollId: string) => {
    window.location.href = `/polls/${pollId}`;
  };

  const stats = getStats();
  const filteredPolls = getFilteredPolls();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="pt-6">
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-gray-300 rounded w-1/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-300 rounded w-full"></div>
                    <div className="h-3 bg-gray-300 rounded w-full"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name || "User"}! Manage your polls and track
              their performance.
            </p>
          </div>
          <Link href="/create-poll">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create New Poll
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card className="h-full shadow-md hover:shadow-xl transition-shadow bg-card/50 backdrop-blur-sm border-primary/10">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  <div className="ml-2">
                    <p className="text-sm font-medium leading-none">
                      Total Polls
                    </p>
                    <p className="text-2xl font-bold">{stats.totalPolls}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card className="h-full shadow-md hover:shadow-xl transition-shadow bg-card/50 backdrop-blur-sm border-primary/10">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500" />
                  <div className="ml-2">
                    <p className="text-sm font-medium leading-none">
                      Active Polls
                    </p>
                    <p className="text-2xl font-bold">{stats.activePolls}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card className="h-full shadow-md hover:shadow-xl transition-shadow bg-card/50 backdrop-blur-sm border-primary/10">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <Vote className="h-4 w-4 text-muted-foreground" />
                  <div className="ml-2">
                    <p className="text-sm font-medium leading-none">
                      Total Votes
                    </p>
                    <p className="text-2xl font-bold">{stats.totalVotes}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card className="h-full shadow-md hover:shadow-xl transition-shadow bg-card/50 backdrop-blur-sm border-primary/10">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <div className="ml-2">
                    <p className="text-sm font-medium leading-none">
                      Avg. Votes/Poll
                    </p>
                    <p className="text-2xl font-bold">
                      {stats.avgVotesPerPoll}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity */}
        {userPolls.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <CardDescription>
                Quick overview of your most recent poll performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userPolls.slice(0, 3).map((poll, index) => (
                  <motion.div
                    key={poll.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:border-primary/30 hover:bg-primary/5 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex-1">
                      <h4 className="font-medium">{poll.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center space-x-1">
                          <Vote className="h-3 w-3" />
                          <span>{getPollTotalVotes(poll)} votes</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {new Date(poll.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <Badge
                          variant={isPollActive(poll) ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {isPollActive(poll) ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePollView(poll.id)}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* My Polls Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">My Polls</h2>
            <div className="flex space-x-1">
              <Button
                variant={activeTab === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab("all")}
              >
                All ({userPolls.length})
              </Button>
              <Button
                variant={activeTab === "active" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab("active")}
              >
                Active ({stats.activePolls})
              </Button>
              <Button
                variant={activeTab === "expired" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab("expired")}
              >
                Expired ({userPolls.length - stats.activePolls})
              </Button>
            </div>
          </div>

          {filteredPolls.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">
                    {activeTab === "all"
                      ? "No polls yet"
                      : `No ${activeTab} polls`}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {activeTab === "all"
                      ? "Create your first poll to get started!"
                      : `You don't have any ${activeTab} polls at the moment.`}
                  </p>
                  {activeTab === "all" && (
                    <Link href="/create-poll">
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Your First Poll
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredPolls.map((poll) => (
                <PollCard
                  key={poll.id}
                  poll={poll}
                  onView={() => handlePollView(poll.id)}
                  showResults={true}
                />
              ))}
            </motion.div>
          )}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
            <CardDescription>
              Common tasks you might want to perform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              <Link href="/create-poll">
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Poll
                </Button>
              </Link>
              <Link href="/polls">
                <Button variant="outline" className="w-full">
                  <Users className="h-4 w-4 mr-2" />
                  Browse All Polls
                </Button>
              </Link>
              <Button variant="outline" className="w-full">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
