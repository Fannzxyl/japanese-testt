import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { Home, BookOpen, BrainCircuit, Shield, Star, Settings, ChevronLeft, ChevronRight, User as UserIcon, Sparkles } from 'lucide-react';

const Sidebar: React.FC = () => {
    const { isSidebarCollapsed, toggleSidebar, user, openAiSensei } = useAppStore();

    const navItems = [
        { to: '/', icon: Home, label: 'Dashboard' },
        { to: '/kana', icon: BookOpen, label: 'Kana Trainer' },
        { to: '/vocabulary', icon: BrainCircuit, label: 'Vocabulary' },
        { to: '/kanji', icon: Shield, label: 'Kanji' },
        { to: '/challenge', icon: Star, label: 'Challenge' },
    ];
    
    const actionItems = [
         { icon: Sparkles, label: 'AI Sensei', action: openAiSensei },
         { icon: Settings, label: 'Settings', to: '/settings' },
    ];

    const NavItem: React.FC<{ to: string; icon: React.ElementType; label: string; }> = ({ to, icon: Icon, label }) => (
        <NavLink
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
                `flex items-center p-3 my-1 rounded-lg transition-colors duration-200 ${
                    isActive
                        ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                } ${isSidebarCollapsed ? 'justify-center' : ''}`
            }
            title={isSidebarCollapsed ? label : undefined}
        >
            <Icon className="h-5 w-5" />
            {!isSidebarCollapsed && <span className="ml-4 font-medium">{label}</span>}
        </NavLink>
    );
    
    const ActionButton: React.FC<{ icon: React.ElementType; label: string; action?: () => void; to?: string; }> = ({ icon: Icon, label, action, to }) => {
        const commonClasses = `flex items-center w-full p-3 my-1 rounded-lg transition-colors duration-200 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 ${isSidebarCollapsed ? 'justify-center' : ''}`;

        if (to) {
            return (
                 <NavLink to={to} className={({isActive}) => `${commonClasses} ${isActive ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300' : ''}`} title={isSidebarCollapsed ? label : undefined}>
                    <Icon className="h-5 w-5" />
                    {!isSidebarCollapsed && <span className="ml-4 font-medium">{label}</span>}
                </NavLink>
            );
        }

        return (
            <button onClick={action} className={commonClasses} title={isSidebarCollapsed ? label : undefined}>
                <Icon className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-4 font-medium">{label}</span>}
            </button>
        );
    };


    return (
        <aside className={`fixed top-0 left-0 h-full bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col transition-all duration-300 z-40 ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
            <div className={`flex items-center border-b border-slate-200 dark:border-slate-700 transition-all duration-300 ${isSidebarCollapsed ? 'h-20 justify-center' : 'h-20 pl-6'}`}>
                <img src="https://picsum.photos/40/40" alt="Logo" className="rounded-full" />
                {!isSidebarCollapsed && <span className="ml-3 text-xl font-bold text-slate-800 dark:text-white">NihongoLab</span>}
            </div>

            <nav className="flex-1 px-3 py-4 flex flex-col justify-between">
                <div>
                    {navItems.map(item => <NavItem key={item.to} {...item} />)}
                </div>
                 <div>
                    {actionItems.map(item => item.to ? <ActionButton key={item.label} {...item} /> : <ActionButton key={item.label} {...item} />)}
                </div>
            </nav>

            <div className="px-3 py-4 border-t border-slate-200 dark:border-slate-700">
                <div className={`flex items-center p-2 rounded-lg ${isSidebarCollapsed ? 'justify-center' : ''}`}>
                    <UserIcon className="h-8 w-8 text-slate-500"/>
                    {!isSidebarCollapsed && (
                        <div className="ml-3">
                            <p className="font-semibold text-sm">{user.displayName}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                        </div>
                    )}
                </div>
            </div>

             <button onClick={toggleSidebar} className="absolute -right-3 top-20 bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-full p-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
        </aside>
    );
};

export default Sidebar;
