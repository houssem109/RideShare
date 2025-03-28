"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { UserIcon, PhoneIcon, MailIcon, KeyIcon, SaveIcon, LockIcon } from "lucide-react";

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const supabase = createClient();

  useEffect(() => {
    async function loadUserProfile() {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          setUser(user);
          setEmail(user.email || "");
          setFirstName(user.user_metadata?.first_name || "");
          setLastName(user.user_metadata?.last_name || "");
          setPhone(user.user_metadata?.phone || "");
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setLoading(false);
      }
    }

    loadUserProfile();
  }, [supabase.auth]);

  const updateProfile = async () => {
    try {
      setUpdating(true);
      setMessage(null);

      const { error } = await supabase.auth.updateUser({
        data: {
          first_name: firstName,
          last_name: lastName,
          phone: phone
        }
      });

      if (error) {
        throw error;
      }

      setMessage({
        type: "success",
        text: "Profile updated successfully!"
      });
      
      // Show success message for 3 seconds then clear it
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({
        type: "error",
        text: "Failed to update profile. Please try again."
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-medium mb-2">Not Signed In</h2>
        <p className="text-muted-foreground">Please sign in to view your profile</p>
        <Button asChild className="mt-4">
          <Link href="/sign-in">Sign In</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-500">
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 rounded-lg mb-8">
        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
          <div className="flex items-center justify-center bg-primary/10 rounded-full h-20 w-20 text-primary">
            <UserIcon size={40} />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold">{firstName} {lastName}</h1>
            <p className="text-muted-foreground flex items-center justify-center sm:justify-start gap-1 mt-1">
              <MailIcon size={16} /> {email}
            </p>
            {phone && (
              <p className="text-muted-foreground flex items-center justify-center sm:justify-start gap-1 mt-1">
                <PhoneIcon size={16} /> {phone}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="w-full">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-full text-primary">
                <UserIcon size={18} />
              </div>
              <CardTitle>Personal Information</CardTitle>
            </div>
            <CardDescription>Manage your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-muted-foreground text-sm">Email Address</Label>
              <div className="relative">
                <MailIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  value={email}
                  disabled
                  className="pl-9 bg-muted/50"
                />
              </div>
              <p className="text-xs text-muted-foreground">Email cannot be changed</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-muted-foreground text-sm">First Name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="border-input/50 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-muted-foreground text-sm">Last Name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="border-input/50 focus:border-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-muted-foreground text-sm">Phone Number</Label>
              <div className="relative">
                <PhoneIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1234567890"
                  className="pl-9 border-input/50 focus:border-primary"
                />
              </div>
              <p className="text-xs text-muted-foreground">Include country code with + prefix</p>
            </div>

            {message && (
              <div className={`p-3 rounded-md flex items-center gap-2 ${
                message.type === "success" 
                  ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400" 
                  : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400"
              }`}>
                {message.type === "success" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
                {message.text}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              onClick={updateProfile} 
              disabled={updating}
              className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700"
            >
              {updating ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-background border-t-transparent rounded-full"></div>
                  Updating...
                </>
              ) : (
                <>
                  <SaveIcon size={16} />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card className="w-full">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-full text-primary">
                <KeyIcon size={18} />
              </div>
              <CardTitle>Security</CardTitle>
            </div>
            <CardDescription>Manage your password and security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
              <div className="flex gap-3">
                <div className="bg-primary/10 p-2 rounded-full text-primary h-fit">
                  <LockIcon size={16} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Password</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    It&apos;s a good idea to use a strong password that you don&apos;t use elsewhere
                  </p>
                  <Button asChild variant="outline" className="gap-2">
                    <Link href="/protected/reset-password">
                      <KeyIcon size={16} />
                      Change Password
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
              <div className="flex gap-3">
                <div className="bg-primary/10 p-2 rounded-full text-primary h-fit">
                  <MailIcon size={16} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Email Verification</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Status: {user.email_confirmed_at ? (
                      <span className="text-green-600 dark:text-green-400 font-medium">Verified</span>
                    ) : (
                      <span className="text-amber-600 dark:text-amber-400 font-medium">Not verified</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}