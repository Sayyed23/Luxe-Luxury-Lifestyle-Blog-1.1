import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CreatePost from '../components/posts/CreatePost';
import PostCard from '../components/posts/PostCard';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select(`
            *,
            user:profiles(username, avatar_url),
            likes:likes_count(*),
            comments:comments_count(*),
            liked_by_user:likes!inner(user_id)
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPosts(data || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {user && <CreatePost />}
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </motion.div>
    </div>
  );
}