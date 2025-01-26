'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './context/authContext';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // Render nothing while redirecting
  }

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>This page is accessible only to authenticated users.</p>
    </div>
  );
}
