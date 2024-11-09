"use client";

import { Cloud } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-background">
      <div className="w-full sm:max-w-md px-6 py-4 overflow-hidden">
        <div className="mb-8 flex justify-center">
          <Cloud size={40} />
        </div>
        {children}
      </div>
    </div>
  );
}
