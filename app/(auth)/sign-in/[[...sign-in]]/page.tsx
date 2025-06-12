'use client'

import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-purple-50">
      <div className="w-full max-w-md px-4 py-10">
        <SignIn path="/sign-in" routing="path" />
      </div>
    </main>
  );
}
