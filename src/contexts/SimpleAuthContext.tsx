import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  is_active: boolean;
}

interface AuthContextType {
  user: AdminUser | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isProcessingSession = useRef(false);

  const isAuthenticated = !!user;

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        isProcessingSession.current = true;
        setIsLoading(true);
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          setUser(null);
          setIsLoading(false);
          return;
        }
        
        if (session?.user) {
          // Check if session is expired
          const now = Math.floor(Date.now() / 1000);
          if (session.expires_at && session.expires_at < now) {
            await supabase.auth.signOut();
            setUser(null);
            setIsLoading(false);
            return;
          }

          // Check if user is admin
          const { data: adminData, error } = await supabase
            .from('admin_users')
            .select('*')
            .eq('id', session.user.id)
            .eq('is_active', true)
            .single() as { data: AdminUser | null; error: any };

          if (error || !adminData) {
            // User is not admin, clear session
            await supabase.auth.signOut();
            setUser(null);
            setIsLoading(false);
          } else {
            setUser({
              id: adminData.id,
              email: adminData.email,
              name: adminData.name,
              role: adminData.role,
              is_active: adminData.is_active
            });
            setIsLoading(false);
          }
        } else {
          setUser(null);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Session check error:', error);
        setUser(null);
        setIsLoading(false);
      } finally {
        isProcessingSession.current = false;
        setIsLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      // Only handle SIGNED_IN if we're not already processing a session (avoid race condition)
      if (event === 'SIGNED_IN' && session?.user && !isProcessingSession.current) {
        // Check if user is admin
        const { data: adminData, error } = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', session.user.id)
          .eq('is_active', true)
          .single() as { data: AdminUser | null; error: any };

        if (error || !adminData) {
          // User is not admin, sign them out
          await supabase.auth.signOut();
          setUser(null);
          setIsLoading(false);
        } else {
          setUser({
            id: adminData.id,
            email: adminData.email,
            name: adminData.name,
            role: adminData.role,
            is_active: adminData.is_active
          });
          setIsLoading(false);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsLoading(false);
      } else if (event === 'TOKEN_REFRESHED' && session?.user) {
        // Re-check admin status on token refresh
        const { data: adminData, error } = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', session.user.id)
          .eq('is_active', true)
          .single() as { data: AdminUser | null; error: any };

        if (error || !adminData) {
          await supabase.auth.signOut();
          setUser(null);
          setIsLoading(false);
        } else {
          setUser({
            id: adminData.id,
            email: adminData.email,
            name: adminData.name,
            role: adminData.role,
            is_active: adminData.is_active
          });
          setIsLoading(false);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (!data.user) {
        return { success: false, error: 'Login failed' };
      }

      // Check if user is admin
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', data.user.id)
        .eq('is_active', true)
        .single() as { data: AdminUser | null; error: any };

      if (adminError || !adminData) {
        // User is not admin, sign them out
        await supabase.auth.signOut();
        return { success: false, error: 'Access denied. Admin privileges required.' };
      }

      setUser({
        id: adminData.id,
        email: adminData.email,
        name: adminData.name,
        role: adminData.role,
        is_active: adminData.is_active
      });

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
