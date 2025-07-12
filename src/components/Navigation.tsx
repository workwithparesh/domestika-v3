import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Bell, User, ChevronDown, Sparkles } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold">DOMËSTIKA</span>
            </Link>
            
            {/* Main Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-1 cursor-pointer hover:text-orange-400 transition-colors">
                <span className="text-sm font-medium">Courses</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              
              <Link 
                to="/projects" 
                className="text-sm font-medium hover:text-orange-400 transition-colors"
              >
                Projects
              </Link>
              
              <Link 
                to="/plus" 
                className="text-sm font-medium hover:text-orange-400 transition-colors"
              >
                Plus
              </Link>
              
              <button className="text-sm font-medium hover:text-orange-400 transition-colors">
                •••
              </button>
            </div>
          </div>

          {/* Search and User Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex items-center bg-gray-800 rounded-lg px-3 py-2 w-80">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search for courses"
                className="bg-transparent text-white placeholder-gray-400 text-sm flex-1 outline-none"
              />
            </div>

            {/* My Learning with AI Animation */}
            <Link
              to="/my-learning"
              className={`relative flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/my-learning') || location.pathname.startsWith('/course/')
                  ? 'bg-orange-500 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <span>My Learning</span>
              <div className="relative group">
                <Sparkles className="w-4 h-4 text-white animate-pulse" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping"></div>
                
                {/* AI Info Tooltip */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">i</span>
                    </div>
                    <span>AI-powered learning dashboard</span>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </Link>

            {/* Notifications */}
            <button className="relative p-2 text-gray-300 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
            </button>

            {/* Cart */}
            <button className="relative p-2 text-gray-300 hover:text-white transition-colors">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </button>

            {/* Profile */}
            <button className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <div className="flex items-center bg-gray-800 rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search for courses"
            className="bg-transparent text-white placeholder-gray-400 text-sm flex-1 outline-none"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;