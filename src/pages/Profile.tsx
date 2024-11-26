import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, MapPin, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '../lib/supabase';
import PostCard from '../components/posts/PostCard';
import { useAuthStore } from '../store/authStore';

interface Profile {
  username: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
  created_at: string;
}

export default function Profile() {
  const { username } = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('username', username)
          .single();

        if (error) throw error;
        setProfile(data);

        const { data: postsData, error: postsError } = await supabase
          .from('posts')
          .select(`
            *,
            user:profiles(username, avatar_url),
            likes:likes_count(*),
            comments:comments_count(*),
            liked_by_user:likes!inner(user_id)
          `)
          .eq('user.username', username)
          .order('created_at', { ascending: false });

        if (postsError) throw postsError;
        setPosts(postsData || []);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-serif text-gray-900">Profile not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm overflow-hidden mb-8"
      >
        <div className="h-48 bg-gray-200 relative">
          {user?.username === username && (
            <button className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow">
              <Camera size={20} />
            </button>
          )}
        </div>
        
        <div className="px-6 py-4">
          <div className="flex items-start">
            <div className="relative -mt-16">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.username}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl text-gray-600">
                    {profile.username[0].toUpperCase()}
                  </div>
                )}
              </div>
            </div>
            
            <div className="ml-6 pt-2">
              <h1 className="text-3xl font-serif text-gray-900 mb-2">{profile.username}</h1>
              {profile.bio && (
                <p className="text-gray-600 mb-4">{profile.bio}</p>
              )}
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                {profile.location && (
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-1" />
                    <span>{profile.location}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  <span>Joined {format(new Date(profile.created_at), 'MMMM yyyy')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}