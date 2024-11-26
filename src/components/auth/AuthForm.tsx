import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../../store/authStore';

interface AuthFormProps {
  type: 'login' | 'register' | 'reset';
}

interface FormData {
  email: string;
  password?: string;
  username?: string;
}

export default function AuthForm({ type }: AuthFormProps) {
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, resetPassword } = useAuthStore();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      if (type === 'login') {
        await signIn(data.email, data.password!);
        toast.success('Welcome back!');
      } else if (type === 'register') {
        if (data.username && data.password) {
          await signUp(data.email, data.password, data.username);
          toast.success('Account created successfully! Check your email for verification.');
        }
      } else if (type === 'reset') {
        await resetPassword(data.email);
        toast.success('Password reset instructions sent to your email.');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-serif text-center mb-6">
        {type === 'login' ? 'Welcome Back' : type === 'register' ? 'Create Account' : 'Reset Password'}
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {type === 'register' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              {...register('username', { required: 'Username is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            />
            {errors.username && (
              <span className="text-sm text-red-500">{errors.username.message}</span>
            )}
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </div>
        
        {type !== 'reset' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required', minLength: 6 })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            />
            {errors.password && (
              <span className="text-sm text-red-500">{errors.password.message}</span>
            )}
          </div>
        )}
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {loading ? 'Loading...' : type === 'login' ? 'Sign In' : type === 'register' ? 'Sign Up' : 'Reset Password'}
        </button>
      </form>
    </motion.div>
  );
}