// Header.tsx
import React, { useState, useRef } from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from '../../Constant';
import { UserPopover } from './UserPop'; 
interface HeaderProps {
  onMenuClick: () => void;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, title }) => {
  const navigate = useNavigate();
  const [userPopoverOpen, setUserPopoverOpen] = useState(false);
  const userButtonRef = useRef(null);
  
  let userDetails = getUserDetails();
  const firstLetter = userDetails?.userName?.email.charAt(0) || '';

  const handleUserClick = () => {
    setUserPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setUserPopoverOpen(false);
  };

  return (
    <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-white/20 px-4 lg:px-6 py-4 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl hover:bg-white/60 backdrop-blur-sm transition-all duration-200 hover:shadow-md"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">{title}</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20 shadow-sm">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400 w-32"
            />
          </div>

          <button className="relative p-2 rounded-xl hover:bg-white/60 backdrop-blur-sm transition-all duration-200 hover:shadow-md">
            <Bell className="w-5 h-5 text-gray-600" />
            <div className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-sm"></div>
          </button>

          <button
            ref={userButtonRef}
            onClick={handleUserClick}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-sm hover:shadow-md transition-all duration-200"
          >
            {firstLetter ? firstLetter.toUpperCase() : <User className="w-4 h-4" />}
          </button>
          
          <UserPopover
            anchorEl={userButtonRef.current}
            open={userPopoverOpen}
            onClose={handlePopoverClose}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;