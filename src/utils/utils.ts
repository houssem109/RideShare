import { redirect } from 'next/navigation';

type MessageType = 'error' | 'success' | 'info';

export function encodedRedirect(
  type: MessageType,
  path: string,
  message: string
) {
  const params = new URLSearchParams();
  params.set('type', type);
  params.set('message', message);
  
  return redirect(`${path}?${params.toString()}`);
}

export function getMessageFromSearchParams(searchParams: URLSearchParams) {
  const type = searchParams.get('type') as MessageType | null;
  const message = searchParams.get('message');

  if (!type || !message) return null;

  return {
    type,
    message,
  };
}