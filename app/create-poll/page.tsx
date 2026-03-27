"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CreatePollForm } from "@/components/polls/create-poll-form";
import { Button } from "@/components/ui/button";
import { createPoll } from "@/app/actions/poll";
import { CreatePollData } from "@/types";
import { ArrowLeft, Lightbulb } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CreatePollPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCreatePoll = async (data: CreatePollData) => {
    setIsLoading(true);

    try {
      const result = await createPoll(data);

      if (!result.success) {
        throw new Error(result.error || "Failed to create poll");
      }

      router.push("/polls");
    } catch (error: any) {
      console.error("Failed to create poll:", error);
      alert(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/polls"
            className="inline-flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Polls
          </Link>
        </div>

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Create a New Poll
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Create engaging polls to gather opinions and make decisions with
            your community. Your poll will be visible to all users once
            published.
          </p>
        </div>

        {/* Tips Card */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 dark:from-blue-900 dark:to-indigo-950 dark:text-blue-200 dark:text-blue-200 text-blue-800">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-blue-500" />
              <CardTitle className="text-lg text-blue-800 dark:text-blue-400">
                Tips for Creating Great Polls
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Make your question clear and specific</li>
              <li>Provide balanced and comprehensive options</li>
              <li>Keep options concise and easy to understand</li>
              <li>Consider if multiple votes make sense for your question</li>
              <li>Set an appropriate expiry date if needed</li>
            </ul>
          </CardContent>
        </Card>

        {/* Poll Creation Form */}
        <CreatePollForm onSubmit={handleCreatePoll} isLoading={isLoading} />

        {/* Footer Actions */}
        <div className="text-center space-y-4 pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            Need inspiration? Check out other polls to see what the community is
            discussing.
          </p>
          <div className="flex justify-center space-x-3">
            <Link href="/polls">
              <Button variant="outline">Browse Existing Polls</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline">View My Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
