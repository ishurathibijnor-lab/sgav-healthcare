"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    if (!password || !confirmPassword) {
      setMessage("Please fill both fields.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Password updated successfully. You can now login.");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-black">Set New Password</h1>

        <p className="mt-2 text-gray-600">
          Create a new password for your SGAV Admin account.
        </p>

        <div className="mt-8 space-y-5">
          <div>
            <label className="font-semibold text-black">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-black outline-none focus:border-black"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="font-semibold text-black">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-black outline-none focus:border-black"
              placeholder="Confirm new password"
            />
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="w-full rounded-xl bg-black px-4 py-3 font-semibold text-white transition hover:bg-gray-800"
          >
            Update Password
          </button>

          {message ? (
            <p className="mt-4 text-sm text-gray-700">{message}</p>
          ) : null}
        </div>
      </div>
    </main>
  );
}