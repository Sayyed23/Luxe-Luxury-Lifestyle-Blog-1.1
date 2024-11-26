import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { sendWelcomeEmail } from '../utils/emailService';

interface User {
  id: string;
  email: string;
  username: string;
  avatar_url?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user, loading: false }),
  
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    
    if (data.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
        
      set({ user: profile, loading: false });
    }
  },
  
  signUp: async (email, password, username) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) throw error;
    
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: data.user.id,
            username,
            email,
          },
        ]);
        
      if (profileError) throw profileError;
      
      try {
        await sendWelcomeEmail(email, username);
      } catch (emailError) {
        console.error('Error sending welcome email:', emailError);
        // Continue with sign up even if email fails
      }
      
      set({
        user: {
          id: data.user.id,
          email,
          username,
        },
        loading: false,
      });
    }
  },
  
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, loading: false });
  },

  resetPassword: async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://your-luxe-website.com/reset-password',
    });
    
    if (error) throw error;
  },
}));