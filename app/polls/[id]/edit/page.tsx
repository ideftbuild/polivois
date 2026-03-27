"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { updatePoll } from "@/app/actions/poll";
import { usePollStore } from "@/store/usePollStore";

export default function EditPollPage() {
  const params = useParams();
  const router = useRouter();
  const pollId = params?.id as string;

  const { getPoll, isLoading: isStoreLoading } = usePollStore();
  const poll = getPoll(pollId);

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: poll?.title || "",
    description: poll?.description || "",
    expiresAt: (() => {
      if (poll?.expiresAt) {
        const date = new Date(poll.expiresAt);
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return date.toISOString().slice(0, 16);
      }
      return "";
    })(),
  });

  useEffect(() => {
    if (poll) {
      let formattedDate = "";
      if (poll.expiresAt) {
        const date = new Date(poll.expiresAt);
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        formattedDate = date.toISOString().slice(0, 16);
      }
      setFormData({
        title: poll.title,
        description: poll.description || "",
        expiresAt: formattedDate,
      });
    }
  }, [poll]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError("Poll title is required");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const updateData = {
        title: formData.title,
        description: formData.description || undefined,
        expiresAt: formData.expiresAt
          ? new Date(formData.expiresAt)
          : undefined,
      };

      const result = await updatePoll(pollId, updateData);

      if (result.success) {
        router.push(`/polls/${pollId}`);
      } else {
        setError(result.error || "Failed to update poll");
      }
    } catch (err) {
      console.error("Failed to update poll:", err);
      setError("An unexpected error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  if (isStoreLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-24 mb-6"></div>
            <Card>
              <CardHeader>
                <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  <div className="h-10 bg-gray-300 rounded w-full"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  <div className="h-10 bg-gray-300 rounded w-full"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/polls"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Polls
          </Link>
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <h3 className="text-lg font-semibold mb-2">
                {error || "Poll not found"}
              </h3>
              <p className="text-muted-foreground mb-4">
                The poll you are trying to edit could not be found.
              </p>
              <Link href="/polls">
                <Button>Browse All Polls</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Link
          href={`/polls/${pollId}`}
          className="inline-flex items-center text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Poll
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Edit Poll</CardTitle>
            <CardDescription>
              Update the details of your poll. Note that options cannot be
              changed once a poll is created.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {error && (
                <div className="p-3 text-sm bg-red-100 border border-red-200 text-red-600 rounded-md">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="title">Poll Question *</Label>
                <Input
                  id="title"
                  placeholder="What's your poll question?"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  disabled={isSaving}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  placeholder="Add more context to your poll..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  disabled={isSaving}
                />
              </div>

              <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium text-sm">Poll Settings</h4>
                <div className="space-y-2">
                  <Label htmlFor="expiresAt">Poll Expiry (Optional)</Label>
                  <Input
                    id="expiresAt"
                    type="datetime-local"
                    value={formData.expiresAt}
                    onChange={(e) =>
                      setFormData({ ...formData, expiresAt: e.target.value })
                    }
                    disabled={isSaving}
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave empty for no expiry date
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-4">
                <Link href={`/polls/${pollId}`}>
                  <Button type="button" variant="outline" disabled={isSaving}>
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={isSaving || !formData.title.trim()}
                >
                  {isSaving ? "Saving Changes..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
}
