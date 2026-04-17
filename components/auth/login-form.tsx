"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      console.log("loggin user in: ", email, password);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log("Done!");

      if (error) {
        setError(error.message);
        console.log("An error occured: ", error.message);
      } else {
        console.log("No error redirecting to dashboard");
        window.location.href = "/dashboard";
      }
    } catch (error) {
      setError("An unexpected error occurred.");
      if (error instanceof Error) {
        console.log("an error occurred unexpectedly: ", error.message);
      }
    } finally {
      setIsLoading(false);
      console.log("stopping everything");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-[#100418] border-[#5a4252] shadow-2xl relative z-10 overflow-hidden rounded-2xl">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#5a4252] via-[#a79494] to-[#5a4252]"></div>
      <CardHeader className="space-y-3 pb-6 pt-8">
        <CardTitle className="text-2xl font-bold text-white tracking-tight">
          Login
        </CardTitle>
        <CardDescription className="text-[#a79494] text-base">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-5">
          <div className="space-y-2.5">
            <Label htmlFor="email" className="text-[#a79494] font-medium">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="bg-[#0d0107] border-[#5a4252] text-white placeholder:text-[#a79494]/50 focus-visible:ring-[#5a4252] focus-visible:border-[#5a4252] rounded-xl h-12"
              required
            />
          </div>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-[#a79494] font-medium">
                Password
              </Label>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="bg-[#0d0107] border-[#5a4252] text-white placeholder:text-[#a79494]/50 focus-visible:ring-[#5a4252] focus-visible:border-[#5a4252] rounded-xl h-12"
              required
            />
          </div>
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium flex items-center">
              <span className="mr-2">⚠</span> {error}
            </div>
          )}
        </CardContent>
        <CardFooter className="pb-8 pt-2">
          <Button
            type="submit"
            className="w-full h-12 rounded-xl bg-[#5a4252] hover:bg-[#a79494] text-white hover:text-[#0d0107] transition-all duration-300 font-bold text-base shadow-lg shadow-[#5a4252]/25"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
