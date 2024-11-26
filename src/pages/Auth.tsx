import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthForm from '../components/auth/AuthForm';
import { useAuthStore } from '../store/authStore';

export default function Auth() {
  const [isLogin, setIsLogin] = React.useState(true);
  const navigate = useNavigate();
  const { user } = useAuthStore();

  React.useEffect(() => {
    if (user) {
      navigate('/community');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <AuthForm type={isLogin ? 'login' : 'register'} />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-center"
        >
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-gray-600 hover:text-gray-900"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </motion.div>
      </div>
    </div>
  );
}