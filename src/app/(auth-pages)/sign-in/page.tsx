import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/global/form-message";
import { SubmitButton } from "@/components/global/submit-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { GoogleSignInButton } from "./_components/GoogleSignInButton";
import ShieldCheckIcon from "@/components/svg/ShieldCheckIcon";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  
  return (
    <div className="flex justify-center items-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 flex flex-col items-center pb-8">
          <div className="flex items-center justify-center mb-2">
            <ShieldCheckIcon className="h-10 w-10" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
          <CardDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link className="text-primary font-medium hover:underline" href="/sign-up">
              Sign up
            </Link>
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form className="flex flex-col space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                name="email" 
                placeholder="you@example.com" 
                required 
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  className="text-xs text-muted-foreground hover:text-primary hover:underline"
                  href="/forgot-password"
                >
                  Forgot Password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Your password"
                required
                className="w-full"
              />
            </div>

            <SubmitButton 
              pendingText="Signing In..." 
              formAction={signInAction} 
              className="w-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              Sign in
            </SubmitButton>
            
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300/50"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
              </div>
            </div>
            
            <GoogleSignInButton />
            
            <FormMessage message={searchParams} />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}