import { Navbar } from "@/components/global/navbar/Navbar";
import { AuthProvider } from "@/Providers/AuthProvider";


export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}