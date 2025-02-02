'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/authContext';

function withAuth<T extends Record<string, any>>(WrappedComponent: React.ComponentType<T>) {
  const ProtectedComponent: React.FC<T> = (props) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
console.log(isAuthenticated);
    useEffect(() => {
      if (!isAuthenticated) {
        router.replace('/login'); // Use `replace` to avoid history stacking
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return null; // Render nothing while redirecting
    }

    return <WrappedComponent {...props} />;
  };

  // Set a display name for debugging
  ProtectedComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ProtectedComponent;
}

export default withAuth;
