import { PublicNavbar } from "@/components/global/navbar/public-navbar";

export default function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNavbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}