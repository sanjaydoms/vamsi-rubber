"use client";

import React from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full transition-opacity duration-300">
      {children}
    </div>
  );
}
