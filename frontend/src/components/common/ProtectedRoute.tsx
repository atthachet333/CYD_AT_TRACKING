'use client';

import { useAuth } from '@/context/AuthContext';
import { ReactNode } from 'react';
import { redirect } from 'next/navigation';

/**
 * Protected Route Component
 * Wraps pages that require authentication
 */
interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'user';
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    redirect('/');
  }

  if (requiredRole && user?.role !== requiredRole) {
    redirect('/dashboard');
  }

  return <>{children}</>;
}
