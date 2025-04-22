import { PublicNavbar } from "@/components/global/navbar/public-navbar";
import { AuthProvider } from "@/Providers/AuthProvider";


export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="flex bg-gray-50 min-h-screen flex-col">
        <PublicNavbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}