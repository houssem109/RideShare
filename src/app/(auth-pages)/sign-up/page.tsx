import { signUpAction } from "@/app/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FormMessage, Message } from "@/components/global/form-message";
import { SubmitButton } from "@/components/global/submit-button";
import ShieldCheckIcon from "@/components/svg/ShieldCheckIcon";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 flex flex-col items-center pb-8">
          <div className="flex items-center justify-center mb-2">
            <ShieldCheckIcon className="h-10 w-10" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Sign up</CardTitle>
          <CardDescription className="text-center">
            Already have an account?{" "}
            <Link className="text-primary font-medium hover:underline" href="/sign-in">
              Sign in
            </Link>
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form className="flex flex-col space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName"
                  name="firstName" 
                  placeholder="John" 
                  required 
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName"
                  name="lastName" 
                  placeholder="Doe" 
                  required 
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="you@example.com"
                type="email"
                required
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="+1234567890"
                type="tel"
                pattern="^\\+[0-9]{1,15}$"
                title="Phone number must start with + followed by country code and number"
                required
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Include country code with + prefix (e.g., +1 for US)
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Your password"
                minLength={6}
                required
                className="w-full"
              />
            </div>

            <SubmitButton
              className="w-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              formAction={signUpAction}
              pendingText="Signing up..."
            >
              Sign up
            </SubmitButton>
            
            <FormMessage message={searchParams} />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}