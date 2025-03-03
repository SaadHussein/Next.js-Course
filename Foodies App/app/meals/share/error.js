"use client";

import { notFound } from "next/navigation";

export default function Error({ error }) {
  if (error.digest === "NEXT_NOT_FOUND") {
    notFound();
  }
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p>Failed to create meal.</p>
    </main>
  );
}
