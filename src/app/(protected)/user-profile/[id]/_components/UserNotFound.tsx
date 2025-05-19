import React from 'react';
import { Button } from '@/components/ui/button';

interface UserNotFoundProps {
  error: string | null;
  onGoBack: () => void;
}

const UserNotFound: React.FC<UserNotFoundProps> = ({ error, onGoBack }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 max-w-md bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">User Not Found</h2>
        <p className="text-gray-600 mb-4">
          {error || 'The user profile you are looking for does not exist or has been removed.'}
        </p>
        <Button onClick={onGoBack}>Go Back</Button>
      </div>
    </div>
  );
};

export default UserNotFound;