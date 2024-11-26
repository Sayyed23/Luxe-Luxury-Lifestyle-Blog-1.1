import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';

interface PostCardProps {
  post: {
    id: string;
    content: string;
    image_url?: string;
    created_at: string;
    user: {
      username: string;
      avatar_url?: string;
    };
    likes: number;
    comments: number;
    liked_by_user: boolean;
  };
}

export default function PostCard({ post }: PostCardProps) {
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(post.liked_by_user);
  const { user } = useAuthStore();

  const handleLike = async () => {
    if (!user) return;

    try {
      if (liked) {
        await supabase
          .from('likes')
          .delete()
          .match({ user_id: user.id, post_id: post.id });
        setLikes(prev => prev - 1);
      } else {
        await supabase
          .from('likes')
          .insert([{ user_id: user.id, post_id: post.id }]);
        setLikes(prev => prev + 1);
      }
      setLiked(!liked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm overflow-hidden mb-6"
    >
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Link to={`/profile/${post.user.username}`}>
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
              {post.user.avatar_url ? (
                <img
                  src={post.user.avatar_url}
                  alt={post.user.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600">
                  {post.user.username[0].toUpperCase()}
                </div>
              )}
            </div>
          </Link>
          <div>
            <Link
              to={`/profile/${post.user.username}`}
              className="font-medium text-gray-900 hover:underline"
            >
              {post.user.username}
            </Link>
            <p className="text-sm text-gray-500">
              {format(new Date(post.created_at), 'MMM d, yyyy')}
            </p>
          </div>
        </div>

        <p className="text-gray-800 mb-4">{post.content}</p>

        {post.image_url && (
          <div className="relative aspect-[16/9] mb-4">
            <img
              src={`https://your-project.supabase.co/storage/v1/object/public/experience-images/${post.image_url}`}
              alt="Post"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex items-center space-x-6 text-gray-500">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 hover:text-gray-700 transition-colors ${
              liked ? 'text-red-500 hover:text-red-600' : ''
            }`}
          >
            <Heart
              size={20}
              className={liked ? 'fill-current' : ''}
            />
            <span>{likes}</span>
          </button>

          <Link
            to={`/post/${post.id}`}
            className="flex items-center space-x-2 hover:text-gray-700 transition-colors"
          >
            <MessageCircle size={20} />
            <span>{post.comments}</span>
          </Link>

          <button className="flex items-center space-x-2 hover:text-gray-700 transition-colors">
            <Share2 size={20} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}