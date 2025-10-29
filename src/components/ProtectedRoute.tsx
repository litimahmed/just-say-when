import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import PageLoader from './ui/PageLoader';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('student' | 'teacher')[];
  requireAuth?: boolean;
}

export const ProtectedRoute = ({ 
  children, 
  allowedRoles,
  requireAuth = true 
}: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    checkAuthAndRole();
  }, []);

  const checkAuthAndRole = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      setIsAuthenticated(true);

      // Get user profile to check role
      const { data: profile } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('id', session.user.id)
        .single();

      setUserType(profile?.user_type || null);
      setLoading(false);
    } catch (error) {
      console.error('Auth check error:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  // If route requires auth and user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If authenticated user tries to access homepage, redirect to their dashboard
  if (isAuthenticated && location.pathname === '/' && userType) {
    if (userType === 'student') {
      return <Navigate to="/student" replace />;
    } else if (userType === 'teacher') {
      return <Navigate to="/teacher" replace />;
    }
  }

  // If specific roles are required, check them
  if (allowedRoles && userType && !allowedRoles.includes(userType as any)) {
    // Redirect to their correct dashboard
    if (userType === 'student') {
      return <Navigate to="/student" replace />;
    } else if (userType === 'teacher') {
      return <Navigate to="/teacher" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
