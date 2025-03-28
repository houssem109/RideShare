
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/Home');
  
  // This won't be rendered, but is needed to make TypeScript happy
  return null;
}