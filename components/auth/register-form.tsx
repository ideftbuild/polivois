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
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) {
        setError(error.message);
      } else {
        window.location.href = "/dashboard";
      }
    } catch (error) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-[#100418] border-[#5a4252] shadow-2xl relative z-10 overflow-hidden rounded-2xl">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#5a4252] via-[#a79494] to-[#5a4252]"></div>
      <CardHeader className="space-y-3 pb-6 pt-8">
        <CardTitle className="text-2xl font-bold text-white tracking-tight">
          Create Account
        </CardTitle>
        <CardDescription className="text-[#a79494] text-base">
          Sign up to start creating and participating in polls
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-5">
          <div className="space-y-2.5">
            <Label htmlFor="name" className="text-[#a79494] font-medium">
              Full Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              className="bg-[#0d0107] border-[#5a4252] text-white placeholder:text-[#a79494]/50 focus-visible:ring-[#5a4252] focus-visible:border-[#5a4252] rounded-xl h-12"
              required
            />
          </div>
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
            <Label htmlFor="password" className="text-[#a79494] font-medium">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="bg-[#0d0107] border-[#5a4252] text-white placeholder:text-[#a79494]/50 focus-visible:ring-[#5a4252] focus-visible:border-[#5a4252] rounded-xl h-12"
              required
            />
          </div>
          <div className="space-y-2.5">
            <Label
              htmlFor="confirmPassword"
              className="text-[#a79494] font-medium"
            >
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
