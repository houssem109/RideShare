import { verifyOtpAction } from "@/app/actions";
import { SubmitButton } from "@/components/global/submit-button";


import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResendOtpButton } from "./components/resendOTPButton";

export default async function VerifyOTP(props: {
    searchParams: { [key: string]: string | string[] | undefined };
  }) {
    // Extract email directly from URL query parameters
    const email = props.searchParams.email as string || '';
    
    return (
      <div className="flex-1 flex flex-col w-full gap-2 text-foreground min-w-64 max-w-md mx-auto">
        <div>
          <h1 className="text-2xl font-medium">Verify Your Email</h1>
          <p className="text-sm text-secondary-foreground mt-2">
            We&apos;ve sent a verification code to your email address. Please enter the code below to complete your registration.
          </p>
        </div>
        <form className="flex flex-col gap-4 mt-8">
          <input type="hidden" name="email" value={email} />
          <input type="hidden" name="type" value="signup" />
          
          <div>
            <Label htmlFor="token">Verification Code</Label>
            <Input 
              id="token"
              name="token" 
              placeholder="Enter the 6-digit code" 
              className="mt-1"
              required 
            />
          </div>
          
          <SubmitButton formAction={verifyOtpAction} className="mt-2 bg-indigo-600 text-white hover:bg-indigo-700">
            Verify and Complete Registration
          </SubmitButton>
          
          <div className="text-sm text-center mt-4">
            <p>Didn&apos;t receive a code? <ResendOtpButton email={email} /></p>
          </div>
          
          {props.searchParams.error && (
            <div className="text-destructive-foreground border-l-2 border-destructive-foreground px-4 text-sm">
              {props.searchParams.error}
            </div>
          )}
        </form>
      </div>
    );
  }