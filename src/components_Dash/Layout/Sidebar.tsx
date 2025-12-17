import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Building2,
  GraduationCap,
  FileText,
  CreditCard,
  Settings,
  User,
  LogOut,
  HelpCircle,
  X,
  ChevronDown,
  ChevronUp,
  UserCog,
  School,
  BookOpen,
  Database,
} from 'lucide-react';
import { clearAllLocalStorage } from '../../Constant';
import Logout from './Logout';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogoutClick?: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon: React.ComponentType<any>;
  section?: string;
  children?: Omit<MenuItem, 'children'>[];
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  {
    id: 'user-types',
    label: 'User Types',
    path: '/dashboard/user-types',
    icon: Users,
    children: [
      { id: 'user-types', label: 'Master', path: '/dashboard/user-types', icon: Database },
      { id: 'admins', label: 'Admin', path: '/dashboard/admins', icon: UserCog },
      { id: 'university', label: 'University', path: '/dashboard/university', icon: School },
      { id: 'agencies', label: 'Agencies', path: '/dashboard/agencies', icon: Building2 },
      { id: 'students', label: 'Students', path: '/dashboard/students', icon: GraduationCap },
    ]   
  },
  { id: 'courses', label: 'Courses', path: '/dashboard/courses', icon: BookOpen },
  { id: 'notice', label: 'Notice', path: '/dashboard/notice', icon: FileText },
  { id: 'fees-management', label: 'Fees Management', path: '/dashboard/fees-management', icon: CreditCard },
  { id: 'setting', label: 'Setting', path: '/dashboard/setting', icon: Settings, section: 'OTHERS' },
  { id: 'profile', label: 'Profile', path: '/dashboard/profile', icon: User },
  { id: 'help', label: 'Help', path: '/dashboard/help', icon: HelpCircle },
  { id: 'logout', label: 'Logout', path: '#', icon: LogOut }
] 

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onLogoutClick }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.id === 'logout') {
      setShowLogoutModal(true);
      return;
    }
    
    if (item.children) {
      toggleDropdown(item.id);
      return;
    }    
    navigate(item.path);
    if (window.innerWidth < 1024) {
      onClose();
    }
  }

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id)
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    clearAllLocalStorage();
    if (onLogoutClick) {
      onLogoutClick();
    } else {
      navigate('/login');
    }
  };

  const handleLogoutClose = () => {
    setShowLogoutModal(false);
  };

  const renderMenuButton = (item: MenuItem) => (
    <button
      key={item.id}
      onClick={() => handleItemClick(item)}
      className={`
        w-full flex items-center space-x-3 px-3 py-3 mx-1 text-sm transition-all duration-200 rounded-xl group relative overflow-hidden
        ${isActive(item.path)
          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-[1.02]'
          : 'text-gray-700 hover:bg-white/40 hover:backdrop-blur-md hover:shadow-md hover:transform hover:scale-[1.01]'
        }
        before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-200
      `}
    >
      <item.icon className={`w-5 h-5 transition-all duration-200 ${isActive(item.path)
          ? 'text-white drop-shadow-sm'
          : 'text-gray-500 group-hover:text-gray-700'
        }`} />
      <span className={`font-medium transition-all duration-200 ${isActive(item.path)
          ? 'text-white drop-shadow-sm'
          : 'group-hover:text-gray-800'
        }`}>{item.label}</span>
      {isActive(item.path) && (
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white/30 rounded-l-full"></div>
      )}
    </button>
  );

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white/95 backdrop-blur-xl shadow-2xl border-r border-white/20 transform transition-all duration-300 ease-in-out z-30 lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:static lg:z-auto
        before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:to-transparent before:pointer-events-none
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm drop-shadow-sm">A</span>
            </div>
            <span className="text-gray-800 font-semibold text-sm tracking-wide">ADMIN USER NAME</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-white/20 backdrop-blur-sm transition-all duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="py-6">
          <div className="px-4 mb-4">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">MENU</span>
          </div>
          <nav className="space-y-1 px-2">
            {menuItems.map((item, index) => {
              if (item.section && index > 0 && menuItems[index - 1].section !== item.section) {
                return (
                  <React.Fragment key={item.id}>
                    <div className="px-2 pt-6 pb-3">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        {item.section}
                      </span>
                    </div>
                    {renderMenuButton(item)}
                  </React.Fragment>
                );
              }
              if (item.children) {
                const isOpen = openDropdown === item.id;
                const isActiveParent = isActive(item.path) || item.children.some(c => isActive(c.path));

                return (
                  <div key={item.id}>
                    <button
                      onClick={() => handleItemClick(item)}
                      className={`
                        w-full flex items-center justify-between px-3 py-3 mx-1 text-sm rounded-xl transition-all duration-200 relative
                        ${isActiveParent
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-[1.02]'
                          : 'text-gray-700 hover:bg-white/40 hover:backdrop-blur-md hover:shadow-md hover:transform hover:scale-[1.01]'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className={`w-5 h-5 ${isActiveParent ? 'text-white' : 'text-gray-500'}`} />
                        <span className={isActiveParent ? 'text-white font-medium' : 'font-medium'}>{item.label}</span>
                      </div>
                      {isOpen ?
                        <ChevronUp className="w-4 h-4" /> :
                        <ChevronDown className="w-4 h-4" />
                      }
                    </button>
                    {isOpen && (
                      <div className="ml-10 mt-1 space-y-1">
                        {item.children.map(sub => renderMenuButton(sub))}
                      </div>
                    )}
                  </div>
                );
              }
              return renderMenuButton(item);
            })}
          </nav>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
      </div>

      <Logout 
        showModal={showLogoutModal}
        onHide={handleLogoutClose}
        onLogoutConfirm={handleLogoutConfirm}
      />
    </>
  );
};

export default Sidebar;








