import { resetPasswordAction } from '@/app/actions';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { getMessageFromSearchParams } from '@/utils/utils';

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Convert searchParams to a regular object
  const params: Record<string, string> = {};
  
  // Only iterate through keys if searchParams is defined
  if (searchParams) {
    // Process each parameter safely
    Object.entries(searchParams).forEach(([key, value]) => {
      // Only add string values
      if (typeof value === 'string') {
        params[key] = value;
      } else if (Array.isArray(value) && value.length > 0) {
        // If it's an array, take the first value
        params[key] = String(value[0]);
      }
    });
  }
  
  // Now create URLSearchParams with the processed object
  const message = getMessageFromSearchParams(new URLSearchParams(params));

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Reset Password</h1>
        <p className="mt-2 text-sm text-gray-600">
          Please enter your new password below
        </p>
      </div>
      
      {message && (
        <Alert variant={message.type} className="mb-6">
          <AlertDescription>{message.message}</AlertDescription>
        </Alert>
      )}
      
      <form className="space-y-6" action={resetPasswordAction}>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm New Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>
        
        <Button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Reset Password
        </Button>
      </form>
    </div>
  );
}