"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  try {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const firstName = formData.get("firstName")?.toString();
    const lastName = formData.get("lastName")?.toString();
    const phone = formData.get("phone")?.toString();
    
    console.log("Attempting to create Supabase client");
    const supabase = await createClient();
    
    if (!email || !password || !firstName || !lastName || !phone) {
      return encodedRedirect(
        "error",
        "/sign-up",
        "All fields are required",
      );
    }
    
    console.log("Phone format being sent:", phone);
    
    // Sign up the user
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      //phone,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          phone: phone,
        },
        emailRedirectTo: undefined
      },
    });
    
    console.log("Sign up response:", data);
    
    if (error) {
      console.error("Detailed error:", JSON.stringify(error, null, 2));
      return encodedRedirect("error", "/sign-up", error.message);
    } else {
      return redirect(`/verify-otp?email=${encodeURIComponent(email)}`);
    }
  } catch (err) {
    console.error("Unexpected error during signup:", err);
    return encodedRedirect("error", "/sign-up", "Unexpected error during signup");
  }
};

export const verifyOtpAction = async (formData: FormData) => {
  const token = formData.get("token")?.toString();
  const email = formData.get("email")?.toString();
 // const type = formData.get("type")?.toString();
  const supabase = await createClient();

  if (!token || !email) {
    return encodedRedirect(
      "error",
      "/verify-otp",
      "Email and verification code are required"
    );
  }

  // Verify the OTP token
  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'signup' // Using 'signup' for new user registration verification
  });

  if (error) {
    console.error("OTP verification error:", error.message);
    return encodedRedirect(
      "error",
      "/verify-otp",
      error.message
    );
  }

  // If successful, redirect to protected area or login
  return redirect("/espace-client");
};

export const resendOtpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();

  if (!email) {
    return encodedRedirect(
      "error",
      "/verify-otp",
      "Email is required"
    );
  }

  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: email,
  });

  if (error) {
    console.error("Error resending OTP:", error.message);
    return encodedRedirect(
      "error",
      "/verify-otp",
      error.message
    );
  }

  return encodedRedirect(
    "success",
    "/verify-otp",
    "Verification code resent successfully"
  );
};


export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const redirectTo = formData.get("redirectTo")?.toString() || "/espace-client";
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect(redirectTo);
};
export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    return encodedRedirect(
      "error",
      "/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    return encodedRedirect(
      "error",
      "/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    return encodedRedirect(
      "error",
      "/reset-password",
      "Password update failed",
    );
  }

  return encodedRedirect("success", "/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};