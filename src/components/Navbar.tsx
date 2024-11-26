import React, { useState } from 'react';
import { Search, Menu, X, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="text-3xl font-serif text-gray-900">LUXE</Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
            <Link to="/fashion" className="text-gray-700 hover:text-gray-900">Fashion</Link>
            <Link to="/travel" className="text-gray-700 hover:text-gray-900">Travel</Link>
            <Link to="/lifestyle" className="text-gray-700 hover:text-gray-900">Lifestyle</Link>
            <Link to="/community" className="text-gray-700 hover:text-gray-900">Community</Link>
            <button className="text-gray-700 hover:text-gray-900">
              <Search size={20} />
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    {user.avatar_url ? (
                      <img
                        src={user.avatar_url}
                        alt={user.username}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-600">{user.username[0].toUpperCase()}</span>
                    )}
                  </div>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <Link
                      to={`/profile/${user.username}`}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <User size={16} className="mr-2" />
                      Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Sign In
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-gray-700">Home</Link>
            <Link to="/fashion" className="block px-3 py-2 text-gray-700">Fashion</Link>
            <Link to="/travel" className="block px-3 py-2 text-gray-700">Travel</Link>
            <Link to="/lifestyle" className="block px-3 py-2 text-gray-700">Lifestyle</Link>
            <Link to="/community" className="block px-3 py-2 text-gray-700">Community</Link>
            {user ? (
              <>
                <Link to={`/profile/${user.username}`} className="block px-3 py-2 text-gray-700">Profile</Link>
                <button onClick={handleSignOut} className="block w-full text-left px-3 py-2 text-gray-700">
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/auth" className="block px-3 py-2 text-gray-700">Sign In</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}