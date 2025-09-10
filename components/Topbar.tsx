
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { Menu, Search, Award, Gem, Flame } from 'lucide-react';

const Topbar: React.FC = () => {
    const { toggleSidebar, user, openSearchModal } = useAppStore();
    const location = useLocation();

    const getPageTitle = () => {
        const path = location.pathname === '/' ? 'dashboard' : location.pathname.slice(1);
        return path.charAt(0).toUpperCase() + path.slice(1);
    };

    return (
        <header className="flex items-center justify-between h-20 px-4 sm:px-6 md:px-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm sticky top-0 z-30 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center">
                <button onClick={toggleSidebar} className="md:hidden p-2 -ml-2 text-slate-600 dark:text-slate-300">
                    <Menu className="h-6 w-6" />
                </button>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white ml-2 md:ml-0">
                    {getPageTitle()}
                </h1>
            </div>

            <div className="flex items-center space-x-4">
                 <div className="hidden sm:flex items-center space-x-4 bg-slate-100 dark:bg-slate-700/50 p-2 rounded-full">
                    <div className="flex items-center" title="EXP">
                        <Award className="h-5 w-5 text-yellow-500" />
                        <span className="ml-1.5 font-semibold text-sm">{user.exp}</span>
                    </div>
                    <div className="flex items-center" title="Gems">
                        <Gem className="h-5 w-5 text-sky-500" />
                        <span className="ml-1.5 font-semibold text-sm">{user.gems}</span>
                    </div>
                    <div className="flex items-center" title="Streak">
                        <Flame className="h-5 w-5 text-red-500" />
                        <span className="ml-1.5 font-semibold text-sm">{user.streak}</span>
                    </div>
                </div>

                <button onClick={openSearchModal} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    <Search className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                </button>
                
                <div className="w-10 h-10">
                    <img src="https://picsum.photos/40/40" alt="User Avatar" className="rounded-full object-cover w-full h-full" />
                </div>
            </div>
        </header>
    );
};

export default Topbar;
