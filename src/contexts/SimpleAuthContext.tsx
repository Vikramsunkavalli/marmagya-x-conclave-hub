import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AdminUser {
  email: string;
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

// Simple localStorage-based auth (for demo purposes)
// Replace with proper Supabase auth when needed
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(() => {
    const stored = localStorage.getItem('admin_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading] = useState(false);

  const isAuthenticated = !!user;

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simple demo auth - replace with real auth later
    if (email === 'admin@marmagya.com' && password === 'admin123') {
      const adminUser = { email };
      setUser(adminUser);
      localStorage.setItem('admin_user', JSON.stringify(adminUser));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('admin_user');
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
