// Temporarily disabled to fix build issues
// import { serve } from "inngest/next";
// import { inngest, syncUserCreation, syncUserDeletion, syncUserUpdating } from "@/config/inngest";

// Create a simple API route that returns success
export async function GET() {
  return new Response(JSON.stringify({ message: "Inngest API temporarily disabled" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST() {
  return new Response(JSON.stringify({ message: "Inngest API temporarily disabled" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT() {
  return new Response(JSON.stringify({ message: "Inngest API temporarily disabled" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}