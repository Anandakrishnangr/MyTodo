// src/app/about/page.tsx
'use client'
import withAuth from "@/hooks/useWIthAuth";


function About() {
  return (
    <div>
      <h1>About Page</h1>
    </div>
  );
}

export default withAuth(About); // Wrap the About component with the HOC
