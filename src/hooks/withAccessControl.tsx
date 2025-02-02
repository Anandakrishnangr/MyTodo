'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/authContext';

// Define types for access control configuration
type AccessControlProps = {
  public?: boolean;  // Allow access to unauthenticated users
  private?: boolean; // Allow access only to authenticated users
};

function withAccessControl<T extends Record<string, any>>(
  WrappedComponent: React.ComponentType<T>,
  accessControl: AccessControlProps = { private: true } // Default: Private pages
) {
  const AccessControlledComponent: React.FC<T> = (props) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (accessControl.private && !isAuthenticated) {
        // Redirect unauthenticated users from private pages
        router.replace('/login');
      } else if (accessControl.public && isAuthenticated) {
        // Redirect authenticated users from public pages
        router.replace('/');
      }
    }, [isAuthenticated, router]);

    if ((accessControl.private && !isAuthenticated) || (accessControl.public && isAuthenticated)) {
      return null; // Avoid rendering while redirecting
    }

    return <WrappedComponent {...props} />;
  };

  // Set a display name for debugging
  AccessControlledComponent.displayName = `withAccessControl(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AccessControlledComponent;
}

export default withAccessControl;
