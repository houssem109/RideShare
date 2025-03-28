import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import UserProfile from "./_components/UserProfile";

export default async function profile() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-6 items-center py-8">
      <div className="w-full max-w-md px-4">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>
        <UserProfile />
      </div>
    </div>
  );
}