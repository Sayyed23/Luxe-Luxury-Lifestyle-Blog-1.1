import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';

interface FormData {
  content: string;
  image?: FileList;
}

export default function CreatePost() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();
  const { register, handleSubmit, reset, watch } = useForm<FormData>();
  const imageFile = watch('image')?.[0];

  const onSubmit = async (data: FormData) => {
    if (!user) return;
    
    setLoading(true);
    try {
      let imageUrl = '';
      
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('experience-images')
          .upload(fileName, imageFile);
          
        if (uploadError) throw uploadError;
        
        imageUrl = uploadData.path;
      }
      
      const { error } = await supabase.from('posts').insert([
        {
          user_id: user.id,
          content: data.content,
          image_url: imageUrl,
        },
      ]);
      
      if (error) throw error;
      
      toast.success('Post created successfully!');
      reset();
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
      className="bg-white p-6 rounded-lg shadow-sm mb-6"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <textarea
          {...register('content', { required: true })}
          placeholder="Share your experience..."
          className="w-full p-4 border border-gray-200 rounded-lg focus:ring-gray-500 focus:border-gray-500"
          rows={3}
        />
        
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="file"
              {...register('image')}
              accept="image/*"
              className="hidden"
            />
            <div className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
              <ImageIcon size={20} />
            </div>
            {imageFile && (
              <span className="text-sm text-gray-600">{imageFile.name}</span>
            )}
          </label>
          
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center space-x-2"
          >
            {loading ? (
              <>
                <Loader className="animate-spin" size={16} />
                <span>Posting...</span>
              </>
            ) : (
              <span>Post</span>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}