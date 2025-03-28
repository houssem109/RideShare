export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-6">
        {children}
      </div>
    </div>
  );
}