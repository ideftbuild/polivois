"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PollCard } from "@/components/polls/poll-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Poll } from "@/types";
import { Search, Plus, Filter, TrendingUp } from "lucide-react";
import { isPollActive } from "@/lib/poll-utils";
import { usePollStore } from "@/store/usePollStore";
import { motion } from "framer-motion";

export default function PollsPage() {
  const { polls, isLoading } = usePollStore();
  const [filteredPolls, setFilteredPolls] = useState<Poll[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<
    "all" | "active" | "expired"
  >("all");

  // Filter and search polls
  useEffect(() => {
    let filtered = [...polls];

    // Apply status filter
    if (activeFilter === "active") {
      filtered = filtered.filter((poll) => isPollActive(poll));
    } else if (activeFilter === "expired") {
      filtered = filtered.filter((poll) => !isPollActive(poll));
    }

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (poll) =>
          poll.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          poll.description?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Sort by creation date (newest first)
    filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    setFilteredPolls(filtered);
  }, [polls, searchQuery, activeFilter]);

  const handlePollView = (pollId: string) => {
    // Navigate to poll detail page
    window.location.href = `/polls/${pollId}`;
  };

  const handlePollVote = (pollId: string) => {
    // Navigate to poll voting page
    window.location.href = `/polls/${pollId}`;
  };

  const getActivePolls = () => polls.filter((poll) => isPollActive(poll));

  const getExpiredPolls = () => polls.filter((poll) => !isPollActive(poll));

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0e213a] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#5a4252] rounded-full mix-blend-screen filter blur-[120px] opacity-20 pointer-events-none"></div>

        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
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
      {/* Header */}
      <motion.div
        className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold tracking-tight">All Polls</h1>
          <p className="text-muted-foreground">
            Discover and participate in polls from the community
          </p>
        </div>
        <Link href="/create-poll">
          <Button className="text-muted-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Create Poll
          </Button>
        </Link>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="grid gap-4 md:grid-cols-3 mb-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Card className="h-full shadow-md hover:shadow-xl transition-shadow bg-card/50 backdrop-blur-sm border-primary/80">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <div className="ml-2">
                  <p className="text-sm font-medium leading-none text-muted-foreground">
                    Total Polls
                  </p>
                  <p className="text-2xl font-bold">{polls.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Card className="h-full shadow-md hover:shadow-xl transition-shadow bg-card/50 backdrop-blur-sm border-primary/80">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-green-500" />
                <div className="ml-2">
                  <p className="text-sm font-medium leading-none text-muted-foreground">
                    Active Polls
                  </p>
                  <p className="text-2xl font-bold">
                    {getActivePolls().length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Card className="h-full shadow-md hover:shadow-xl transition-shadow bg-card/50 backdrop-blur-sm border-primary/80">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-gray-500" />
                <div className="ml-2">
                  <p className="text-sm font-medium leading-none text-muted-foreground">
                    Expired Polls
                  </p>
                  <p className="text-2xl font-bold">
                    {getExpiredPolls().length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        className="flex flex-col md:flex-row gap-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search polls by title, description, or creator..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <div className="flex space-x-1">
            <Button
              className="text-muted-foreground"
              variant={activeFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("all")}
            >
              All
            </Button>
            <Button
              variant={activeFilter === "active" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("active")}
            >
              Active
            </Button>
            <Button
              variant={activeFilter === "expired" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("expired")}
            >
              Expired
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Results count */}
      <motion.div
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <p className="text-sm text-muted-foreground">
          {filteredPolls.length === 0
            ? "No polls found"
            : filteredPolls.length === 1
              ? "1 poll found"
              : `${filteredPolls.length} polls found`}
        </p>
      </motion.div>

      {/* Polls Grid */}
      {filteredPolls.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-dashed border-2">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <div className="w-12 h-12 mx-auto mb-4 text-muted-foreground">
                  <Search className="w-full h-full" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No polls found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || activeFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "Be the first to create a poll!"}
                </p>
                {!searchQuery && activeFilter === "all" && (
                  <Link href="/create-poll">
                    <Button className="text-muted-foreground">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Poll
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {filteredPolls.map((poll) => (
            <motion.div
              key={poll.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PollCard
                key={poll.id}
                poll={poll}
                onView={() => handlePollView(poll.id)}
                onVote={() => handlePollVote(poll.id)}
                showResults={!isPollActive(poll)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
