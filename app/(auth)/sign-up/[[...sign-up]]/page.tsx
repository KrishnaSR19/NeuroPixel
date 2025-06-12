'use client'

import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-purple-50">
      <div className="w-full max-w-md px-4 py-10">
        <SignUp path="/sign-up" routing="path" />
      </div>
    </main>
  );
}
